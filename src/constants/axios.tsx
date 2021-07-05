import Axios from "axios";

let host: string = "https://hivetech.com.br";

if (__DEV__) {
  /* Ips Enzo Dev */
  //host = "http://192.168.100.143:8080";
  //host = "http://192.168.100.18:8080";
}

export default Axios.create({
  baseURL: host
});
