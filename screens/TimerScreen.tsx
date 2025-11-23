import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONTS } from '../styles/theme';

import IconPlay from '../components/icons/IconPlay';
import IconPause from '../components/icons/IconPause';

import GradientText from '../components/design/GradientText';
import GradientCircle from '../components/design/GradientCircle';
import GlassView from '../components/design/GlassView';

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const pad = (num: number) => (num < 10 ? '0' : '') + num;
  return `${pad(minutes)}:${pad(seconds)}`;
};

const TimerScreen = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handlePlayPause = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const PlayPauseIcon = isRunning ? (
    <IconPause size={30} />
  ) : (
    <IconPlay />
  );

  const renderGlassCardContent = () => (
    <>
      <View style={styles.timerCircleContainer}>
        <View style={{ position: 'absolute' }}>
          <GradientCircle size={280} strokeWidth={6} />
        </View>

        <GradientText text={formatTime(time)} fontStyle={FONTS.playfair_70_light} />
      </View>

      <TouchableOpacity style={styles.playButtonContainer} onPress={handlePlayPause}>
        <View style={styles.playButtonGlass} />
        <View style={styles.playIconContainer}>{PlayPauseIcon}</View>
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.taskSelectorContainer}>
        <GlassView intensity="heavy" style={styles.glassSelector}>
          <Text style={styles.taskText}>Select a task</Text>
          <Ionicons
            name="chevron-down"
            size={24}
            color={COLORS.active}
            style={styles.chevronIcon}
          />
        </GlassView>
      </TouchableOpacity>

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
  taskSelectorContainer: {
    width: '90%',
    height: 55,
    marginTop: 150,
  },
  glassSelector: {
    width: '100%',
    height: 53,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskText: {
    ...FONTS.playfair_14_regular,
    color: COLORS.active,
    textAlign: 'center',
  },
  chevronIcon: {
    position: 'absolute',
    right: 20,
  },
  timingSection: {
    flex: 1,
    width: '90%',
    marginTop: 30,
    marginBottom: 30,
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
  timerCircleContainer: {
    width: 280,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150,
  },
  playButtonContainer: {
    position: 'absolute',
    bottom: '15%',
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButtonGlass: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 200,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  playIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
});

export default TimerScreen;