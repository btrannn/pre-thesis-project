import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import MaskedView from '@react-native-masked-view/masked-view';
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';

const renderTimerContent = () => {
  const STROKE_WIDTH = 6;
  const SIZE = 280;
  const RADIUS = SIZE / 2 - STROKE_WIDTH / 2;
  const CX = SIZE / 2;
  const CY = SIZE / 2;

  return (
    <>
      <View style={styles.timerCircleContainer}>
        <Svg
          height={SIZE}
          width={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          style={{ position: 'absolute' }}>
          <Defs>
            <SvgLinearGradient
              id="strokeGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%">
              <Stop
                offset="0%"
                stopColor={COLORS.solidgreen_05}
              />
              <Stop
                offset="100%"
                stopColor={COLORS.solidgreen_01}
              />
            </SvgLinearGradient>
          </Defs>
          <Circle
            cx={CX}
            cy={CY}
            r={RADIUS}
            stroke="url(#strokeGradient)"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
        </Svg>

        <MaskedView
          style={styles.maskedView}
          maskElement={
            <View style={styles.maskedElementContainer}>
              <Text
                style={[
                  styles.timerText,
                  { backgroundColor: 'transparent' },
                ]}>
                00:00
              </Text>
            </View>
          }>
          <LinearGradient
            colors={[COLORS.solidgreen_07, COLORS.solidgreen_01]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradientFill}
          />
        </MaskedView>
      </View>
    </>
  );
};

const TimerScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.taskSelectorContainer}>
        <View style={styles.taskSelectorContent}>
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.9)',
              'rgba(255, 255, 255, 0.7)',
            ]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.glass}
          />
          <Text style={styles.taskText}>Select a task</Text>
          <Ionicons
            name="chevron-down"
            size={24}
            color={COLORS.active}
            style={styles.chevronIcon}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.timingSection}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={80} tint="light" style={styles.glassCard}>
            {renderTimerContent()}
          </BlurView>
        ) : (
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0.4)',
              'rgba(255, 255, 255, 0.2)',
            ]}
            style={styles.glassCard}>
            {renderTimerContent()}
          </LinearGradient>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  taskSelectorContainer: {
    width: '90%',
    height: 55,
    marginTop: 150,
  },
  taskSelectorContent: {
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
  taskText: {
    top: 15,
    left: 0,
    lineHeight: 20,
    ...FONTS.playfair_14_regular,
    color: COLORS.active,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 51,
    position: 'absolute',
  },
  chevronIcon: {
    top: 16,
    right: 20,
    width: 24,
    height: 24,
    position: 'absolute',
  },
  timingSection: {
    flex: 1,
    width: '90%',
    marginTop: 30,
    marginBottom: 30,
  },
  glassCard: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerCircleContainer: {
    width: '85%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskedView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maskedElementContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    ...FONTS.playfair_70_light,
  },
  gradientFill: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default TimerScreen;