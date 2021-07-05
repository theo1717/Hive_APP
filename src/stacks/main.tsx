import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../views/Home";
import Temp from "../views/Temp";
import ArQ from "../views/ArQ";
import Co from "../views/Co";
import Umi from "../views/Umi";

const Tab = createBottomTabNavigator();

import { Icon } from "react-native-elements";

import colors from "../constants/colors";

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.tabBarColor,
        activeBackgroundColor: colors.headerBack,
        inactiveBackgroundColor: colors.headerBack,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Qualidade"
        component={ArQ}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="toys"
              type="material"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Monóxido"
        component={Co}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="graphic-eq"
              type="material"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon name="home" type="font-awesome" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Umidade"
        component={Umi}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="tint"
              type="font-awesome"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Temperatura"
        component={Temp}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="thermometer-three-quarters"
              type="font-awesome"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
