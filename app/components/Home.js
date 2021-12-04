import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Animated, ImageBackground } from 'react-native';
import Cloud1 from '../assets/img/cloud1.png';
import Cloud2 from '../assets/img/cloud2.png';
import Sun from '../assets/img/sun.png';

const Home = () => {

    const [animacion] = useState(new Animated.Value(5));

    useEffect(() => {
      Animated.timing(
          animacion,{
              toValue: 35,
              duration: 1000,
              useNativeDriver: false
          }
      ).start();
    }, [])

    return (
        
        <View style={styles.container}>
            <ImageBackground source={require('../assets/img/background.jpg')} style={styles.img}>
            <Image
            style={styles.img_sun}
            source={Sun}
            />
            <Image
            style={styles.img_cloud2}
            source={Cloud2}
            />

            <Animated.Text style={[styles.txt_title, {fontSize: animacion}]}>Climapp</Animated.Text>
            
            <Image
            style={styles.img_cloud1}
            source={Cloud1}
            />

            <View style={styles.box}>
                <Text style={styles.text}>Bienvenida/o a <Text style={styles.span}>Climapp</Text>, esta aplicacion le permitira
                guardar el pronostico de todas las ciudades que usted desee, con la posibilidad de acceder a ellas
                en cualquier momento y en cualquier sitio.
                </Text>
            </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    img:{
        flex: 1,
        alignItems:'center',
        resizeMode: 'cover'
    },
    img_sun:{
        marginTop: 60,
        height: 100,
        resizeMode: 'contain'
    },
    img_cloud2:{
        marginTop: -30,
        marginRight: 250,
        height: 100,
        resizeMode: 'contain',
    },
    img_cloud1:{
        marginTop: -70,
        marginLeft: 250,
        height: 100,
        resizeMode: 'contain'
    },
    txt_title:{
        fontWeight: 'bold',
        color: '#FFF',
        marginTop: -70 
    },
    box:{
        backgroundColor: '#FFF',
        borderRadius: 15,
        margin: 20,
        padding: 6,
        borderColor: '#FFc107',
        borderWidth: 5
    },
    text:{
        color: '#000',
        padding: 15,
        fontSize: 22,
        textAlign: 'center'
    },
    span:{
        fontWeight: '900',
        color: 'orange'
    }
})


export default Home