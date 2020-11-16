import React, {useState} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'
import {getPermission, getLocation, setLocationConfig} from './src/Location'

const Location = async ({setLongitude, setLatitude}) => {

 let granted = await getPermission();
 if(granted){
   let location = await getLocation();
   let {longitude, latitude} = location[0];

   setLongitude(longitude);
   setLatitude(latitude);
 }
};

const KakaoMap = async () => {
  const url = "https//dapi.kakao.com/v2/maps/sdk.js?appkey=3b1c2d3a820a3a20892277995a9a3e42"
  fetch(url).then(res => {
    console.log(res);
  })
}

 const App = () => {
   const [longitude, setLongitude] = useState(0);
   const [latitude, setLatitude]   = useState(0);

   Location({setLongitude, setLatitude});
   KakaoMap();

   return (
     <View
      style={{width:500, height : 500 }}
     >
       <Text>Hello World</Text>
       <Text>{longitude},</Text>
       <Text>{latitude}</Text>
     </View>
   );
 };
 export default App;
