import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { searchGif } from './Services/GetGif';
import { getFavoriteGIFs } from './Services/Firebase'
let windowSize = Dimensions.get('window')

export default function App() {
  const [searchResults, setSearchResults] = useState([])
  const [searchTerm, setSearchTerm] = React.useState("");
  useEffect(() => {
    let mounted = true;
    // Update the document title using the browser API
    searchGif(searchTerm)
    .then(items => {
      setSearchResults(items.results)
      getFavoriteGIFs()
      .then(gifs => {
        console.log(gifs)
        console.log("Ran")
      })
    })
    return () => mounted = false;
  }, []);

  const onSearch = () => {
    searchGif(searchTerm)
    .then(items => {
      console.log(items)
      setSearchResults(items.results)
    })
  }

  const renderSearchResults = (results) => {
    return results.map(result => {
      return <Image source={{uri: result.media[0].tinygif.url}}
      style={{width: 100, height:100 }}/>
    })
  }

  return (
    <View style={styles.container}>
      <Text>Search and Save your Favorite GIFs!</Text>
      <TextInput
        onChangeText={setSearchTerm}
        value={searchTerm}
        style={styles.input} 
      />
      <Button
        onPress={onSearch}
        title="Search"
        color="#841584"
      />
      {renderSearchResults(searchResults)}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: windowSize.width - 70,
    color: '#555555',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    height: '4%', 
    borderColor: '#6E5BAA',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#ffffff'
  },
});
