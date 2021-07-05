import React, { useState, useEffect } from "react";
import {
  Alert,
  AsyncStorage,
  RefreshControl,
  KeyboardAvoidingView,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from "react-native";
import { Block, Text, Input } from "galio-framework";
import { Button, Image, Card } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import moment from "moment";
import Fire from "../../../Fire";

import axios from "../../constants/axios";

import styles from "./styles";

interface Val {
  value: number;
  date: string;
  _id: string;
}

interface Vals extends Array<Val> {}

export default function Temp() {
  let [values, setValues] = useState<Vals>([]),
    [ordem, setOrdem] = useState<React.ReactText>("1");

  let ref = Fire.realtimeDb().ref("/curitiba/co");

  console.disableYellowBox;
  const getData = async () => {
    /* Pega todos os valores */
    ref.limitToLast(20).once("value", (snap) => {
      let data = snap.val();
      if (data) {
        data = Object.values(data);
        let result: Vals = [];
        data.forEach((val: Val) => {
          if (val) {
            val._id = val._id.toString();
            result.push(val);
          }
        });
        result = result.sort(function (a, b) {
          var dateA = new Date(a.date).getTime(),
            dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        setValues(result);
      }
    });

    /* Pega os valores em tempo real */
    ref.limitToLast(1).on("child_added", (snap) => {
      let data = snap.val(),
        result = data;
      if (data && !values.find((e: Val) => e._id == data._id)) {
        switch (ordem) {
          case "1":
            setValues((old) => {
              old.unshift(result);
              return old;
            });
            break;
          case "-1":
            setValues((old) => {
              old.push(result);
              return old;
            });
            break;
        }
      }
    });
  };
  useEffect(() => {
    console.disableYellowBox;
    getData();
  }, []);

  const changeOrdem = async (value: React.ReactText) => {
    setOrdem(value);
    let res: Vals;
    switch (value as string) {
      case "1":
        res = values.sort(function (a, b) {
          var dateA = new Date(a.date).getTime(),
            dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        setValues(res);
        break;
      case "-1":
        res = values.sort(function (a, b) {
          var dateA = new Date(a.date).getTime(),
            dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        setValues(res);
        break;
    }
  };

  return (
    <Block style={{ flex: 1 }}>
      <Picker
        selectedValue={ordem}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => changeOrdem(itemValue)}
      >
        <Picker.Item label="Mais recente" value="1" />
        <Picker.Item label="Mais antigo" value="-1" />
      </Picker>

      <ScrollView>
        <FlatList
          data={values}
          renderItem={({ item, index }) => (
            <Card title={moment(item.date).format("DD/MM/YYYY HH:mm")}>
              <Text bold size={18} center>
                {item.value}%
              </Text>
            </Card>
          )}
          extraData={values}
          keyExtractor={(item) => item._id}
        />
      </ScrollView>
    </Block>
  );
}
