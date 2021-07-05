import firebase from "firebase";
// Required for side-effects
// require("firebase/firestore");
require("firebase/auth");

class Fire {
  constructor() {
    // firebase temporario
    firebase.initializeApp({
      apiKey: "AIzaSyBzdfK8DVGdU_GjKY84g9y3VrhoR2YKH7A",
      authDomain: "hive-mesh.firebaseapp.com",
      databaseURL: "https://hive-mesh.firebaseio.com",
      projectId: "hive-mesh",
      storageBucket: "hive-mesh.appspot.com",
      appId: "project-971544374064",
    });
    firebase.auth().languageCode = "pt-BR";
  }

  realtimeDb = () => {
    return firebase.database();
  };
}
export default new Fire();
