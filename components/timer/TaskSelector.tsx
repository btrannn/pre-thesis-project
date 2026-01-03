import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS } from '../../styles/theme';

type TaskSelectorProps = {
  disabled?: boolean;
};

const TaskSelector = ({ disabled = false }: TaskSelectorProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const taskOptions = ['Studying', 'Working', 'Meditation'];

  const handlePress = () => {
    setModalVisible(true);
  };

  const selectTask = (task: string) => {
    setSelectedTask(task);
    setModalVisible(false);
  };

  const textStyle = styles.text;
  const displayedText = selectedTask || 'Select a task';
  const showIcon = !disabled;

  return (
    <>
      <TouchableOpacity 
        style={styles.container} 
        disabled={disabled}
        onPress={handlePress}
      >
        <View style={styles.content}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.7)', 'rgba(255, 255, 255, 0.2)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.glass}
          />
          
          <Text style={textStyle}>
            {displayedText}
          </Text>

          {showIcon && (
            <Ionicons
              name="chevron-down"
              size={24}
              color={COLORS.active}
              style={styles.icon}
            />
          )}
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)} activeOpacity={1}>
          <TouchableOpacity style={styles.modalContent} activeOpacity={1} onPress={() => {}}>
            <Text style={styles.modalTitle}>Select a Task</Text>
            <FlatList
              data={taskOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.option} onPress={() => selectTask(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default TaskSelector;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 55,
    marginTop: 100,
    flexGrow: 0, 
    flexShrink: 0,
  },
  content: {
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

  text: {
    top: 15,
    left: 0,
    lineHeight: 20,
    ...FONTS.playfair_14_regular,
    color: COLORS.active,
    textAlign: 'center',
    width: '100%',
    height: 51,
    position: 'absolute',
  },

  distractingColor: {
    color: 'red',
  },

  icon: {
    top: 16,
    right: 20,
    position: 'absolute',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '50%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
  cancelButton: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
  },
});