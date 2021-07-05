import { Appearance } from "react-native-appearance";

interface colors {
  [key: string]: any;
}

function color() {
  let colorScheme = Appearance.getColorScheme();
  let colors: colors;

  if (colorScheme === "light") {
    colors = {
      main: "#FCD91F",
      mode: "#e9e9e9",
      text: "#000000",
      headerText: "#000000",
      headerBack: "#ffffff",
      tabBarColor: "#000000"
    };
  } else {
    colors = {
      main: "#FCD91F",
      mode: "#545454",
      text: "#FFFFFF",
      headerText: "#000000",
      headerBack: "#000000",
      tabBarColor: "#FFFFFF"
    };
  }
  return colors;
}

export default color();
