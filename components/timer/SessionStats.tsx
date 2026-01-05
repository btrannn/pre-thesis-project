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
      <View style={styles.row}>
        <View style={styles.statItem}>
          <View style={[styles.indicator, styles.focusIndicator]} />
          <Text style={styles.label}>Focus</Text>
          <Text style={styles.percentage}>{focusPercentage}%</Text>
          <Text style={styles.minutes}>{focusMinutes} minutes</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <View style={[styles.indicator, styles.relaxIndicator]} />
          <Text style={styles.label}>Relax</Text>
          <Text style={styles.percentage}>{relaxPercentage}%</Text>
          <Text style={styles.minutes}>{relaxMinutes} minutes</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.2)',
    marginHorizontal: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  focusIndicator: {
    backgroundColor: '#2e7d32',
  },
  relaxIndicator: {
    backgroundColor: '#81C784',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  percentage: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e7d32',
  },
  minutes: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
});

export default SessionStats;