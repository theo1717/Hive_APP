import { StyleSheet } from "react-native";
import colors from "../../constants/colors";

export default StyleSheet.create({
  title: {
    fontSize: 28,
  },
  img: {
    flex: 1,
  },
  mainWhite: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
  },
});

export const chartConfig = {
  backgroundGradientFrom: "#000000",
  backgroundGradientFromOpacity: 0.75,
  backgroundGradientTo: "#c4a600",
  backgroundGradientToOpacity: 0.9,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
