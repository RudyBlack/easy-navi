import React, {useState} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,

} from 'react-native'
import {getPermission, getLocation, setLocationConfig} from './src/Location'
import {WebView} from 'react-native-webview'

const Location = async () => {
 let granted = await getPermission();

 if(granted){
   let location = await getLocation();
   return location;
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
    myWebView.postMessage(JSON.stringify(data), '*');
  }

  const onMessage = async (message) => {
    if(message.nativeEvent.data === 'location'){
      let location = await Location();
      postMessage(location);
    }
  }


   return (
        <WebView
          ref={webview => { setMyWebView(webview);}}
          onMessage={onMessage}
          source={{ uri: "http://easy-navi-ieefo.run.goorm.io/" }}
          originWhitelist={['*']}
          javaScriptEnabledAndroid={true}
          injectedJavaScript={injectedJavaScript('')}
        />
   );
 };



 export default App;
