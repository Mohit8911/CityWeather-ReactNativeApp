import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import imagePath from "./constants/imagePath";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";

const Weather = () => {
  const [text, setText] = useState("New Delhi");
  const [data, setData] = useState(null);
  const [wStatus, setWStatus] = useState("Error");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (!text) {
      Alert.alert("Please input City name!");
      return;
    }
    try {
      let newData = await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?APPID=f4869762404bfa13cd1893a72ba546a3&q=${text},IN&units=metric`
        )
        .then((response) => response.data);

      let n = newData.weather[0].main;
      setWStatus(n);
      setData(newData);
    } catch (err) {
      Alert.alert(err.message);
      return;
    }
  };
  function getSunriseTime() {
    let date1 = new Date(data.sys.sunrise * 1000);
    return date1.toTimeString().slice(0, 8);
  }
  function getSunsetTime() {
    let date1 = new Date(data.sys.sunset * 1000);
    return date1.toTimeString().slice(0, 8);
  }

  return (
    <LinearGradient colors={["#ff7e5f", "#feb47b"]} style={Styles.container}>
      <Text style={Styles.title}>City Weather</Text>
      <View style={Styles.searchContainer}>
        <TextInput
          placeholder="Enter any city eg.Chandigarh"
          style={Styles.searchInput}
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
        ></TextInput>
        <TouchableOpacity onPress={() => getData()} style={Styles.searchBtn}>
          <Text style={{ color: "white" }}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.dataContainer}>
        <Text style={Styles.cityName}>{data ? data.name : ""}</Text>
        <View style={Styles.splitContainer}>
          <Text style={Styles.cityTemp}>
            {data ? data.main.temp : "--"}&deg;C
          </Text>
          <View>
            <Text style={{ fontSize: 22 }}>
              Humidity: {data ? data.main.humidity : "--"}%
            </Text>
            <Text style={{ fontSize: 22 }}>
              Visibility: {data ? data.visibility : "--"}%
            </Text>
          </View>
        </View>
        <Image
          source={imagePath[wStatus]}
          style={Styles.weatherImage}
          alt="image"
        ></Image>
        <Text style={{ fontSize: 22, textAlign: "center", fontWeight: "bold" }}>
          {data ? data.weather[0].main : "--"}
        </Text>
        <View style={Styles.splitContainer}>
          <Text style={{ fontSize: 22 }}>
            Sunrise:{data ? getSunriseTime() : "--"}
          </Text>
          <Text style={{ fontSize: 22 }}>
            Sunset:
            {data ? getSunsetTime() : "--"}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "",
    alignItems: "center",
    padding: 80,
    borderRadius: 20,
  },

  title: {
    fontWeight: "bold",
    fontSize: 34,
    padding: 2,
    width: 200,
    marginBottom: 10,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 5,
  },

  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 30,
    borderWidth: 1,
    minWidth: 250,
    minHeight: 30,
    textAlign: "center",
    padding: 5,
  },
  dataContainer: {
    width: "90%",
    margin: 10,
    borderRadius: 25,
  },
  cityName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },
  cityTemp: {
    fontSize: 44,
    fontWeight: "bold",
  },

  weatherImage: {
    height: 200,
    width: 200,
    resizeMode: "contain",
  },

  splitContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },

  searchBtn: {
    borderWidth: 1,
    backgroundColor: "#000",
    alignItems: "center",
    alignSelf: "center",
    padding: 4,
    margin: 5,
    width: "50%",
    borderRadius: 8,
  },
});

export default Weather;
