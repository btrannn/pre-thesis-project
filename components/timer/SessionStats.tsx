import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type SessionStatsProps = {
  focusMinutes: number;
  relaxMinutes: number;
};

const SessionStats = ({ focusMinutes, relaxMinutes }: SessionStatsProps) => {
  const totalMinutes = focusMinutes + relaxMinutes;
  const focusPercentage = totalMinutes > 0 ? Math.round((focusMinutes / totalMinutes) * 100) : 0;
  const relaxPercentage = totalMinutes > 0 ? Math.round((relaxMinutes / totalMinutes) * 100) : 0;

  return (
    <View style={styles.container}>
      {/* Focus Column */}
      <View style={styles.column}>
        <View style={styles.labelGroup}>
            <View style={[styles.dot, styles.focusDot]} />
            <Text style={styles.label}>Focus Time</Text>
        </View>
        <View style={styles.valueGroup}>
            <Text style={styles.number}>{focusMinutes}</Text>
            <Text style={styles.unit}>min</Text>
        </View>
        <Text style={styles.percentage}>{focusPercentage}% of session</Text>
      </View>

      {/* Vertical Divider */}
      <View style={styles.divider} />

      {/* Relax Column */}
      <View style={styles.column}>
        <View style={styles.labelGroup}>
            <View style={[styles.dot, styles.relaxDot]} />
            <Text style={styles.label}>Break Time</Text>
        </View>
        <View style={styles.valueGroup}>
            <Text style={styles.number}>{relaxMinutes}</Text>
            <Text style={styles.unit}>min</Text>
        </View>
        <Text style={styles.percentage}>{relaxPercentage}% of session</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignSelf: 'center',
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  focusDot: { backgroundColor: '#2e7d32' },
  relaxDot: { backgroundColor: '#81C784' },
  
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  valueGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  number: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2d3436',
    marginRight: 2,
  },
  unit: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
  },
  percentage: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
});

export default SessionStats;