import React, {useState} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,

} from 'react-native'
import {getPermission, getLocation, setLocationConfig} from './src/Location'
import {WebView} from 'react-native-webview'
const Location = async ({setLongitude, setLatitude}) => {

 let granted = await getPermission();
 if(granted){
   let location = await getLocation();
   let {longitude, latitude} = location[0];

   setLongitude(longitude);
   setLatitude(latitude);
 }
};

 const App = () => {
   const [longitude, setLongitude] = useState(0);
   const [latitude, setLatitude]   = useState(0);

   Location({setLongitude, setLatitude});

   return (
        <WebView
          source={{ uri: "https://library-ykbrl.run.goorm.io/" }}
          onMessage={(event)=> console.log(event.nativeEvent.data)}
          originWhitelist={['*']}
          javaScriptEnabledAndroid={true}
        />
   );
 };
 export default App;
