import React from 'react';
import { StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


function MapVariasCiudades(props) {
    const ciudades = props.listaCiudades;
    const mapaVisible=props.mapaVisible;

    let location = {
        latitude: -34.603333,
        longitude: -58.381667,  
        latitudeDelta: 5,
        longitudeDelta: 5,
    }

    if (mapaVisible){
        return (
            <MapView 
                style={styles.mapCiudad}
                region={location}
            >
                {
                ciudades.map((element) => 
                <Marker coordinate={{ latitude: Number(element.lat), longitude: Number(element.lon), }} 
                     key={`${element.id}marker`}
                     pinColor="green"
                     image={require("../assets/img/ice-cream.png")} >
                    <Text style={styles.CiudadNombreMapa}>{element.name}</Text>
                </Marker>)
                }
            </MapView>
    );
    }else{
        return <></>;
    }
}

export default MapVariasCiudades

const styles = StyleSheet.create({
    mapCiudad:{
        width: '100%',
        height: '60%',
        marginBottom: 80
      },
    CiudadNombreMapa:{
        fontWeight: 'bold',
        color: 'green',
        fontSize: 14,
        zIndex: 10
    }
})