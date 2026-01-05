import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CircularProgress from './CircularProgress';
import SessionStats from './SessionStats';
import FocusTimeline from './FocusTimeline';
import GlassView from '../design/GlassView';
import { Ionicons } from '@expo/vector-icons';

type SessionSummaryProps = {
  taskName: string;
  focusTime: number;
  breakTime: number;
  focusScores: number[];
  startTime: string;
  endTime: string;
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

  // Cập nhật: Truyền giá trị score thực tế để vẽ biểu đồ chi tiết hơn
  const intervalSize = 30;
  // Thêm định nghĩa kiểu dữ liệu rõ ràng để tránh lỗi TypeScript
  const timelineData: { timestamp: number; score: number }[] = [];
  
  for (let i = 0; i < focusScores.length; i++) {
    timelineData.push({
      timestamp: i * intervalSize,
      score: focusScores[i], // Truyền raw score (0.0 - 1.0)
    });
  }

  return (
    <View style={styles.container}>
      <GlassView intensity="light" style={styles.glassCard}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>SESSION REPORT</Text>
            <View style={styles.taskContainer}>
              <Ionicons name="pricetag-outline" size={16} color="#444" style={{marginRight: 6}} />
              <Text style={styles.taskName}>{taskName}</Text>
            </View>
          </View>

          {/* Main Circle */}
          <View style={styles.progressWrapper}>
            <CircularProgress focusPercentage={focusPercentage} totalMinutes={totalMinutes} />
            <View style={styles.timeBadge}>
              <Ionicons name="time-outline" size={14} color="#2e7d32" />
              <Text style={styles.timeText}>{startTime} - {endTime}</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <SessionStats focusMinutes={focusMinutes} relaxMinutes={breakMinutes} />

          {/* Timeline - Giờ đây sẽ nhận dữ liệu chứa score */}
          <View style={styles.timelineWrapper}>
             <FocusTimeline data={timelineData} startTime={startTime} endTime={endTime} />
          </View>

          {/* Done Button */}
          <TouchableOpacity style={styles.button} onPress={onDone}>
            <Text style={styles.buttonText}>Complete Session</Text>
          </TouchableOpacity>
        </ScrollView>
      </GlassView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '92%',
    alignSelf: 'center',
    marginVertical: 40,
  },
  glassCard: {
    flex: 1,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  taskName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
  },
  progressWrapper: {
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
    marginLeft: 4,
  },
  timelineWrapper: {
    width: '100%',
    marginTop: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#2e7d32',
    paddingVertical: 18,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 32,
    shadowColor: "#2e7d32",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default SessionSummary;