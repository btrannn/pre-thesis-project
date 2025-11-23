import React from 'react';
import { View, Text, StyleSheet, Platform, ColorValue } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../styles/theme';

type GradientTextProps = {
  text: string;
  fontStyle: object;
  gradientColors?: string[];
};

const GradientText = ({ text, fontStyle }: GradientTextProps) => {
  const defaultColors = [
    COLORS.solidgreen_07,
    COLORS.solidgreen_01,
  ] as const; 

  return (
    <MaskedView
      style={styles.maskedView}
      maskElement={
        <View style={styles.maskedElementContainer}>
          <Text
            style={[
              fontStyle,
              { backgroundColor: 'transparent', color: 'black' },
            ]}>
            {text}
          </Text>
        </View>
      }>

      <LinearGradient
        colors={defaultColors} 
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientFill}
      />
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  maskedView: {
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
  
  gradientFill: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default GradientText;