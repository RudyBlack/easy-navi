import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import * as Location from './src/Location';
const App = () => {

  const [location, setLocation] = useState('');
  Location.getLocation().then(result=>{
      setLocation(result);
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World</Text>
      <Text>{location}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
