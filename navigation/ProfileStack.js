import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Results from '../pages/Results';
import ChosenItem from '../pages/ChosenItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import Colors from '../styles/Colors';

const Stack = createStackNavigator();

export default function ProfileStack() {
  const navigation = useNavigation()
  const color = Colors()

  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} 
        options={{
          headerRight: (props) => (
            <MaterialCommunityIcons name="cog" color={color.text} size={30} style={{paddingRight: 10}} onPress={() => navigation.navigate("Settings")}/>
          ),
          headerStyle: {backgroundColor: color.background},
          headerTitleStyle: {color: color.text},
        }}
      />
      <Stack.Screen name="Results" component={Results}
        options={{
          headerStyle: {backgroundColor: color.background},
          headerTitleStyle: {color: color.text}
        }}
      />
      <Stack.Screen name="ChosenItem" component={ChosenItem}
        options={{
          headerStyle: {backgroundColor: color.background},
          headerTitleStyle: {color: color.text}
        }}
      />
      <Stack.Screen name="Settings" component={Settings}
        options={{
          headerStyle: {backgroundColor: color.background},
          headerTitleStyle: {color: color.text},
        }}
      />
    </Stack.Navigator>
  );
}