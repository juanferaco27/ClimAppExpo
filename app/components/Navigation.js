import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, TabView } from 'react-native-elements'
import Home from './Home';
import Nosotros from './Nosotros';

import ListScreenStack from './ListScreenStack';


const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <>
            <StatusBar
            backgroundColor="#FFc107"
            barStyle='dark-content'
            />
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({ color }) => screenOptions(route, color),
                        tabBarStyle:{
                            backgroundColor: '#222',
                            borderRadius: 10,
                            borderColor: '#FFc107',
                            borderTopColor: '#FFc107',
                            borderTopWidth: 3,
                            borderWidth:3, 
                            position: 'absolute',
                            left: 60,
                            right: 60,
                            bottom: 50,
                            height: 60,
                            elevation: 0
                        },
                        tabBarActiveTintColor: '#FFc107',
                        tabBarInactiveTintColor: '#FFF',
                        headerShown: false,
                        tabBarShowLabel: false,
                        
                    })
                    }
                >
                    <Tab.Screen name="Home" component={Home}/>
                    <Tab.Screen name="ListStack" component={ListScreenStack}/>
                    <Tab.Screen name="Nosotros" component={Nosotros}/>

                </Tab.Navigator>
            </NavigationContainer>
        </>
    )
}



const styles = StyleSheet.create({
})

function screenOptions(route, color){
    let iconName;
    switch (route.name) {
        case "Home":
            iconName = "home-outline"
            break;
        case "ListStack":
            iconName = "format-list-bulleted"
            break;
        case "Nosotros":
            iconName = "information-outline"
            break;
        default:
            break;
    }
    return(
        <Icon type="material-community" name={iconName} size={34} color={color} />
    )
}

export default Navigation