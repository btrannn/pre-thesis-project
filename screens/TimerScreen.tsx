import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { BlurView } from 'expo-blur';

import TaskSelector from '../components/timer/TaskSelector';
import CircularTimer from '../components/timer/CircularTimer';
import FocusStatusDisplay from '../components/timer/FocusStatusDisplay';
import SessionSummary from '../components/timer/SessionSummary';
import GlassView from '../components/design/GlassView';

type FocusStatusType = 'Focusing' | 'Distracting' | 'Break Time' | null;
type TimerMode = 'Working' | 'Breaking';

const BREAK_RATIO = 1 / 5;

import focusScores from '../datasets/focus_scores.json';

const calculateBreakTime = (focusSeconds: number): number => {
  // const focusMinutes = Math.floor(focusSeconds / 60);
  const calculatedBreakTime = Math.round(focusSeconds * BREAK_RATIO);
  return calculatedBreakTime;
};

type TimerScreenProps = {
  isTimerRunning: boolean;
  setIsTimerRunning: (isRunning: boolean) => void;
  focusStatus: FocusStatusType;
  setFocusStatus: (status: FocusStatusType) => void;
  onFinishSession: () => void; 
};

const TimerScreen = ({ 
  isTimerRunning, 
  setIsTimerRunning, 
  focusStatus, 
  setFocusStatus,
  onFinishSession 
}: TimerScreenProps) => {
  
  const [time, setTime] = useState(0);
  const [focusTime, setFocusTime] = useState(0);
  const [mode, setMode] = useState<TimerMode>('Working');
  const [scoreIndex, setScoreIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<string>('00:00');
  const [sessionEndTime, setSessionEndTime] = useState<string>('00:00');
  const [sessionScores, setSessionScores] = useState<number[]>([]);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  useEffect(() => {
    if (isTimerRunning && mode === 'Working') {
      const interval = setInterval(() => {
        setScoreIndex(prev => (prev + 1) % focusScores.length);
      }, 500); // Update every 0.5 seconds
      return () => clearInterval(interval);
    } else if (mode === 'Breaking') {
      setFocusStatus('Break Time');
    }
  }, [isTimerRunning, mode, setFocusStatus]);

  useEffect(() => {
    if (isTimerRunning && mode === 'Working') {
      const score = focusScores[scoreIndex];
      setFocusStatus(score > 0.5 ? 'Focusing' : 'Distracting');
    }
  }, [scoreIndex, isTimerRunning, mode, setFocusStatus]);

  const handleStop = useCallback(() => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    setSessionEndTime(`${hours}:${minutes}`);
    setSessionScores(focusScores.slice(0, scoreIndex));
    setShowSummary(true);
  }, [time, scoreIndex]);

  const handleSessionDone = useCallback(() => {
    setTime(0);
    setFocusTime(0);
    setMode('Working');
    setShowSummary(false);
    setSessionScores([]);
    setSelectedTask(null);
    
    onFinishSession();
  }, [onFinishSession]);

  const handleBreakEnd = useCallback(() => {
    setMode('Working'); 
    setTime(focusTime + 1); 
    setIsTimerRunning(true); 
  }, [focusTime, setIsTimerRunning]);

  const handlePlayPause = useCallback(() => {
    if (!isTimerRunning && mode === 'Breaking') {
        setIsTimerRunning(true);
        return;
    }

    const nextState = !isTimerRunning;
    setIsTimerRunning(nextState);
    
    if (nextState) {
      // Timer started
    } else {
      if (mode === 'Working') {
        const breakDuration = calculateBreakTime(time);
        setFocusTime(time);
        setTime(breakDuration);
        setMode('Breaking');
      }
    }
  }, [isTimerRunning, setIsTimerRunning, setFocusStatus, time, mode]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (mode === 'Working') {
            return prevTime + 1;
          } else {
            const newTime = prevTime - 1;
            if (newTime <= 0) {
              clearInterval(interval!);
              setTimeout(handleBreakEnd, 0); 
              return 0;
            }
            return newTime;
          }
        });
      }, 1000);
    } else if (!isTimerRunning && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, mode, handleBreakEnd]);

  const renderGlassCardContent = () => (
    <CircularTimer 
      time={time} 
      isRunning={isTimerRunning} 
      mode={mode}
      onToggle={handlePlayPause} 
      onSkip={handleStop} 
    />
  );

  return (
    <View style={styles.container}>
      {showSummary ? (
        <SessionSummary
          taskName={selectedTask || 'Session'}
          focusTime={focusTime}
          breakTime={time - focusTime}
          focusScores={sessionScores}
          startTime={sessionStartTime}
          endTime={sessionEndTime}
          onDone={handleSessionDone}
        />
      ) : (
        <>
          {isTimerRunning ? (
            <FocusStatusDisplay focusStatus={focusStatus} isTimerRunning={isTimerRunning} />
          ) : (
            <TaskSelector disabled={!isTimerRunning && time > 0} />
          )}

          <View style={styles.timingSection}>
            {Platform.OS === 'ios' ? (
              <BlurView intensity={80} tint="light" style={styles.glassCard}>
                {renderGlassCardContent()}
              </BlurView>
            ) : (
              <GlassView intensity="light" style={styles.glassCard}>
                {renderGlassCardContent()}
              </GlassView>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  timingSection: {
    flex: 1,
    width: '90%',
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center', 
  },

  glassCard: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
});

export default TimerScreen;