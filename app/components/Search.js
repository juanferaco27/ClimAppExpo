import { CommonActions } from "@react-navigation/routers";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import Map from "../components/Map";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const API_KEY = "ede3ca5b2d0912688b80ead9e3f0d2d2";

const Search = ({ navigation }) => {
  const [ciudadBuscada, setCiudadBuscada] = useState("");
  const [posiblesCiudades, setPosiblesCiudades] = useState([{}]);
  const [ciudadElegida, setCiudadElegida] = useState({});
  const [mapaVisible, setMapaVisible] = useState(false);
  const [ciudadesGuardadas, setCiudadesGuardadas] = useState([{}]);

  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  useEffect(() => {
    if (ciudadBuscada.length > 3) {
      fetchDataFromApi();
    }
  }, [ciudadBuscada, ciudadElegida]);

  const fetchDataFromApi = () => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${ciudadBuscada},AR&limit=20&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        let cont = 0;
        setPosiblesCiudades([{}]);
        Object.entries(data).forEach(([key, value]) => {
          // console.log(`${key}: ${value}`)
          setPosiblesCiudades((posiblesCiudades) => [
            ...posiblesCiudades,
            { id: cont, lat: value.lat, lon: value.lon, name: value.name },
          ]);
          cont++;
          // setMapaVisible(false);
        });
      });
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("ciudades", jsonValue);
    } catch (e) {
      console.log("error al guardar los datos");
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("ciudades");
      if (jsonValue != null) {
        setCiudadesGuardadas(JSON.parse(jsonValue));
      } else {
        console.log("no hay ciudades guardadas");
      }
    } catch (e) {
      console.log("error al leer los datos");
      console.log(e);
    }
  };
  const list = () => {
    return posiblesCiudades.map((element) => {
      if (typeof element.id !== "undefined") {
        return (
          <View key={`${element.id}id`} style={styles.listaItem}>
            <View style={styles.listaItemDatos} key={`${element.id}datos`}>
              <Text key={`${element.id}name`} style={styles.listaItemName}>
                {element.name}
              </Text>
              <Text key={`${element.id}latlon`} style={styles.listaItemLatLon}>
                Lat: {element.lat.toFixed(2)} Lon: {element.lon.toFixed(2)}
              </Text>
            </View>
            <Button
              onPress={() => {
                setCiudadElegida({
                  id: `${element.lat}_${element.lon}`,
                  lat: Number(`${element.lat}`),
                  lon: Number(`${element.lon}`),
                  name: `${element.name}`,
                });
                setMapaVisible(true);
              }}
              title="Mapa"
              style={styles.listaItemButtonMapa}
              key={`${element.id}botonMapa`}
            />
            <TouchableOpacity
              style={styles.listaItemButtonAccept}
              onPress={() => {
                //si la ciudad no esta ya guardada, la guardo
                let repetida = false;
                ciudadesGuardadas.forEach((x) => {
                  if (Object.values(x)[0] === `${element.lat}_${element.lon}`) {
                    repetida = true;
                  }
                });
                if (!repetida) {
                  // const ciudadesNuevas=[{id: `${element.lat}_${element.lon}`, lat: Number(`${element.lat}`), lon: Number(`${element.lon}`), name:`${element.name}`}];
                  const ciudadesNuevas = [
                    ...ciudadesGuardadas,
                    {
                      id: `${element.lat}_${element.lon}`,
                      lat: Number(`${element.lat}`),
                      lon: Number(`${element.lon}`),
                      name: `${element.name}`,
                    },
                  ];
                  setCiudadesGuardadas(ciudadesNuevas);
                  storeData(ciudadesNuevas);
                }
                // navigation.popToTop();
                navigation.navigate("List");
              }}
              key={`${element.id}botonOk`}
            >
              <Icon
                name="check"
                type="material-community"
                color="#FFF"
                key={`${element.id}icono`}
              />
            </TouchableOpacity>
          </View>
        );
      }
    });
  };

  return (
    <ImageBackground
      source={require("../assets/img/background.jpg")}
      style={styles.img}
    >
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>AGREGAR NUEVA CIUDAD</Text>

          <View style={styles.buscar}>
            <TextInput
              style={styles.buscar_txt}
              placeholder="Buscar ciudad..."
              placeholderTextColor="#999"
              onChangeText={setCiudadBuscada}
              value={ciudadBuscada}
            ></TextInput>
          </View>

          <View key="listaCiudades">{list()}</View>

          <View style={styles.map} key="mapa">
            <Map
              lat={ciudadElegida.lat}
              lon={ciudadElegida.lon}
              mapaVisible={mapaVisible}
            ></Map>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "rgb(71, 149, 212)",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginTop: 10,
  },
  buscar: {
    borderRadius: 15,
    borderColor: "#000",
    borderWidth: 2,
    marginTop: 10,
    marginHorizontal: 10,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  buscar_txt: {
    color: "#000",
    fontSize: 26,
  },
  map: {
    // borderRadius: 15,
    // borderColor: '#000',
    // borderWidth: 2,
    alignItems: "center",
    marginTop: 10,
    marginHorizontal: 10,
    height: 300,
    // marginBottom: 30
  },
  // btn_accept:{
  //   borderRadius: 100,
  //   height: 30,
  //   width: 30,
  //   borderColor: '#000',
  //   borderWidth: 1,
  //   padding: 2,
  //   backgroundColor: '#388E3C',
  //   elevation: 10
  // },
  btn_cancel: {
    borderRadius: 100,
    height: 70,
    width: 70,
    borderColor: "#000",
    borderWidth: 2,
    marginTop: -70,
    padding: 20,
    marginHorizontal: 80,
    backgroundColor: "#FF5252",
    elevation: 10,
  },
  listaItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
    borderColor: "#000",
    borderWidth: 2,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  img: {
    flex: 1,
    //alignItems: "center",
    resizeMode: "cover",
  },
  listaItemDatos: {
    flex: 4,
    flexDirection: "column",
    height: 50,
    margin: 5,
  },
  listaItemName: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  listaItemLatLon: {
    flex: 1,
    color: "#000",
  },
  listaItemButtonMapa: {
    flex: 1,
    padding: 5,
    margin: 15,
  },
  listaItemButtonAccept: {
    borderRadius: 100,
    height: 30,
    width: 30,
    borderColor: "#000",
    borderWidth: 1,
    margin: 15,
    padding: 2,
    backgroundColor: "#388E3C",
    elevation: 10,
  },
  lista_txt: {
    color: "#000",
    fontSize: 26,
  },
});

export default Search;