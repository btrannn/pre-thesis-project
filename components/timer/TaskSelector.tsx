import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../styles/theme';

const TaskSelector = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.content}>
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.9)', 'rgba(255, 255, 255, 0.7)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.glass}
        />
        <Text style={styles.text}>Select a task</Text>
        <Ionicons
          name="chevron-down"
          size={24}
          color={COLORS.active}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 55,
    marginTop: 150,
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
  icon: {
    top: 16,
    right: 20,
    position: 'absolute',
  },
});

export default TaskSelector;