import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';



const API_KEY = '5b24f1d354mshf83886aca7da369p19c8c4jsn86d952c93998';
const BASE_URL = 'https://moviesdatabase.p.rapidapi.com';

const Movie = () => {
const route = useRoute();
  const { peliculaId } = route.params;
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    obtenerInfoPelicula();
  }, []);

  const obtenerInfoPelicula = async () => {
    try {
      const options = {
        method: 'GET',
        url: `${BASE_URL}/titles/${peliculaId}`,
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      const data = response.data.results;
      setMovieData(data);
    } catch (error) {
      if (error.response) {
        console.error('Error en la respuesta de la API:', error.response.data);
      } else if (error.request) {
        console.error('Error en la solicitud:', error.request);
      } else {
        console.error('Error desconocido:', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {movieData.titleText && <Text>Título: {movieData.titleText.text}</Text>}
      {movieData.releaseYear && (
        <Text style={styles.whiteText}>Año de lanzamiento: {movieData.releaseYear.year}</Text>
      )}
      {movieData.primaryImage && (
        <Image
          source={{ uri: movieData.primaryImage.url }}
          style={{ width: 200, height: 400 }}
        />
      )}

      {movieData.primaryImage && (
        <Text style={styles.whiteText}>Elenco: {movieData.primaryImage.caption.plainText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      padding: 16,
    },
    whiteText: {
      color: 'white', // Establece el color del texto en blanco
    },
  });

export default Movie;


