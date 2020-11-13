import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import * as Location from './src/Location'



 const App = () => {
   const getLocation = async (config) => {
     let curLocation =  Location.getLocation();
     return curLocation;
   }
   
getLocation().then(result=>{console.log(result)})


   return (
     <View
       style={{
         flex: 1,
         justifyContent: "center",
         alignItems: "center"
       }}>
       <Text>Hello, world!</Text>
     </View>
   )
 }
 export default App;
