import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type GlassViewProps = {
  style?: StyleProp<ViewStyle>;
  intensity?: 'light' | 'medium' | 'heavy';
  children?: React.ReactNode;
};

const GlassView = ({ style, intensity = 'medium', children }: GlassViewProps) => {
  let colors = ['rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.2)'];

  if (intensity === 'light') {
    colors = ['rgba(255, 255, 255, 0.6)', 'rgba(255, 255, 255, 0.3)'];
  } else if (intensity === 'heavy') {
    colors = ['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)'];
  }

  return (
    <LinearGradient
      colors={colors as [string, string, ...string[]]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={[styles.glass, style]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  glass: {
    overflow: 'hidden', 
  },
});

export default GlassView;