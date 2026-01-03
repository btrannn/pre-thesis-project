import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, FONTS } from '../../styles/theme';

type FocusStatusType = 'Focusing' | 'Distracting' | 'Break Time' | null;

type FocusStatusDisplayProps = {
  focusStatus: FocusStatusType;
  isTimerRunning: boolean;
};

const FocusStatusDisplay = ({ focusStatus, isTimerRunning }: FocusStatusDisplayProps) => {
  if (!isTimerRunning || !focusStatus) {
    return null;
  }

  const getTextColor = () => {
    switch (focusStatus) {
      case 'Focusing':
        return '#4CAF50';
      case 'Distracting':
        return 'red';
      case 'Break Time':
        return COLORS.active;
      default:
        return COLORS.active;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.2)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.glass}
        />
        <Text style={[styles.text, { color: getTextColor() }]}>
          {focusStatus}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 55,
    marginTop: 100,
    flexGrow: 0,
    flexShrink: 0,
  },
  content: {
    width: '100%',
    height: 53,
    position: 'absolute',
  },
  glass: {
    top: 0,
    left: 0,
    borderRadius: 30,
    borderStyle: 'solid',
    borderColor: '#fff',
    borderWidth: 2,
    width: '100%',
    height: 53,
    position: 'absolute',
  },
  text: {
    top: 15,
    left: 0,
    lineHeight: 20,
    ...FONTS.playfair_14_regular,
    textAlign: 'center',
    width: '100%',
    height: 51,
    position: 'absolute',
  },
});

export default FocusStatusDisplay;