import React from "react";
import { Text } from "galio-framework";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Main from "./stacks/main";
import colors from "./constants/colors";

const Stack = createStackNavigator();

export default function routes() {
  const ref = React.useRef(null);
  return (
    <NavigationContainer ref={ref}>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerTitle: "Curitiba",
            headerTintColor: colors.headerText,
            headerStyle: { backgroundColor: colors.main },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
