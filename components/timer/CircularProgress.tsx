import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Svg, Circle as SvgCircle, Path } from 'react-native-svg';

type CircularProgressProps = {
  focusPercentage: number;
  totalMinutes: number;
};

const CircularProgress = ({ focusPercentage, totalMinutes }: CircularProgressProps) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const focusStrokeDashoffset = circumference - (focusPercentage / 100) * circumference;
  
  return (
    <View style={styles.container}>
      <Svg height={200} width={200} viewBox="0 0 200 200">
        {/* Background circle */}
        <SvgCircle
          cx="100"
          cy="100"
          r={radius}
          stroke="#e0f2e0"
          strokeWidth="18"
          fill="none"
        />
        {/* Focus arc */}
        <SvgCircle
          cx="100"
          cy="100"
          r={radius}
          stroke="#2e7d32"
          strokeWidth="18"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={focusStrokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin="100, 100"
        />
      </Svg>
      <View style={styles.centerContent}>
        <Text style={styles.percentage}>{Math.round(focusPercentage)}%</Text>
        <Text style={styles.label}>of {totalMinutes} minutes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1b5e20',
  },
  label: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});

export default CircularProgress;