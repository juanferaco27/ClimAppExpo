import React, {useState, useEffect} from 'react';
import { Icon } from 'react-native-elements'
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import SearchBar from './SearchBar';
// import MapVariasCiudades from '../components/MapVariasCiudades';


const List = ({navigation}) => {
  const [ciudadesGuardadas, setCiudadesGuardadas] = useState([{}]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [mapaVisible,setMapaVisible] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
      getData();
  },[isFocused]);

  // guardo las ciudades en el Storage, se guarda el array completo de ciudades cada vez 
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('ciudades', jsonValue)
    } catch (e) {
      console.log("error al guardar los datos");
      console.log(e);
    }
  }
  //  leo las ciudades que estan guardadas en el Storage y actualizo el estado con ellas 
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('ciudades')
      if( jsonValue != null ) {
        setCiudadesGuardadas(JSON.parse(jsonValue));
      }else {
        console.log("no hay ciudades guardadas");
      } 
    } catch(e) {
      console.log("error al leer los datos");
      console.log(e);
    }
  }
// eliminar ciudad del State, en realidad se guarda un nuevo array sin esa ciudad 

  const eliminarCiudad = (ItemId) => {
    setCiudadesGuardadas( (ciudadesGuardadas) => {
      return ciudadesGuardadas.filter( ciudad => (ciudad.id != ItemId) );
    })
  };
  
  // datos que se van a renderizar en el flatlist
  const renderItem = ({ item }) => {
  // si no tengo que aplicar filtro del buscador, muestro todas las ciudades
    if (searchPhrase === "") {
      return (
        <View style={styles.itemsBox} key={`${item.id}lista`}>
          <View style={styles.listaItem} key={`${item.id}bloque`}>
            <Text style={styles.listaItemName} key={`${item.id}name`}>{item.name}</Text>
            <TouchableOpacity
              style={styles.listaItemButton} 
              onPress={()=> {navigation.navigate('Clima',{lat: item.lat, lon: item.lon, name: item.name });}}
              key={`${item.id}clima`}
              >
              <Icon name="weather-cloudy" type='material-community' color='#FFF' key={`${item.id}icon1`}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listaItemButtonDelete} 
              onPress={()=> {
                eliminarCiudad(item.id);
                storeData(ciudadesGuardadas.filter( ciudad => (ciudad.id != item.id) ))
              }}
              key={`${item.id}eliminar`}
              >
              <Icon name="trash-can-outline" type='material-community' color='#FFF' key={`${item.id}icon2`}/>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
    // si ingresaron una ciudad en el buscador 
    if (item.name.toUpperCase().includes(searchPhrase.toUpperCase())) {
      return (
        <View style={styles.itemsBox} key={`${item.id}lista`}>
          <View style={styles.listaItem} key={`${item.id}bloque`}>
            <Text style={styles.listaItemName} key={`${item.id}name`}>{item.name}</Text>
            <TouchableOpacity
              style={styles.listaItemButton} 
              onPress={()=> {navigation.navigate('Clima',{lat: item.lat, lon: item.lon, name: item.name });}}
              key={`${item.id}clima`}
              >
              <Icon name="weather-cloudy" type='material-community' color='#FFF' key={`${item.id}icon1`}/>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.listaItemButtonDelete} 
              onPress={()=> {
                eliminarCiudad(item.id);
                storeData(ciudadesGuardadas.filter( ciudad => (ciudad.id != item.id) ))
              }}
              key={`${item.id}eliminar`}
              >
              <Icon name="trash-can-outline" type='material-community' color='#FFF' key={`${item.id}icon2`}/>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  };
// en ciudadesAMostrar filtro que no haya un objeto vacio 
let ciudadesAMostrar = ciudadesGuardadas.filter(item => item.hasOwnProperty('id'));

return (
  <View style={styles.container}>
    <ImageBackground source={require('../assets/img/background.jpg')} style={styles.img}>
      {/* si esta el buscador no escribo el titulo  */}
      {!clicked  && (<View style={styles.container_title}>
        <Text style={styles.title}>Listado de ciudades</Text>
      </View>)}
      <SearchBar
        clicked={clicked}
        setClicked={setClicked}
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        />
      <View style={styles.container_flat}
        onStartShouldSetResponder={() => {
          setClicked(false);
        }}
      >
        <FlatList  style={styles.flatList}
          data={ciudadesAMostrar}
          renderItem={renderItem}
          keyExtractor={ciudad => ciudad.id}
          />
      </View>   
      <TouchableOpacity 
          style={styles.btn}
          activeOpacity={0.6}
          onPress = {() => navigation.navigate('Search')}    
      > 
          <Icon name="plus" type='material-community'/>
      </TouchableOpacity>
      {/* <MapVariasCiudades style={styles.mapaVariasCiudades} listaCiudades={ciudadesAMostrar} mapaVisible={mapaVisible}></MapVariasCiudades> */}
    </ImageBackground>    
  </View> 
  );
};


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    img:{
        flex: 1,
        alignItems:'center',
        resizeMode: 'cover'
    },
    container_title:{
        // flex: 0.1,
        marginTop: 50
    },
    title:{
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 30,
    },
    container_flat:{
        // marginBottom: 150,
        width: '80%',
        // width: '100%',
    },
    flatList:{
      height: 300
    },
    itemsBox:{
        // backgroundColor: '#F21',
    },
    listaItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 15,
        borderColor: '#000',
        borderWidth: 2,
        marginTop: 10,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems:'center',
        backgroundColor: '#FFF',
    },
    listaItemName:{
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
        paddingLeft: 22,
        color: '#000'
      },
    listaItemButton:{
        padding: 5,
        margin: 10,
        borderRadius: 100,
        height: 30,
        width: 30,
        borderColor: '#000',
        borderWidth: 1,
        padding: 2,
        backgroundColor: '#388E3C',
        elevation: 10
    },
    listaItemButtonDelete:{
        padding: 5,
        margin: 10,
        borderRadius: 100,
        height: 30,
        width: 30,
        borderColor: '#000',
        borderWidth: 1,
        padding: 2,
        backgroundColor: 'red',
        elevation: 10
    },
    titleName:{
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center'
    },
    btn: {
        backgroundColor: '#FFc107',
        justifyContent: 'center',
        borderRadius: 100,
        borderWidth: 2,
        height: 70,
        width: 70,
        alignSelf: 'flex-end',
        right: 20,
        bottom: -20,
        shadowColor: "#000",
        elevation: 30
    },
    mapaVariasCiudades:{
      marginBottom: 150,
    }
})

export default List