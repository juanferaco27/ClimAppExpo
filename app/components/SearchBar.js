import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Icon } from 'react-native-elements';

const SearchBar = ({clicked, setClicked, searchPhrase, setSearchPhrase}) => {

  return (
    <View style={styles.container}>
      <View
        style={
           !clicked
            ? styles.searchBarUnclicked
            : styles.searchBarClicked
        }
      >
        <Icon name="magnify" type='material-community'
         color='#FFF' size={20} iconStyle={{paddingLeft: 15}}/>

        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <Icon name="close-circle-outline" type='material-community'
          color='#FFF' size={20} iconStyle={{paddingRight: 15}}
          onPress={() => {
                    setSearchPhrase("")
                }}
          />
        )}
      </View>
      {clicked && (
        <View style={styles.close}>
          <Button
            color='red'
            title="Cerrar"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    // margin: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
    marginTop: -40,
    marginBottom: 15,
  },
  searchBarUnclicked: {
    padding: 3,
    flexDirection: "row",
    width: "80%",
    // backgroundColor: "#d9dbda",
    backgroundColor: "#ffffff80",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20,

  },
  searchBarClicked: {
    padding: 3,
    flexDirection: "row",
    width: "70%",
    // backgroundColor: "#d9dbda",
    backgroundColor: "#ffffff80",
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "space-evenly",
    marginHorizontal: 10,
    marginTop: 70,
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    width: "90%",
    color: '#FFF',
  },
  close:{
    marginTop: 70 
  }
});
