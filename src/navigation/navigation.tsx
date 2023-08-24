import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainStackParams} from '../typings/Navigation';
import Login from '../screen/Auth/Login';
import {Home, Favorite} from '../screen/Main';
import React from 'react';
import CustomHeader from '../components/CustomHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../styles';

const MainStackNavigator = createBottomTabNavigator<MainStackParams>();

export const Auth = () => {
  return <Login />;
};

export const Main = () => {
  return (
    <MainStackNavigator.Navigator
      screenOptions={{
        tabBarLabelStyle: {color: COLORS.primary},
        header: ({navigation}) => <CustomHeader navigation={navigation} />,
      }}>
      <MainStackNavigator.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Ionicons
                name={focused ? 'home-sharp' : 'home-outline'}
                size={25}
                color={COLORS.primary}
              />
            );
          },
        }}
      />
      <MainStackNavigator.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Entypo
                name={focused ? 'star' : 'star-outlined'}
                size={25}
                color={COLORS.primary}
              />
            );
          },
        }}
      />
    </MainStackNavigator.Navigator>
  );
};
