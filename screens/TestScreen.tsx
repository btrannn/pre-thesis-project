import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GlassView from '../components/design/GlassView';

// --- Types ---
type CalibrationStep = 'intro' | 'focus_task' | 'distract_task' | 'calculating' | 'result';

// --- Constants ---
const COLORS = [
  { name: 'RED', hex: '#FF5252' },
  { name: 'GREEN', hex: '#4CAF50' },
  { name: 'BLUE', hex: '#2196F3' },
  { name: 'YELLOW', hex: '#FFC107' },
];

const TEST_DURATION = 5; // Updated to 5 seconds as requested

type TestScreenProps = {
  onComplete: () => void;
};

const TestScreen = ({ onComplete }: TestScreenProps) => {
  const [step, setStep] = useState<CalibrationStep>('intro');
  const [timer, setTimer] = useState(TEST_DURATION);
  
  // Stroop Test State
  const [stroopWord, setStroopWord] = useState(COLORS[0]);
  const [stroopColor, setStroopColor] = useState(COLORS[1]);
  const [score, setScore] = useState(0);

  // Animations
  const progressAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // --- Logic Functions ---
  const generateStroop = () => {
    const randomWordIdx = Math.floor(Math.random() * COLORS.length);
    const randomColorIdx = Math.floor(Math.random() * COLORS.length);
    setStroopWord(COLORS[randomWordIdx]);
    setStroopColor(COLORS[randomColorIdx]);
  };

  const handleStroopAnswer = (selectedColorHex: string) => {
    // Logic: Choose INK COLOR
    if (selectedColorHex === stroopColor.hex) {
      setScore(prev => prev + 1);
    }
    generateStroop();
  };

  // --- Effects ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if ((step === 'focus_task' || step === 'distract_task') && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      
      // Animation progress bar
      Animated.timing(progressAnim, {
        toValue: (TEST_DURATION - timer + 1) / TEST_DURATION,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();

    } else if (timer === 0) {
      handleNextStep();
    }

    return () => clearInterval(interval);
  }, [step, timer]);

  const handleNextStep = () => {
    // If finishing result step -> Call onComplete to switch to main app
    if (step === 'result') {
        onComplete();
        return;
    }

    // Fade Out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Step transition logic
      if (step === 'intro') {
        setStep('focus_task');
        generateStroop();
      }
      else if (step === 'focus_task') setStep('distract_task');
      else if (step === 'distract_task') setStep('calculating');
      
      // Reset Timer & Progress
      setTimer(TEST_DURATION);
      progressAnim.setValue(0);
      
      // Fade In
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto transition from calculating to result
      if (step === 'distract_task') {
        setTimeout(() => setStep('result'), 3000);
      }
    });
  };

  // --- Render Helpers ---
  const renderContent = () => {
    switch (step) {
      case 'intro':
        return (
          <View style={styles.content}>
            <View style={styles.topSection}>
                <View style={styles.iconContainer}>
                   <Ionicons name="scan-outline" size={50} color="#2e7d32" />
                </View>
                <Text style={styles.title}>Brainwave Calibration</Text>
                <Text style={styles.description}>
                  We need to measure your brain response in two states to optimize the algorithm.
                </Text>
            </View>
            
            <View style={styles.stepInfo}>
                <View style={styles.stepItem}>
                    <Text style={styles.stepLabel}>STEP 1</Text>
                    <Text style={styles.stepText}>Stroop Test (Focus)</Text>
                </View>
                <View style={styles.stepDivider} />
                <View style={styles.stepItem}>
                    <Text style={styles.stepLabel}>STEP 2</Text>
                    <Text style={styles.stepText}>Alpha Relax (Relax)</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Start Calibration</Text>
            </TouchableOpacity>
          </View>
        );

      case 'focus_task':
        return (
          <View style={styles.content}>
            <View style={styles.topSection}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>PART 1: FOCUS (STROOP)</Text>
                </View>
                <Text style={styles.instruction}>
                    Select the button matching the <Text style={{fontWeight: 'bold', color: '#000'}}>INK COLOR</Text> of the text below!
                </Text>
            </View>
            
            {/* STROOP WORD */}
            <View style={styles.stroopContainer}>
              <Text style={[styles.stroopText, { color: stroopColor.hex }]}>
                {stroopWord.name}
              </Text>
            </View>

            {/* COLOR OPTIONS */}
            <View style={styles.optionsContainer}>
                <View style={styles.optionsRow}>
                    <TouchableOpacity 
                        style={[styles.colorButton, {backgroundColor: COLORS[0].hex}]} 
                        onPress={() => handleStroopAnswer(COLORS[0].hex)}
                    />
                    <TouchableOpacity 
                        style={[styles.colorButton, {backgroundColor: COLORS[1].hex}]} 
                        onPress={() => handleStroopAnswer(COLORS[1].hex)}
                    />
                </View>
                <View style={styles.optionsRow}>
                    <TouchableOpacity 
                        style={[styles.colorButton, {backgroundColor: COLORS[2].hex}]} 
                        onPress={() => handleStroopAnswer(COLORS[2].hex)}
                    />
                    <TouchableOpacity 
                        style={[styles.colorButton, {backgroundColor: COLORS[3].hex}]} 
                        onPress={() => handleStroopAnswer(COLORS[3].hex)}
                    />
                </View>
            </View>

            <View style={styles.timerContainer}>
              <View style={styles.timerHeader}>
                  <Text style={styles.timerText}>{timer}s</Text>
                  <Ionicons name="stopwatch-outline" size={20} color="#666" />
              </View>
              <View style={styles.progressBarBg}>
                <Animated.View 
                  style={[
                    styles.progressBarFill, 
                    { 
                        width: progressAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%']
                        }), 
                        backgroundColor: '#2e7d32' 
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
        );

      case 'distract_task':
        return (
          <View style={styles.content}>
            <View style={styles.topSection}>
                <View style={[styles.badge, { backgroundColor: 'rgba(33, 150, 243, 0.1)' }]}>
                  <Text style={[styles.badgeText, { color: '#1976D2' }]}>PART 2: RELAX (ALPHA)</Text>
                </View>
                <Text style={styles.instruction}>Close your eyes and relax completely. Take a deep breath.</Text>
            </View>
            
            <View style={styles.relaxContainer}>
               <View style={styles.eyeIconWrapper}>
                   <Ionicons name="eye-off-outline" size={80} color="#64B5F6" />
               </View>
               <Text style={styles.relaxSubtext}>Don't think about anything...</Text>
            </View>

            <View style={styles.timerContainer}>
              <View style={styles.timerHeader}>
                  <Text style={styles.timerText}>{timer}s</Text>
                  <Ionicons name="leaf-outline" size={20} color="#666" />
              </View>
              <View style={styles.progressBarBg}>
                <Animated.View 
                  style={[
                    styles.progressBarFill, 
                    { 
                        width: progressAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '100%']
                        }), 
                        backgroundColor: '#64B5F6' 
                    }
                  ]} 
                />
              </View>
            </View>
          </View>
        );

      case 'calculating':
        return (
          <View style={styles.contentCenter}>
            <View style={styles.loadingContainer}>
                <Ionicons name="sync" size={60} color="#2e7d32" style={{marginBottom: 20}} />
                <Text style={styles.title}>Analyzing...</Text>
                <Text style={styles.description}>Establishing Theta/Beta thresholds based on collected data.</Text>
            </View>
          </View>
        );

      case 'result':
        return (
          <View style={styles.content}>
            <View style={styles.contentCenter}>
                <View style={[styles.iconContainer, {backgroundColor: 'rgba(46, 125, 50, 0.1)'}]}>
                    <Ionicons name="checkmark-circle" size={60} color="#2e7d32" />
                </View>
                <Text style={styles.title}>Complete!</Text>
                <Text style={styles.description}>
                  Calibration data saved. You are ready to start a session.
                </Text>
                <View style={styles.resultStats}>
                    <Text style={styles.resultLabel}>FOCUS SCORE</Text>
                    <Text style={styles.resultValue}>{score * 10} pts</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={() => handleNextStep()}>
              <Text style={styles.buttonText}>Go to Timer</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ flex: 1, width: '100%', opacity: fadeAnim, justifyContent: 'center', alignItems: 'center' }}>
        <GlassView intensity="light" style={styles.glassCard}>
          {renderContent()}
        </GlassView>
      </Animated.View>
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },
  glassCard: {
    width: '100%',
    padding: 24,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    minHeight: 500,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  topSection: {
      alignItems: 'center',
      width: '100%',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(46, 125, 50, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  badge: {
    backgroundColor: 'rgba(46, 125, 50, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2e7d32',
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 12,
  },
  instruction: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  stepInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
      width: '100%',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
  },
  stepItem: {
      alignItems: 'center',
      flex: 1,
  },
  stepLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: '#888',
      marginBottom: 4,
  },
  stepText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#333',
      textAlign: 'center',
  },
  stepDivider: {
      height: 1,
      width: 40,
      backgroundColor: '#ddd',
      marginHorizontal: 10,
  },
  stroopContainer: {
    backgroundColor: '#fff',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    alignItems: 'center',
  },
  stroopText: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 2,
  },
  optionsContainer: {
      width: '100%',
      marginBottom: 30,
  },
  optionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
  },
  colorButton: {
      width: '48%',
      height: 60,
      borderRadius: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
  },
  relaxContainer: {
      alignItems: 'center',
      marginBottom: 40,
      flex: 1,
      justifyContent: 'center',
  },
  eyeIconWrapper: {
      width: 140,
      height: 140,
      borderRadius: 70,
      backgroundColor: 'rgba(33, 150, 243, 0.05)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
  },
  relaxSubtext: {
      fontSize: 16,
      color: '#888',
      fontStyle: 'italic',
  },
  timerContainer: {
    width: '100%',
    marginTop: 'auto',
  },
  timerHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 8,
      paddingHorizontal: 4,
  },
  timerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  progressBarBg: {
    height: 8,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  resultStats: {
      marginBottom: 30,
      paddingVertical: 15,
      paddingHorizontal: 30,
      backgroundColor: '#fff',
      borderRadius: 16,
      alignItems: 'center',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
  },
  resultLabel: {
      fontSize: 12,
      color: '#888',
      fontWeight: '700',
      marginBottom: 4,
  },
  resultValue: {
      fontSize: 24,
      fontWeight: '700',
      color: '#2d3436',
  },
  loadingContainer: {
      alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 30,
    paddingVertical: 18,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: "#2e7d32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default TestScreen;