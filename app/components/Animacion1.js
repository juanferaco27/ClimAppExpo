import React, { useState, useEffect } from "react";
import { StyleSheet, Animated, Image, View } from "react-native";

export default function Animacion1() {
  const [animacion] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animacion, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false
    }).start();
  }, []);
  const [animacion2] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animacion2, {
      toValue: 3600,
      duration: 20000,
      useNativeDriver: false
    }).start();
  }, []);
  return (
    <Animated.View
      style={{
        opacity: animacion,
        rotation: animacion2,
      }}
    >
      <Image
        style={styles.logoImg}
        source={require("../assets/img/512px-React-icon.svg.png")}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  logoImg: {
    width: 400,
    height: 400,
  },
});