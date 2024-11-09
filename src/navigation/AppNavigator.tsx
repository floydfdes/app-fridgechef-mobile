import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import ExplorerScreen from '../screens/ExplorerScreen';
import MainScreen from '../screens/MainScreen';
import MyRecipesScreen from '../screens/MyRecipesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Main" component={MainScreen} />
                <Tab.Screen name="Explorer" component={ExplorerScreen} />
                <Tab.Screen name="My Recipes" component={MyRecipesScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;