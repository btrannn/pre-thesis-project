import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from '../components/timer/CircularProgress';
import SessionStats from '../components/timer/SessionStats';
import FocusTimeline from '../components/timer/FocusTimeline';
import GlassView from '../components/design/GlassView';
import demoScores from '../datasets/focus_scores.json';

type SessionReport = {
  id: string;
  taskName: string;
  focusTime: number; // in seconds (Total duration reference)
  breakTime: number; // in seconds
  focusScores: number[];
  startTime: string; // HH:MM format
  endTime: string;   // HH:MM format
  date: string;
};

function ReportScreen() {
  // Lấy mẫu dữ liệu từ file json
  // Session 1: Lấy 50 điểm đầu tiên
  const session1Scores = demoScores.slice(0, 50).map(Number);
  
  // Session 2: Lấy 50 điểm tiếp theo
  const session2Scores = demoScores.length > 100 
    ? demoScores.slice(50, 100).map(Number)
    : Array(50).fill(0).map((_, i) => 0.4 + Math.sin(i / 5) * 0.3);

  // Mock data: Chúng ta giữ tổng thời gian (total duration) cố định, 
  // nhưng focusTime/breakTime sẽ được tính lại dựa trên scores.
  const [sessions] = useState<SessionReport[]>([
    {
      id: '1',
      taskName: 'Studying',
      focusTime: 2700, // Total session duration goal (~45 mins)
      breakTime: 900,  // (~15 mins)
      focusScores: session1Scores.length > 0 ? session1Scores : Array(50).fill(0.7),
      startTime: '08:00',
      endTime: '09:00',
      date: 'Today',
    },
    {
      id: '2',
      taskName: 'Working',
      focusTime: 1800, 
      breakTime: 600, 
      focusScores: session2Scores,
      startTime: '10:00',
      endTime: '10:40',
      date: 'Today',
    },
  ]);

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const renderSessionItem = ({ item }: { item: SessionReport }) => {
    const isExpanded = expandedId === item.id;
    
    // --- LOGIC ĐỒNG BỘ DỮ LIỆU ---
    // 1. Tính tổng thời gian dự kiến của phiên
    const totalDurationSeconds = item.focusTime + item.breakTime;
    
    // 2. Phân tích dữ liệu scores thực tế để tìm tỷ lệ tập trung
    let focusCount = 0;
    const scores = item.focusScores;
    const timelineData = [];

    for (let i = 0; i < scores.length; i++) {
      const score = scores[i];
      timelineData.push({
        timestamp: i * 30,
        score: score,
      });

      if (score > 0.5) {
        focusCount++;
      }
    }

    // 3. Tính tỷ lệ % thời gian tập trung thực tế
    const focusRatio = scores.length > 0 ? focusCount / scores.length : 0;

    // 4. Tính lại focusTime và breakTime hiển thị dựa trên tỷ lệ này
    // Điều này đảm bảo Statics khớp hoàn toàn với Timeline
    const displayFocusTime = Math.round(totalDurationSeconds * focusRatio);
    const displayBreakTime = Math.round(totalDurationSeconds * (1 - focusRatio));

    // 5. Chuẩn bị các biến để render
    const totalMinutes = Math.round(totalDurationSeconds / 60);
    const focusMinutes = Math.round(displayFocusTime / 60);
    const breakMinutes = Math.round(displayBreakTime / 60);
    const focusPercentage = (displayFocusTime / totalDurationSeconds) * 100;

    return (
      <View style={styles.cardWrapper}>
        <GlassView intensity="light" style={styles.glassCard}>
          <TouchableOpacity
            style={styles.sessionHeader}
            onPress={() => setExpandedId(isExpanded ? null : item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.headerInfo}>
              <View style={styles.taskBadge}>
                <Ionicons name="pricetag-outline" size={14} color="#555" />
                <Text style={styles.taskName}>{item.taskName}</Text>
              </View>
              
              <View style={styles.timeRow}>
                 <Ionicons name="time-outline" size={12} color="#2e7d32" style={{marginRight: 4}} />
                 <Text style={styles.sessionTime}>
                  {item.startTime} - {item.endTime} • {totalMinutes} min
                </Text>
              </View>
            </View>
            
            <View style={styles.iconContainer}>
               <Ionicons 
                  name={isExpanded ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#2e7d32" 
               />
            </View>
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.expandedContent}>
              <View style={styles.divider} />
              
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
        </GlassView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>YOUR HISTORY</Text>
        <Text style={styles.headerSubtitle}>Recent Focus Sessions</Text>
      </View>

      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={renderSessionItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Để lộ background gradient
  },
  headerSection: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 1.5,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d3436',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Space for tab bar
  },
  cardWrapper: {
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  glassCard: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  headerInfo: {
    flex: 1,
  },
  taskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 6,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionTime: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandedContent: {
    paddingBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    marginBottom: 16,
  },
  timelineContainer: {
    marginTop: 8,
  },
});

export default ReportScreen;