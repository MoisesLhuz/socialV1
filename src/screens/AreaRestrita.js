import React from 'react';
import { Icons } from '../components/Icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Chat, Configuracao } from '../screens/index'
import { View } from 'react-native';



const Tab = createBottomTabNavigator();

const TabNavigator = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                height: 60,
                position: 'absolute',
                bottom: 16,
                right: 16,
                left: 16,
                borderRadius: 16,
            }
        }}
    >
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Icons.FaFire color={focused ? '#FFC160' : color = '#ccc'} size={30} />
                    </View>
                ),
            }}
        />
        <Tab.Screen
            name="Chat"
            component={Chat}
            options={{
                tabBarLabel: 'Chat',
                tabBarIcon: ({ color, focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Icons.FaComments color={focused ? '#FFC160' : color = '#ccc'} size={30} />
                    </View>
                ),
            }}
        />
        <Tab.Screen
            name="Configuracao"
            component={Configuracao}
            options={{
                tabBarLabel: 'Configuracao',
                tabBarIcon: ({ color, focused }) => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <Icons.FaGear color={focused ? '#FFC160' : color = '#ccc'} size={30} />
                    </View>
                ),
            }}
        />
    </Tab.Navigator>
);

export default function AreaRestrita({ naviagtion }) {

    return (
        <TabNavigator />
    )
}



