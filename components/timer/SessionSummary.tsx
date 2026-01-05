import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CircularProgress from './CircularProgress';
import SessionStats from './SessionStats';
import FocusTimeline from './FocusTimeline';
import GlassView from '../design/GlassView';
import { Ionicons } from '@expo/vector-icons';
import demoScores from '../../datasets/focus_scores.json'; // Import dữ liệu mẫu

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
  // --- SMART DEMO MODE ---
  // Nếu tổng thời gian session < 1 phút (do chạy test/demo), 
  // tự động giả lập dữ liệu của một phiên làm việc chuẩn để UI đẹp.
  const realTotalSeconds = focusTime + breakTime;
  const isDemo = realTotalSeconds < 60;

  // --- LOGIC XỬ LÝ DỮ LIỆU & ĐỒNG BỘ UI ---
  const { 
    displayFocusTime, 
    displayBreakTime, 
    displayStartTime, 
    displayEndTime, 
    timelineData 
  } = useMemo(() => {
    if (isDemo) {
      // === DEMO MODE ===
      // 1. Chuẩn bị dữ liệu cho Timeline từ file JSON
      const targetPoints = 60;
      const step = Math.max(1, Math.floor(demoScores.length / targetPoints));
      const scores = [];
      let focusCount = 0; // Đếm số lượng mẫu đạt chuẩn tập trung

      for (let i = 0; i < targetPoints; i++) {
         const index = (i * step) % demoScores.length;
         const score = Number(demoScores[index]);
         
         scores.push({
           timestamp: i * 30,
           score: score
         });

         // Đếm số điểm đạt ngưỡng tập trung (> 0.5) để tính stats
         if (score > 0.5) {
           focusCount++;
         }
      }

      // 2. Tính toán thời gian dựa trên TỶ LỆ THỰC TẾ của dữ liệu
      // Giả sử tổng phiên demo là 45 phút (2700s)
      const totalDemoSeconds = 2700;
      
      // Tính tỷ lệ tập trung thực tế từ dữ liệu mẫu
      const focusRatio = focusCount / targetPoints;

      // Phân bổ thời gian theo đúng tỷ lệ này để đồng bộ với biểu đồ
      const calculatedFocusTime = Math.round(totalDemoSeconds * focusRatio);
      const calculatedBreakTime = Math.round(totalDemoSeconds * (1 - focusRatio));

      return {
        displayFocusTime: calculatedFocusTime,
        displayBreakTime: calculatedBreakTime, // Ở demo mode, break time đại diện cho thời gian mất tập trung
        displayStartTime: "08:00",
        displayEndTime: "08:45",
        timelineData: scores
      };
    } else {
      // === REAL MODE ===
      const intervalSize = 30;
      const realScores = [];
      for (let i = 0; i < focusScores.length; i++) {
        realScores.push({
          timestamp: i * intervalSize,
          score: focusScores[i],
        });
      }

      return {
        displayFocusTime: focusTime,
        displayBreakTime: breakTime,
        displayStartTime: startTime,
        displayEndTime: endTime,
        timelineData: realScores
      };
    }
  }, [isDemo, focusScores, focusTime, breakTime, startTime, endTime]);

  const displayTotalSeconds = displayFocusTime + displayBreakTime;

  // Tính toán các chỉ số hiển thị cho Stats và Circle
  const totalMinutes = Math.round(displayTotalSeconds / 60);
  const focusMinutes = Math.round(displayFocusTime / 60);
  const breakMinutes = Math.round(displayBreakTime / 60);
  
  // % hiển thị trên vòng tròn
  const sessionPercentage = displayTotalSeconds > 0 ? (displayFocusTime / displayTotalSeconds) * 100 : 0;

  // Tính điểm trung bình để hiển thị (chỉ dùng cho UI badge nếu cần)
  const averageFocus = timelineData.length > 0
    ? (timelineData.reduce((sum, item) => sum + item.score, 0) / timelineData.length) * 100
    : 0;

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
            <View style={styles.taskBadge}>
              <Ionicons name="pricetag-outline" size={14} color="#555" />
              <Text style={styles.taskName}>{taskName}</Text>
            </View>
          </View>

          {/* Main Circle & Stats Area */}
          <View style={styles.progressContainer}>
            {/* Circle Wrapper: Chứa vòng tròn */}
            <View style={styles.circleWrapper}>
              <CircularProgress focusPercentage={sessionPercentage} totalMinutes={totalMinutes} />
              {/* Center Stats removed */}
            </View>

            <View style={styles.timeBadgeContainer}>
              <View style={styles.timeBadge}>
                <Ionicons name="time-outline" size={14} color="#2e7d32" />
                <Text style={styles.timeText}>{displayStartTime} - {displayEndTime}</Text>
              </View>
            </View>
          </View>

          {/* Stats Grid */}
          <SessionStats focusMinutes={focusMinutes} relaxMinutes={breakMinutes} />

          {/* Timeline */}
          <View style={styles.timelineWrapper}>
             <FocusTimeline data={timelineData} startTime={displayStartTime} endTime={displayEndTime} />
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  taskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  taskName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 6,
  },
  
  // Updated Styles for Progress Section
  progressContainer: {
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
    // Loại bỏ position relative ở đây để tránh conflict
  },
  circleWrapper: {
    position: 'relative', // Quan trọng để con absolute căn theo nó
    alignItems: 'center',
    justifyContent: 'center',
    width: 200, // Đặt kích thước cố định hoặc bằng kích thước CircularProgress
    height: 200,
    marginBottom: 16, // Khoảng cách với Time Badge bên dưới
  },
  timeBadgeContainer: {
    alignItems: 'center',
    marginTop: 0, // Đã có margin từ circleWrapper
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2e7d32',
    marginLeft: 6,
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
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default SessionSummary;