import { baseFontSize, colors } from './shared/customCSS';

import Explorer from './src/screens/ExplorerScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Landing from './src/screens/LandingScreen';
import Login from './src/screens/LoginScreen';
import Main from './src/screens/MainScreen';
import MyRecipes from './src/screens/MyRecipesScreen';
import { NavigationContainer } from '@react-navigation/native';
import Profile from './src/screens/ProfileScreen';
import React from 'react';
import Signup from './src/screens/SignUpScreen';
import { StatusBar } from 'react-native';
// App.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import StatusBar from react-native
// Import vector icons directly



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
        headerTitleStyle: { fontFamily: 'Poppins', fontSize: baseFontSize * 2 },
        headerStyle: {
          backgroundColor: colors.third,
        },
        tabBarActiveTintColor: colors.fourth,
        tabBarLabelStyle: {
          fontFamily: 'Poppins',
          marginBottom: 1
        },
      }}
    >
      <Tab.Screen
        name="Main"
        component={Main}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Explorer"
        component={Explorer}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="My Recipes"
        component={MyRecipes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="book" size={size} color={colors.primary} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={colors.primary} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="default" />  {/* Use React Native's StatusBar */}
      <Stack.Navigator>
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="Home"
          component={HomeNavigator}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, gestureEnabled: true }}
        />
        <Stack.Screen
          name="SignUp"
          component={Signup}
          options={{ headerShown: false, gestureEnabled: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
