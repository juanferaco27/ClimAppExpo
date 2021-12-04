import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native'
import { useIsFocused } from '@react-navigation/native';

const API_KEY ='ede3ca5b2d0912688b80ead9e3f0d2d2';


const Clima = ({route}) => {
    if(!route.params.lat || !route.params.lon) return null;

    const ciudadNombre = route.params.name;
    const ciudadLat = route.params.lat;
    const ciudadLon = route.params.lon;
    const isFocused = useIsFocused();
    const[clima, setClima] = useState({});
    const [bgcolor, guardarBgcolor] = useState('rgb(255, 255, 255)');


    useEffect(()=> {
          fetchDataFromApi()
      },[isFocused])

    const fetchDataFromApi = () => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ciudadLat}&lon=${ciudadLon}&units=metric&lang=es&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data =>{
            setClima({temp: data.main.temp,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max,
                icono: data.weather[0].icon,
            });
            if (data.main.temp<10){
                guardarBgcolor('rgb(105, 108, 149)');
              }else if(data.main.temp >=10 && data.main.temp <26){
                guardarBgcolor('rgb(71, 149, 212)');
              }else{
                guardarBgcolor('rgb(178, 28, 61)');
              };
            // console.log(data)
        })
      }

      const bgColorApp = {
        backgroundColor: bgcolor
      }
    return (
        <View style={[styles.app, bgColorApp]}>
            <View style={styles.clima} >
                <Text style={[styles.text, styles.ciudadNombre]}>{ciudadNombre}</Text>
                <Text style={[styles.text, styles.actual]}>
                    {parseInt(clima.temp)}
                    <Text style={styles.temperatura}>
                        &#x2103;
                    </Text>
                    <Image
                        style= {{width: 66, height: 58}}
                        source={{uri: `https://openweathermap.org/img/w/${clima.icono}.png`}}
                    />
                </Text>
                <View style={styles.temp_min_max}>
                    <Text style={styles.text}>Min {''}
                        <Text style={styles.temperatura}>
                            {parseInt(clima.temp_min)} &#x2103;
                        </Text>
                    </Text>
                    <Text style={styles.text}>Max {''}
                        <Text style={styles.temperatura}>
                            {parseInt(clima.temp_max)} &#x2103;
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Clima

const styles = StyleSheet.create({
    app:{
        flex: 1,
        justifyContent: 'center'
    },
    clima:{
        marginBottom: 20
    },
    text:{
        color: "#FFF",
        fontSize: 20,
        textAlign: 'center',
        marginRight: 20,
    },
    ciudadNombre:{
        fontSize: 30,
        marginHorizontal: 20,
        marginVertical: 30,
    },
    actual:{
        fontSize: 80,
        marginRight: 0,
        fontWeight: 'bold'
    },
    temperatura:{
        fontSize: 24,
        fontWeight: 'bold'
    },
    temp_min_max:{
        flexDirection: 'row',
        justifyContent: 'center'
    }
})