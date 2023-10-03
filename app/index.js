import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home';
import Movie from './movie';

const Stack = createStackNavigator();

function App() {
  return (
    
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Movie" component={Movie} />
      </Stack.Navigator>

  );
}

export default App;






