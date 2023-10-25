import { View, Text } from 'react-native'
import React from 'react'

import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Signup from '../../Screens/SignUp';
import Home from '../../Screens/Home'
import Chat from '../../Screens/Chat';
import AddGroupMember from '../../Screens/AddMember';
import GroupChat from '../../Screens/GroupChat';
const Stack=createStackNavigator();
const StackNavigation = () => {
  return (
        <Stack.Navigator  screenOptions={{
          headerShown: false
        }} initialRouteName='signup'>
          <Stack.Screen name='signup' component={Signup}/>
          <Stack.Screen name='home' component={Home}/>
          <Stack.Screen name='chat' component={Chat}/>
          <Stack.Screen name='groupChat' component={GroupChat}/>
          <Stack.Screen name='addGroupMember' component={AddGroupMember}/>
        </Stack.Navigator>
  )
}

export default StackNavigation