import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../styles/theme';

type TaskSelectorProps = {
  focusStatus?: 'Focusing' | 'Distracting' | 'Break Time' | null;
  onPress?: () => void;
};

const TaskSelector = ({ focusStatus, onPress }: TaskSelectorProps) => {
  const isRunning = !!focusStatus;

  const textStyle = isRunning ? styles.focusStatusText : styles.text;
  const displayedText = isRunning ? (focusStatus || 'Focusing') : 'Select a task';
  const showIcon = !isRunning;

  return (
    <TouchableOpacity 
      style={styles.container} 
      disabled={isRunning} 
      onPress={onPress}
    >
      <View style={styles.content}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.2)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.glass}
        />
        
        <Text 
          style={[
            textStyle, 
            (focusStatus === 'Distracting') && styles.distractingColor 
          ]}
        >
          {displayedText}
        </Text>

        {showIcon && (
          <Ionicons
            name="chevron-down"
            size={24}
            color={COLORS.active}
            style={styles.icon}
          />
        )}
      </View>
    </TouchableOpacity>
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
    color: COLORS.active,
    textAlign: 'center',
    width: '100%',
    height: 51,
    position: 'absolute',
  },

  focusStatusText: {
    top: 15,
    left: 0,
    lineHeight: 20,
    ...FONTS.playfair_14_bold,
    color: COLORS.solidgreen_05,
    textAlign: 'center',
    width: '100%',
    height: 51,
    position: 'absolute',
  },
  
  distractingColor: {
    color: 'red',
  },

  icon: {
    top: 16,
    right: 20,
    position: 'absolute',
  },
});

export default TaskSelector;