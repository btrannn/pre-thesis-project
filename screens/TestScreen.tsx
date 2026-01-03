import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TestScreenProps {
  onComplete: () => void;
}

const TestScreen: React.FC<TestScreenProps> = ({ onComplete }) => {
  const [focusTestDone, setFocusTestDone] = useState(false);
  const [distractedTestDone, setDistractedTestDone] = useState(false);
  const [testInProgress, setTestInProgress] = useState<'focus' | 'distracted' | null>(null);

  const startTest = (type: 'focus' | 'distracted') => {
    setTestInProgress(type);
    // Simulate 2-minute test
    setTimeout(() => {
      if (type === 'focus') {
        setFocusTestDone(true);
      } else {
        setDistractedTestDone(true);
      }
      setTestInProgress(null);
    }, 2000); // 2 seconds for simulation, change to 120000 for 2 minutes
  };

  const bothTestsDone = focusTestDone && distractedTestDone;

  return (
    <View style={styles.container}>
      <View style={styles.glassContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Calibration Setup</Text>
          <Text style={styles.description}>
            To personalize your focus detection, complete two short tests. This will help the app understand your brain activity during focused and distracted states.
          </Text>

          <View style={styles.testSection}>
            <Text style={styles.testTitle}>1. High Focus Test</Text>
            <Text style={styles.testDescription}>
              Solve simple math problems for 2 minutes. Stay engaged and concentrated.
            </Text>
            {focusTestDone ? (
              <Text style={styles.doneText}>✓ Completed</Text>
            ) : testInProgress === 'focus' ? (
              <Text style={styles.progressText}>Test in progress... (EEG data being collected)</Text>
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => startTest('focus')}>
                <Text style={styles.buttonText}>Start Focus Test</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.testSection}>
            <Text style={styles.testTitle}>2. Distracted Test</Text>
            <Text style={styles.testDescription}>
              Relax and daydream for 2 minutes. Let your mind wander freely.
            </Text>
            {distractedTestDone ? (
              <Text style={styles.doneText}>✓ Completed</Text>
            ) : testInProgress === 'distracted' ? (
              <Text style={styles.progressText}>Test in progress... (EEG data being collected)</Text>
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => startTest('distracted')}>
                <Text style={styles.buttonText}>Start Distracted Test</Text>
              </TouchableOpacity>
            )}
          </View>

          {bothTestsDone && (
            <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
              <Text style={styles.completeButtonText}>Calibration Complete - Start Using App</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0', // Add background color
  },
  glassContainer: {
    flex: 1,
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Solid background for testing
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'center',
    marginBottom: 10, // Reduced from 20
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginBottom: 20, // Reduced from 30
    color: '#333',
  },
  testSection: {
    marginBottom: 30,
  },
  testTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 10,
    color: '#555',
  },
  testDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 15,
    color: '#666',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  doneText: {
    fontSize: 16,
    color: '#4CAF50',
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#FF9800',
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  completeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
  },
});

export default TestScreen;