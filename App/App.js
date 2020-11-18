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
   const [myWebView, setMyWebView] = useState(0);

  const injectedJavaScript = (string) => {
    return `
      ${string}
      true;
    `
  }

  const postMessage = (data) => {
    console.log(data);
     myWebView.postMessage(data, '*');
  }

  const onMessage = async (message) => {
    if(message.nativeEvent.data === 'location'){
      await Location({setLongitude, setLatitude});
      // postMessage({longitude,latitude})
    }
  }


   return (
        <WebView
          ref={webview => { setMyWebView(webview);}}
          onMessage={onMessage}
          source={{ uri: "https://easy-navi-ieefo.run.goorm.io/" }}
          originWhitelist={['*']}
          javaScriptEnabledAndroid={true}
          injectedJavaScript={injectedJavaScript()}
        />
   );
 };



 export default App;
