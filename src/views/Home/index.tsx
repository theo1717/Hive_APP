import React, { useState, useEffect } from "react";
import {
  Alert,
  AsyncStorage,
  RefreshControl,
  KeyboardAvoidingView,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Block, Text, Input } from "galio-framework";
import { Button, Image, Card } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";
import Fire from "../../../Fire";
import getLastTemp from "../../graphql/Query/getLastTemp";

import axios from "../../constants/axios";

import styles, { chartConfig } from "./styles";

import { Dimensions } from "react-native";
import { useLazyQuery } from "@apollo/react-hooks";
const screenWidth = Dimensions.get("window").width;

interface Val {
  value: number;
  date: string;
  _id: string;
}

export default function Login() {
  let ref = Fire.realtimeDb().ref("/curitiba/temp");
  let [data, setData] = useState({
      labels: [""],
      datasets: [
        {
          data: [0],
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
      legend: ["Variação de temperatura"], // optional
    }),
    [refreshing, setRefreshing] = useState(false);

  let [getQuery] = useLazyQuery(getLastTemp, {
    variables: {},
    fetchPolicy: "cache-and-network",
    onCompleted: (d) => {
      setRefreshing(false);
      //console.log(d.dados);
      let result: any = [];
      d.dados.forEach((val: any) => {
        if (val) {
          result.push(parseFloat(val.dado));
        }
      });
      setData((oldValue) => {
        oldValue.datasets[0].data = result;
        console.log(oldValue);
        return oldValue;
      });
      setTimeout(() => {
        forceUpdate();
      }, 50);
    },
  });
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  /* const getData = async () => {
    ref.limitToLast(10).once("value", (snap) => {
      let data = snap.val();
      if (data) {
        data = Object.values(data);
        let result: any = [];
        data.forEach((val: Val) => {
          if (val) {
            val._id = val._id.toString();
            result.push(val.value);
          }
        });
        result = result.sort(function (a: any, b: any) {
          var dateA = new Date(a.date).getTime(),
            dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        setData((oldValue) => {
          oldValue.datasets[0].data = result;
          return oldValue;
        });
      }
    });
  }; */

  useEffect(() => {
    setRefreshing(true);
    getQuery();
  }, [data]);

  return (
    <ImageBackground
      source={require("../../assets/img/homeBack.jpg")}
      style={styles.img}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              getQuery();
              setRefreshing(true);
            }}
          />
        }
      >
        <Card
          title="Bem vindo ao Hive"
        >
          <Text center bold style={styles.text}>
            Explore o app e veja dados da sua cidade
          </Text>
        </Card>
        <Block center style={styles.mainWhite}>
          <LineChart
            data={data}
            width={screenWidth * 0.87}
            height={256}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
            xAxisLabel="Tempo"
            getDotColor={() => "white"}
          />
        </Block>
      </ScrollView>
    </ImageBackground>
  );
}
