import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import appInfo from '../app.json';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import appColors from './appColors';
import { IconButton } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  header: {
    backgroundColor: appColors.primary,
    flexDirection: 'row',
  },
  headerActionBtn: {
    marginVertical: 10,
  },
  headerContent: {
    color: appColors.textOnPrimary,
    fontSize: 20,
    flexGrow: 1,
    textAlign: 'left',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
});

// Main App stack
const Stack = createStackNavigator();

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
        ? options.title
        : scene.route.name;

  return (
    <View style={styles.header}>
      {previous && <IconButton size={20} style={styles.headerActionBtn} color={appColors.textOnPrimary}
        icon={p => <AntDesign {...p} name="left" />}
        onPress={navigation.goBack}
      />}
      <Text title={title} style={styles.headerContent} >{title}</Text>
      <IconButton size={20} style={styles.headerActionBtn} color={appColors.textOnPrimary}
        icon={p => <MaterialCommunityIcons {...p} name="tune" />}
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

/**
 * App
 */
export default ({ }) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={appColors.primary} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="screen" screenOptions={{
          header: p => <Header {...p} />,
        }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: appInfo.displayName }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}