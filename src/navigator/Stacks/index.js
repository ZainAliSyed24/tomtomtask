import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NearByRestaurants from '../../containers/NearByRestaurants';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="NearByRestaurants"
      component={NearByRestaurants}
      options={{ 
        title: 'NearBy Restaurants', 
      }}
    />
  </Stack.Navigator>
)

export {
  AuthStack
}