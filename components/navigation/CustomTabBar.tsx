import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenName } from '../../App';
import { COLORS, FONTS } from '../../styles/theme';

import IconTimer from '../icons/IconTimer';
import IconGarden from '../icons/IconGarden';
import IconReport from '../icons/IconReport';
import IconProfile from '../icons/IconProfile';

type CustomTabBarProps = {
  activeScreen: ScreenName;
  onTabPress: (screen: ScreenName) => void;
  hidden?: boolean;
};

type TabButtonProps = {
  label: ScreenName;
  isActive: boolean;
  onPress: () => void;
};

const TabButton = ({ label, isActive, onPress }: TabButtonProps) => {
  const color = isActive ? COLORS.active : COLORS.inactive;
  const iconDefaultSize = 24;
  
  let iconWidth = 0;
  let iconHeight = iconDefaultSize; 

  if (label === 'Timer') {
    iconWidth = (iconHeight / 24) * 28;
  } else if (label === 'Garden') {
    iconWidth = (iconHeight / 24) * 18;
  } else if (label === 'Report') {
    iconWidth = 26; 
  } else if (label === 'Profile') {
    iconWidth = 25; 
  }

  const renderIcon = () => {
    if (label === 'Timer') {
      return <IconTimer focused={isActive} color={color} size={iconDefaultSize} />;
    }
    if (label === 'Garden') {
      return <IconGarden focused={isActive} color={color} size={iconDefaultSize} />;
    }
    if (label === 'Report') {
      return <IconReport focused={isActive} color={color} size={iconDefaultSize} />;
    }
    if (label === 'Profile') {
      return <IconProfile focused={isActive} color={color} size={iconDefaultSize} />;
    }
    return null;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButton}>
      <View style={{ width: iconWidth, height: iconHeight }}>
        {renderIcon()}
      </View>
      
      {isActive && (
        <Text style={[styles.tabLabel, { color: color }]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ activeScreen, onTabPress, hidden }: CustomTabBarProps) => {
  if (hidden) {
    return <View style={[styles.background, { backgroundColor: 'transparent' }]} />;
  }

  return (
    <View style={styles.background}>
      <View style={styles.iconContainer}>
        <TabButton
          label="Timer"
          isActive={activeScreen === 'Timer'}
          onPress={() => onTabPress('Timer')}
        />
        <TabButton
          label="Garden"
          isActive={activeScreen === 'Garden'}
          onPress={() => onTabPress('Garden')}
        />
        <TabButton
          label="Report"
          isActive={activeScreen === 'Report'}
          onPress={() => onTabPress('Report')}
        />
        <TabButton
          label="Profile"
          isActive={activeScreen === 'Profile'}
          onPress={() => onTabPress('Profile')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: 85, 
    backgroundColor: COLORS.whitecolor_01,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    width: '90%',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },

  tabLabel: {
    ...FONTS.poppins_12_regular,
    marginTop: 4,
  },
});

export default CustomTabBar;