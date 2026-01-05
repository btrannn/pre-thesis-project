import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Svg, Rect, Line, Text as SvgText, Polyline } from 'react-native-svg';

type FocusData = {
  timestamp: number;
  isFocus: boolean;
};

type FocusTimelineProps = {
  data: FocusData[];
  startTime: string; // "HH:MM" format
  endTime: string;   // "HH:MM" format
};

const FocusTimeline = ({ data, startTime, endTime }: FocusTimelineProps) => {
  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 80;
  const chartHeight = 100;
  const barWidth = Math.max(2, chartWidth / (data.length || 1));
  const spacing = barWidth < 4 ? 0 : 1;

  // Create points for the waveform visualization
  const points = data.map((item, index) => {
    const x = index * (barWidth + spacing) + 10;
    const y = item.isFocus ? 30 : 60;
    return `${x},${y}`;
  }).join(' ');

  return (
    <View style={styles.container}>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#2e7d32' }]} />
          <Text style={styles.legendText}>Focus</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: '#81C784' }]} />
          <Text style={styles.legendText}>Relax</Text>
        </View>
      </View>

      <Svg height={chartHeight + 40} width={chartWidth + 20} style={styles.chart}>
        {/* Grid lines */}
        <Line x1="0" y1="30" x2={chartWidth + 20} y2="30" stroke="#e0e0e0" strokeWidth="1" />
        <Line x1="0" y1="60" x2={chartWidth + 20} y2="60" stroke="#e0e0e0" strokeWidth="1" />
        
        {/* Bars for each data point */}
        {data.map((item, index) => {
          const x = index * (barWidth + spacing) + 10;
          const height = item.isFocus ? 30 : 30;
          const y = item.isFocus ? 15 : 45;
          return (
            <Rect
              key={index}
              x={x}
              y={y}
              width={Math.max(1, barWidth - spacing)}
              height={height}
              fill={item.isFocus ? '#2e7d32' : '#81C784'}
              rx={1}
            />
          );
        })}

        {/* Time labels */}
        <SvgText
          x="5"
          y={chartHeight + 25}
          fontSize="10"
          fill="#666"
          fontWeight="500"
        >
          {startTime}
        </SvgText>
        <SvgText
          x={chartWidth - 35}
          y={chartHeight + 25}
          fontSize="10"
          fill="#666"
          fontWeight="500"
        >
          {endTime}
        </SvgText>
      </Svg>

      {/* Labels on the left */}
      <View style={styles.labelsContainer}>
        <Text style={styles.timelineLabel}>Focus</Text>
        <Text style={styles.timelineLabel}>Relax</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: '#f0f7e8',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  chart: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  labelsContainer: {
    position: 'absolute',
    left: 8,
    top: 70,
    justifyContent: 'space-between',
    height: 50,
  },
  timelineLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
});

export default FocusTimeline;