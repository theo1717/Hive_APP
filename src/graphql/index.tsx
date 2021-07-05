import { AsyncStorage } from "react-native";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";

const APP_ID = "hive-nyfhl";

// Construct a new Apollo HttpLink that connects to your app's GraphQL endpoint
const graphql_url = `https://stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
const httpLink = new HttpLink({ uri: graphql_url });

const authorizationHeaderLink = setContext(async (_, { headers }) => {
  const accessToken = await AsyncStorage.getItem("GraphQL:token");
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
});

// Construct a new Apollo client with the links we just defined
const client = new ApolloClient({
  link: authorizationHeaderLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
