import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import Results from '../pages/Results';
import ChosenItem from '../pages/ChosenItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();


export default function ProfileStack() {
  const navigation = useNavigation()
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} 
        options={{
          headerRight: (props) => (
            <MaterialCommunityIcons name="cog" color="black" size={30} style={{paddingRight: 10}} onPress={() => navigation.navigate("Settings")}/>
          ),
        }}
      />
      <Stack.Screen name="Results" component={Results}/>
      <Stack.Screen name="ChosenItem" component={ChosenItem}/>
      <Stack.Screen name="Settings" component={Settings}/>
    </Stack.Navigator>
  );
}