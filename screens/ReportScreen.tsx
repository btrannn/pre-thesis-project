import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import CircularProgress from '../components/timer/CircularProgress';
import SessionStats from '../components/timer/SessionStats';
import FocusTimeline from '../components/timer/FocusTimeline';

type SessionReport = {
  id: string;
  taskName: string;
  focusTime: number; // in seconds
  breakTime: number; // in seconds
  focusScores: number[];
  startTime: string; // HH:MM format
  endTime: string;   // HH:MM format
  date: string;
};

function ReportScreen() {
  // Mock data for demonstration - in a real app, this would come from stored sessions
  const [sessions] = useState<SessionReport[]>([
    {
      id: '1',
      taskName: 'Studying',
      focusTime: 2700, // 45 minutes
      breakTime: 900, // 15 minutes
      focusScores: Array(50).fill(0).map(() => Math.random()),
      startTime: '08:00',
      endTime: '09:00',
      date: 'Today',
    },
    {
      id: '2',
      taskName: 'Working',
      focusTime: 1800, // 30 minutes
      breakTime: 600, // 10 minutes
      focusScores: Array(33).fill(0).map(() => Math.random()),
      startTime: '10:00',
      endTime: '10:40',
      date: 'Today',
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const renderSessionItem = ({ item }: { item: SessionReport }) => {
    const isExpanded = expandedId === item.id;
    const totalSeconds = item.focusTime + item.breakTime;
    const totalMinutes = Math.round(totalSeconds / 60);
    const focusMinutes = Math.round(item.focusTime / 60);
    const breakMinutes = Math.round(item.breakTime / 60);
    const focusPercentage = totalSeconds > 0 ? (item.focusTime / totalSeconds) * 100 : 0;

    const timelineData = [];
    for (let i = 0; i < item.focusScores.length; i++) {
      timelineData.push({
        timestamp: i * 30,
        isFocus: item.focusScores[i] > 0.5,
      });
    }

    return (
      <View style={styles.sessionCard}>
        <TouchableOpacity
          style={styles.sessionHeader}
          onPress={() => setExpandedId(isExpanded ? null : item.id)}
        >
          <View style={styles.headerInfo}>
            <Text style={styles.sessionTask}>[Session] {item.taskName}</Text>
            <Text style={styles.sessionTime}>
              {item.startTime} - {item.endTime} • {totalMinutes} min
            </Text>
          </View>
          <Text style={styles.expandIcon}>{isExpanded ? '−' : '+'}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedContent}>
            <View style={styles.progressContainer}>
              <CircularProgress focusPercentage={focusPercentage} totalMinutes={totalMinutes} />
            </View>

            <View style={styles.statsContainer}>
              <SessionStats focusMinutes={focusMinutes} relaxMinutes={breakMinutes} />
            </View>

            <View style={styles.timelineContainer}>
              <FocusTimeline data={timelineData} startTime={item.startTime} endTime={item.endTime} />
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Session Reports</Text>
        <Text style={styles.subtitle}>Your focus analytics</Text>
      </View>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={renderSessionItem}
        scrollEnabled={false}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  headerSection: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1b5e20',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
  },
  list: {
    marginTop: 8,
  },
  sessionCard: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 12,
    overflow: 'hidden',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  headerInfo: {
    flex: 1,
  },
  sessionTask: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sessionTime: {
    fontSize: 12,
    color: '#999',
  },
  expandIcon: {
    fontSize: 20,
    color: '#2e7d32',
    fontWeight: '700',
    marginLeft: 12,
  },
  expandedContent: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  statsContainer: {
    marginBottom: 16,
  },
  timelineContainer: {
    marginTop: 12,
  },
});

export default ReportScreen;