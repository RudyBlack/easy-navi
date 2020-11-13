import React, {useState} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import * as Location from './src/Location'

 const App = () => {
   const [longitude, setLongitude] = useState(0);
   const [latitude, setLatitude] = useState(0);

   Location.getLocation().then(result=>{
      setLongitude(result.longitude);
      setLatitude(result.latitude);
   })

   return (
     <View >
       <Text>Hello World</Text>
       <Text>{longitude},</Text>
       <Text>{latitude}</Text>
     </View>
   );
 };
 export default App;
