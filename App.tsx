import { baseFontSize, colors } from './shared/customCSS';

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RecipeDetailScreen from './components/RecipeDetailsScreen';
import AddRecipeScreen from './src/screens/AddRecipeScreen';
import Explorer from './src/screens/ExplorerScreen';
import Landing from './src/screens/LandingScreen';
import Login from './src/screens/LoginScreen';
import Main from './src/screens/MainScreen';
import MyRecipes from './src/screens/MyRecipesScreen';
import Profile from './src/screens/ProfileScreen';
import Signup from './src/screens/SignUpScreen';
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
        headerTitleStyle: { fontFamily: 'Poppins-Bold', fontSize: baseFontSize * 2 },
        headerStyle: {
          backgroundColor: colors.third,
        },
        tabBarActiveTintColor: colors.fourth,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-SemiBold',
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
      <StatusBar barStyle="default" />
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
          },
          headerBackTitleStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
          },
          headerTintColor: colors.primary,
        }}
      >
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
        <Stack.Screen
          name="RecipeDetailsScreen"
          component={RecipeDetailScreen}
          options={{
            headerTitle: 'Recipe Details',
            gestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="AddRecipeScreen"
          component={AddRecipeScreen}
          options={{
            headerTitle: 'Add Recipe',
            gestureEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
