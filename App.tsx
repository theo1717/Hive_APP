import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import Routes from "./src/routes";
import checkUpdate from "./src/updates";
import { ApolloProvider } from "@apollo/react-hooks";

import Axios from "axios";

import graphqlClient from "./src/graphql/";

export default function lockytInitApp() {
  useEffect(() => {
    Axios.post(
      "https://stitch.mongodb.com/api/client/v2.0/app/hive-nyfhl/auth/providers/api-key/login",
      {
        key: "IqCxQD6IsJVhxkDXQ1QZ6naEB6Ub3Arb3R4nfoiS2ihVnY5ATJdaTDOaM0XE1UjU",
      }
    )
      .then(async ({ data }) => {
        let { access_token } = data;
        await AsyncStorage.setItem("GraphQL:token", access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.disableYellowBox = true;
    checkUpdate();
  }, []);

  return (
    <ApolloProvider client={graphqlClient}>
      <Routes />
    </ApolloProvider>
  );
}
