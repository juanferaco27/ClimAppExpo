import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  ImageBackground,
} from "react-native";
import Cloud1 from "./app/assets/img/cloud1.png";
import Cloud2 from "./app/assets/img/cloud2.png";
import Sun from "./app/assets/img/sun.png";
import Navigation from "./app/components/Navigation";

const App = () => {
  const [animated, setAnimated] = useState(false);
  const [show] = useState(new Animated.Value(0));
  const [position] = useState(new Animated.Value(300));
  const [font] = useState(new Animated.Value(1));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(show, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: false,
      }),
      Animated.timing(position, {
        toValue: 70,
        duration: 3000,
        useNativeDriver: false,
      }),
    ]).start(() => {
      Animated.timing(font, {
        toValue: 200,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => setAnimated(true));
    });
  }, []);

  if (!animated)
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor="#FFc107"
          barStyle="dark-content"
        />

        <View style={styles.container}>
          <ImageBackground
            source={require("./app/assets/img/background.jpg")}
            style={styles.img}
          >
            <View>
              <Animated.Image style={styles.image_sun} source={Sun} />
              <Animated.Image
                style={[styles.image_cloud1, { left: position }]}
                source={Cloud1}
              />
              <Animated.Image
                style={[styles.image_cloud2, { right: position }]}
                source={Cloud2}
              />
            </View>
            <Animated.Text
              style={[
                styles.text,
                { opacity: show, transform: [{ scale: font }] },
              ]}
            >
              Climapp
            </Animated.Text>
          </ImageBackground>
        </View>
      </>
    );
  return (
    <>
      <Navigation />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    flex: 1,
    alignItems: "center",
    resizeMode: "cover",
  },
  image_sun: {
    marginTop: 80,
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  image_cloud1: {
    marginBottom: -120,
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  image_cloud2: {
    marginTop: -10,
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  text: {
    textAlign: "center",
    marginTop: -30,
    fontSize: 60,
    fontWeight: "bold",
    color: "#FFF",
    textShadowRadius: 6,
    textShadowColor: "#000",
  },
});

export default App;
