import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Svg, Rect, Line, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import demoScores from '../../datasets/focus_scores.json';

type FocusData = {
  timestamp: number;
  score: number; // Đã đổi từ isFocus boolean sang score number (0.0 - 1.0)
};

type FocusTimelineProps = {
  data: FocusData[];
  startTime: string; 
  endTime: string;   
};

const FocusTimeline = ({ data: realData, startTime, endTime }: FocusTimelineProps) => {
  // --- LOGIC XỬ LÝ DỮ LIỆU DEMO ---
  const { displayData, displayStart, displayEnd } = useMemo(() => {
    // Nếu dữ liệu thực quá ít (< 10 điểm), dùng file JSON mẫu để demo cho đẹp
    if (!realData || realData.length < 10) {
      // Lấy mẫu khoảng 60 cột dữ liệu để vừa vặn chiều ngang
      const targetPoints = 60;
      const step = Math.ceil(demoScores.length / targetPoints);
      
      const mockedData = demoScores
        .filter((_, i) => i % step === 0)
        .slice(0, targetPoints)
        .map((score, index) => ({
          timestamp: index,
          score: score as number // Giữ nguyên giá trị float
        }));

      return {
        displayData: mockedData,
        displayStart: "08:00",
        displayEnd: "08:45"
      };
    }
    
    return {
      displayData: realData,
      displayStart: startTime,
      displayEnd: endTime
    };
  }, [realData, startTime, endTime]);

  // --- TÍNH TOÁN KÍCH THƯỚC ---
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.92; 
  const padding = 48; 
  const availableWidth = containerWidth - padding;
  
  const chartHeight = 100; // Tăng chiều cao lên chút
  // Tính độ rộng cột tự động dựa trên số lượng dữ liệu
  const barWidth = Math.max(2, availableWidth / (displayData.length || 1));
  const spacing = 1; // Khoảng cách nhỏ giữa các cột
  const effectiveBarWidth = Math.max(1, barWidth - spacing);

  // Ngưỡng tập trung (0.5 tương ứng với 50% chiều cao)
  const thresholdY = chartHeight * 0.5;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>FOCUS QUALITY</Text>
        <View style={styles.legendContainer}>
             <View style={[styles.dot, {backgroundColor: '#2e7d32'}]} />
             <Text style={styles.legendText}>Focus</Text>
             <View style={[styles.dot, {backgroundColor: '#FFB74D', marginLeft: 8}]} />
             <Text style={styles.legendText}>Distracted</Text>
        </View>
      </View>
      
      <Svg height={chartHeight + 20} width={availableWidth}>
        <Defs>
            <LinearGradient id="gradFocus" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#2e7d32" stopOpacity="1" />
                <Stop offset="1" stopColor="#66BB6A" stopOpacity="0.8" />
            </LinearGradient>
            <LinearGradient id="gradDistract" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor="#FF9800" stopOpacity="1" />
                <Stop offset="1" stopColor="#FFB74D" stopOpacity="0.8" />
            </LinearGradient>
        </Defs>

        {/* Đường nền trục 0 */}
        <Line 
            x1="0" y1={chartHeight} 
            x2={availableWidth} y2={chartHeight} 
            stroke="rgba(0,0,0,0.1)" 
            strokeWidth="1" 
        />

        {/* Đường Threshold 50% */}
        <Line 
            x1="0" y1={thresholdY} 
            x2={availableWidth} y2={thresholdY} 
            stroke="#999" 
            strokeWidth="1" 
            strokeDasharray="4 4"
        />
        
        {/* Vẽ các cột dữ liệu */}
        {displayData.map((item, index) => {
          const x = index * barWidth;
          const score = Math.max(0, Math.min(1, item.score)); // Clamp 0-1
          
          const barHeight = score * chartHeight;
          const y = chartHeight - barHeight;
          
          // Logic màu sắc: > 0.5 là xanh (Focus), < 0.5 là vàng/cam (Distracted)
          const isFocus = score >= 0.5;
          const fillUrl = isFocus ? "url(#gradFocus)" : "url(#gradDistract)";

          return (
            <Rect
              key={index}
              x={x}
              y={y}
              width={effectiveBarWidth}
              height={barHeight}
              fill={fillUrl}
              rx={effectiveBarWidth / 2} // Bo tròn đầu cột
            />
          );
        })}

        {/* Nhãn thời gian */}
        <SvgText x="0" y={chartHeight + 15} fontSize="10" fill="#999" fontWeight="600">
          {displayStart}
        </SvgText>
        <SvgText x={availableWidth} y={chartHeight + 15} fontSize="10" fill="#999" fontWeight="600" textAnchor="end">
          {displayEnd}
        </SvgText>
        
        {/* Nhãn Threshold bên phải */}
        <SvgText x={availableWidth - 5} y={thresholdY - 4} fontSize="9" fill="#999" textAnchor="end">
            Threshold
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 11,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendText: {
    fontSize: 10,
    color: '#888',
    marginLeft: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  }
});

export default FocusTimeline;