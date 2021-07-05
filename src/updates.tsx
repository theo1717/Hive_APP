import * as Updates from "expo-updates";
import { Alert } from "react-native";

export default async () => {
  if (__DEV__) {
    return null;
  }
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      return Alert.alert("Update encontrado", "Deseja atualizar o app agora?", [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: async () => {
            Updates.reloadAsync();
          }
        }
      ]);
    }
  } catch (e) {
    return Alert.alert("Erro ao atualizar", e);
  }
};
