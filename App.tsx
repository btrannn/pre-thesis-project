import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import TimerScreen from './screens/TimerScreen';
import GardenScreen from './screens/GardenScreen';
import ReportScreen from './screens/ReportScreen';
import ProfileScreen from './screens/ProfileScreen';
import CustomTabBar from './components/navigation/CustomTabBar';
import Background from './components/Background'; 

export type ScreenName = 'Timer' | 'Garden' | 'Report' | 'Profile';

const App = () => {
  const [activeScreen, setActiveScreen] = useState<ScreenName>('Timer');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'Timer':
        return <TimerScreen />;
      case 'Garden':
        return <GardenScreen />;
      case 'Report':
        return <ReportScreen />;
      case 'Profile':
        return <ProfileScreen />;
      default:
        return <TimerScreen />;
    }
  };

  return (
    <Background> 
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        {renderScreen()}
        <CustomTabBar activeScreen={activeScreen} onTabPress={setActiveScreen} />
      </SafeAreaView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default App;