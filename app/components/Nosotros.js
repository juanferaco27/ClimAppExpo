import React from "react";
import { StyleSheet, Text, View, ScrollView, ImageBackground, Image, StatusBar, Linking } from "react-native";
import { SocialIcon } from "react-native-elements/dist/social/SocialIcon";
import Animacion1 from "../components/Animacion1";

export default function Nosotros() {
  return (
    <ImageBackground
      source={require("../assets/img/background.jpg")}
      style={styles.img}
    >
      <StatusBar backgroundColor="#FFc107" barStyle="dark-content" />
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.titulo1}>¿Quienes somos?</Text>
        </View>
        <View>
          <Animacion1/>
        </View>
        <View style={styles.containerGen}>
          <View>
            <Text style={styles.textos1}>
              Somos un grupo de desarrolladores conformados por:
            </Text>
            <View style={styles.datosPersonales}>
              <Text style={styles.nombres}>
              {/* <Animacion1/> */}
                - Fernando Perez
              </Text>
              <SocialIcon style={styles.iconosSociales}
                iconSize={20}
                type="github"
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/Fergabrielp"
                  )
                }
              ></SocialIcon>
            </View>
            <View style={styles.datosPersonales}>
              <Text style={styles.nombres}>
                - Juan Fernandez
              </Text>
              <SocialIcon style={styles.iconosSociales}
                iconSize={18}
                type="linkedin"
                onPress={() =>
                  Linking.openURL(
                    "https://www.linkedin.com/in/juan-fern%C3%A1ndez-ige/"
                  )
                }
              ></SocialIcon>
              <SocialIcon style={styles.iconosSociales}
                iconSize={20}
                type="github"
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/juanferaco27"
                  )
                }
              ></SocialIcon>
            </View>
            <View style={styles.datosPersonales}>
              <Text style={styles.nombres}>
                - Maria de la Paz Marzana
              </Text>
              <SocialIcon style={styles.iconosSociales}
                iconSize={18}
                type="linkedin"
                onPress={() =>
                  Linking.openURL(
                    "https://www.linkedin.com/in/maria-de-la-paz-marzana/"
                  )
                }
              ></SocialIcon>
              <SocialIcon style={styles.iconosSociales}
                iconSize={20}
                type="github"
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/pazmarzana"
                  )
                }
              ></SocialIcon>
            </View>
          </View>
          <Text style={styles.textos}>
            En la búsqueda de una solución para obtener información sobre el clima de ciertas ciudades de Argentina,
            se ha desarrollado una App que brinda un listado customizado de ciudades que permite ver el clima actual
            de la ciudad seleccionada. Para agregar ciudades, se provee un buscador y se da la posibilidad de visualizar
            un mapa de la ciudad antes de que sea agregada al listado.
          </Text>
          <Text style={styles.textos}>
            Para el desarrollo de esta App se ha utilizado la API OpenWeatherMap
            como fuente de información del clima, y para la obtención de
            coordenadas (latitud y longitud) de la ciudad buscada.
            <Text
              style={styles.links}
              onPress={() => Linking.openURL("https://openweathermap.org/")}
            >
              https://openweathermap.org/
            </Text>
          </Text>
          <Text style={styles.textos}>
            Para visualizar la ciudad buscada y seleccionada en el mapa se
            utilizo la API de Google Maps.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerGen: {
    backgroundColor: "#F9F6F7",
    padding: 5,
    marginHorizontal: '3%',
    borderRadius: 20,
    marginBottom: 150,
    marginTop: -20
  },
  textos1: {
    marginTop: 20,
    color: "black",
    fontWeight: "bold",
    marginHorizontal: 15,
    fontSize: 18
  },
  textos: {
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    textAlign: "justify",
    fontSize: 18,
    marginBottom: 10
  },
  img: {
    flex: 1
  },
  titulo1: {
    marginTop: 50,
    fontSize: 35,
    color: "white",
    textAlign:"center",
    fontWeight: 'bold'
  },
  nombres: {
    fontWeight: "bold",
    color: "black",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "justify",
    fontSize: 18,
  },
  links: {
    textDecorationLine: "underline",
    color: "blue",
  },
  iconosSociales: {
    width: 30,
    height: 30,
    marginHorizontal: 2
  },
  datosPersonales: {
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5
  }
});