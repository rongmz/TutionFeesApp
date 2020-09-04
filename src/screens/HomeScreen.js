import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeTabScreen from './HomeTabScreen';
import IncomeTabScreen from './IncomeTabScreen';
import appColors from '../appColors';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

// Make Top Tabs
const Tab = createMaterialTopTabNavigator();

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: appColors.primary,
    flexDirection: 'row',
  },
  tabBarSections: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarSectionText: {
    color: appColors.textOnPrimary,
    // fontWeight: 'bold',
    fontSize: 16,
  },
});

const TabBar = ({ state, descriptors, navigation, position }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.6)),
        });

        return (
          <TouchableOpacity key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarSections}
          >
            <Animated.Text style={[styles.tabBarSectionText, { opacity }]}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

/**
 * Home Screen
 * @author Rounak Saha
 */
export default ({ }) => {
  return (
    <Tab.Navigator initialRouteName="HomeTab" tabBar={p => <TabBar {...p} />}>
      <Tab.Screen name="HomeTab" component={HomeTabScreen} options={{ title: 'Students' }} />
      <Tab.Screen name="IncomeTab" component={IncomeTabScreen} options={{ title: 'My Income' }} />
    </Tab.Navigator>
  );
}