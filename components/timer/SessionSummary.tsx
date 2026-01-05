import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from './CircularProgress';
import SessionStats from './SessionStats';
import FocusTimeline from './FocusTimeline';

type SessionSummaryProps = {
  taskName: string;
  focusTime: number; // in seconds
  breakTime: number; // in seconds
  focusScores: number[];
  startTime: string; // HH:MM format
  endTime: string;   // HH:MM format
  onDone: () => void;
};

const SessionSummary = ({
  taskName,
  focusTime,
  breakTime,
  focusScores,
  startTime,
  endTime,
  onDone,
}: SessionSummaryProps) => {
  const totalSeconds = focusTime + breakTime;
  const totalMinutes = Math.round(totalSeconds / 60);
  const focusMinutes = Math.round(focusTime / 60);
  const breakMinutes = Math.round(breakTime / 60);
  const focusPercentage = totalSeconds > 0 ? (focusTime / totalSeconds) * 100 : 0;

  // Create focus data for timeline (every 30 seconds = 1 bar)
  const intervalSize = 30; // seconds
  const timelineData = [];
  for (let i = 0; i < focusScores.length; i++) {
    timelineData.push({
      timestamp: i * intervalSize,
      isFocus: focusScores[i] > 0.5,
    });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.taskName}>[Session 3] {taskName}</Text>
        </View>
        <Ionicons name="chevron-down" size={20} color="#999" />
      </View>

      <View style={styles.progressSection}>
        <CircularProgress focusPercentage={focusPercentage} totalMinutes={totalMinutes} />
      </View>

      <View style={styles.statsSection}>
        <SessionStats focusMinutes={focusMinutes} relaxMinutes={breakMinutes} />
      </View>

      <FocusTimeline data={timelineData} startTime={startTime} endTime={endTime} />

      <TouchableOpacity style={styles.button} onPress={onDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flex: 1,
  },
  taskName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  progressSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  statsSection: {
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2e7d32',
    marginHorizontal: 0,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SessionSummary;