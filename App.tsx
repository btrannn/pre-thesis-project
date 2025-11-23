import React, { useState, useCallback } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
} from '@expo-google-fonts/playfair-display';
import * as SplashScreen from 'expo-splash-screen';

import TimerScreen from './screens/TimerScreen';
import GardenScreen from './screens/GardenScreen';
import ReportScreen from './screens/ReportScreen';
import ProfileScreen from './screens/ProfileScreen';

import CustomTabBar from './components/navigation/CustomTabBar';
import Background from './components/Background';

export type ScreenName = 'Timer' | 'Garden' | 'Report' | 'Profile';

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenName>('Timer');
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Timer':
        return (
          <TimerScreen
            isTimerRunning={isTimerRunning}
            setIsTimerRunning={setIsTimerRunning}
          />
        );
      case 'Garden':
        return <GardenScreen />;
      case 'Report':
        return <ReportScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <TimerScreen isTimerRunning={false} setIsTimerRunning={() => {}} />;
    }
  };

  return (
    <Background>
      <SafeAreaProvider>
        <View style={styles.rootContainer} onLayout={onLayoutRootView}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <SafeAreaView edges={['top']} style={styles.safeAreaContainer}>
            {renderScreen()}
            
            {/* SỬA LỖI Ở ĐÂY: Luôn render CustomTabBar, dùng prop hidden để ẩn nội dung nhưng giữ layout */}
            <CustomTabBar
              activeScreen={activeScreen}
              onTabPress={setActiveScreen}
              hidden={isTimerRunning}
            />
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </Background>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default App;