import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { searchGif } from './Services/GetGif';
import { getFavoriteGIFs } from './Services/Firebase'
let windowSize = Dimensions.get('window')

export default function App() {
  const [searchResults, setSearchResults] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchTerm, setSearchTerm] = React.useState("");
  useEffect(() => {
    let mounted = true;
    // Update the document title using the browser API
    searchGif(searchTerm)
    .then(items => {
      setSearchResults(items.results)
      getFavoriteGIFs()
      .then(favorites => {
        setFavorites(favorites)
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
    return (
    <View style={styles.gifRow}>
      {results.map(result => <Image source={{uri: result.media[0].tinygif.url}}
      key={result.id}
      style={{width: 100, height:100 }}/>)
      }
    </View>
    
    )
  }
  const renderFavorites = (favorites) => {
    return (
    <View style={styles.gifRow}>
      {favorites.map(favorite => <Image source={{uri: favorite.url}}
      key={favorite.id}
      style={{width: 100, height:100 }}/>)
      }
    </View>
    
    )
  }

  return (
    <View style={styles.container}>
      <Text>Search and Save your Favorite GIFs!</Text>
      <View style={styles.gifRow}>
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
      </View>
      {renderSearchResults(searchResults)}
      <Text>Favorite GIFs</Text>
      {renderFavorites(favorites)}
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
  gifRow: {
    width: windowSize.width - 70,
    flexDirection: "row",
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: windowSize.width - 70,
    color: '#555555',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    height: '100%', 
    borderColor: '#6E5BAA',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'center',
    backgroundColor: '#ffffff'
  },
});
