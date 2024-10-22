import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserList from '../screens/UserList';
import User from '../screens/User';

const Route = () => {
  const Stack = createStackNavigator();
  const MainListStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="User List"
          component={UserList}
          options={styles.headerstyle}
        />
        <Stack.Screen
          name="Posts"
          component={User}
          options={styles.headerstyle}
        />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      <MainListStack />
    </NavigationContainer>
  );
};

export default Route;

const styles = StyleSheet.create({
  headerstyle: {
    headerTitleAlign: 'center',
    headerTitleStyle: {color: '#555'},
  },
});
