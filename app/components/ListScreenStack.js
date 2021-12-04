import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon, TabView } from 'react-native-elements'
import List from './List';
import Search from './Search';
import Clima from './Clima';

const Stack = createNativeStackNavigator();

function ListScreenStack() {
    return (
        <Stack.Navigator>
          <Stack.Screen
              options={{headerShown: false}}
              name="List"
              component={List}
          />
          <Stack.Screen 
              name="Search"
              component={Search}
          />
          <Stack.Screen 
              name="Clima"
              component={Clima}
          />
        </Stack.Navigator>
      )
}

export default ListScreenStack