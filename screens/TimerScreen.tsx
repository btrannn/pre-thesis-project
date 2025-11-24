import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

import TaskSelector from '../components/timer/TaskSelector';
import CircularTimer from '../components/timer/CircularTimer';
import GlassView from '../components/design/GlassView';

type FocusStatusType = 'Focusing' | 'Distracting' | 'Break Time' | null;
type TimerMode = 'Working' | 'Breaking';

const MIN_BREAK_SECONDS = 5 * 60; 
const BREAK_RATIO = 1 / 3;

const calculateBreakTime = (focusSeconds: number): number => {
  const focusMinutes = Math.floor(focusSeconds / 60);
  if (focusMinutes <= 25) {
    return MIN_BREAK_SECONDS;
  }
  const calculatedBreakTime = Math.round(focusSeconds * BREAK_RATIO);
  return Math.max(calculatedBreakTime, MIN_BREAK_SECONDS);
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

  const handleStop = useCallback(() => {
    setTime(0);
    setFocusTime(0);
    setMode('Working');
    
    onFinishSession();
  }, [onFinishSession]);

  const handleBreakEnd = useCallback(() => {
    setMode('Working'); 
    setTime(focusTime + 1); 
    setFocusStatus('Focusing');
    setIsTimerRunning(true); 
  }, [focusTime, setFocusStatus, setIsTimerRunning]);

  const handlePlayPause = useCallback(() => {
    if (!isTimerRunning && mode === 'Breaking') {
        setIsTimerRunning(true);
        return;
    }

    const nextState = !isTimerRunning;
    setIsTimerRunning(nextState);
    
    if (nextState) {
      if (mode === 'Working') {
         setFocusStatus('Focusing'); 
      }
    } else {
      if (mode === 'Working') {
        const breakDuration = calculateBreakTime(time);
        setFocusTime(time);
        setTime(breakDuration);
        setMode('Breaking');
        setFocusStatus('Break Time');
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
      <TaskSelector focusStatus={focusStatus} onPress={handlePlayPause} />

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