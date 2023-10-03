import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, FlatList, Modal } from 'react-native';
import styles from './styles';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';



const HomeScreen = () => {
  const [searchTitle, setSearchTitle] = useState(''); 
  const [searchResults, setSearchResults] = useState([]);
  const [titles, setTitles] = useState([])
  const navigation = useNavigation();
  const [isSearchModalVisible, setSearchModalVisible] = useState(false); 


  useEffect(() => {
    cargarImagenesPeliculas(); // Cargar imágenes de películas cuando el componente se monta
  }, []);

  const cargarImagenesPeliculas = async () => {
    try {
      const response = await axios.get(
        'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming',
        {
          headers: {
            'x-rapidapi-key': '5b24f1d354mshf83886aca7da369p19c8c4jsn86d952c93998',
            'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
          },
        }
      );

      setTitles(response.data.results);
    } catch (error) {
      console.error('Error al cargar imágenes de películas:', error);
    }
  };

  


  const buscarPorTitulo = async () => {
    try {
      const response = await axios.get(
        `https://moviesdatabase.p.rapidapi.com/titles/search/title/${searchTitle}`,
        {
          headers: {
            'x-rapidapi-key': '5b24f1d354mshf83886aca7da369p19c8c4jsn86d952c93998',
            'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com',
          },
        }
      );

      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error al buscar películas:', error);
    }
  };
  const toggleSearchModal = () => {
    setSearchModalVisible(!isSearchModalVisible);
  };
  


    return (
        <View style={styles.container}>
          {/* Lista de imágenes de películas */}
          <Text style={styles.title}>Bienvenido al portal de películas y series</Text>
          <FlatList
            data={titles}
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('movie', { peliculaId: item.id });
                }}
              >
                <View style={styles.resultItem}>
                  {item.primaryImage ? (
                    <Image source={{ uri: item.primaryImage.url }} style={styles.image2} />
                  ) : (
                    <Text>Imagen no disponible</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
    
          {/* Buscador de películas */}
          <ScrollView>
          <Text style={styles.title}>Buscar Películas</Text>
          <TextInput
            style={styles.input}
            placeholder="Buscar por título"
            value={searchTitle}
            onChangeText={setSearchTitle}
          />
          <Button title="Buscar" onPress={buscarPorTitulo} />
          {searchResults.length === 0 ? (
            <Text>No se encontraron resultados</Text>
          ) : (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('movie', { peliculaId: item.id });
                  }}
                >
                  <View style={styles.resultItem}>
                    {item.primaryImage ? (
                      <Image source={{ uri: item.primaryImage.url }} style={styles.image} />
                    ) : (
                      <Text>Imagen no disponible</Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
          </ScrollView>
        </View>
      );
    };
    
export default HomeScreen;