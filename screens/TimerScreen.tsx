import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';

import TaskSelector from '../components/timer/TaskSelector';
import CircularTimer from '../components/timer/CircularTimer';
import GlassView from '../components/design/GlassView';

type TimerScreenProps = {
  isTimerRunning: boolean;
  setIsTimerRunning: (isRunning: boolean) => void;
};

const TimerScreen = ({ isTimerRunning, setIsTimerRunning }: TimerScreenProps) => {
  const [time, setTime] = useState(0);

  const handlePlayPause = useCallback(() => {
    setIsTimerRunning(!isTimerRunning);
  }, [isTimerRunning, setIsTimerRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isTimerRunning && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  const renderGlassCardContent = () => (
    <CircularTimer 
      time={time} 
      isRunning={isTimerRunning} 
      onToggle={handlePlayPause} 
    />
  );

  return (
    <View style={styles.container}>
      <TaskSelector />

      <View style={styles.timingSection}>
          <GlassView intensity="light" style={styles.glassCard}>
            {renderGlassCardContent()}
          </GlassView>
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
    marginTop: 24,
    marginBottom: 60,
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