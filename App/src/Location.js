import React from 'react'
import RNLocation from 'react-native-location';


const setConfig = (config) => {
  RNLocation.configure(config);
}

const getLocation = async () => {
  let permission = await RNLocation.requestPermission({
   ios: "whenInUse",
   android: {
     detail: "coarse"
   }
  })

  if(permission) {
    let curLocation = await RNLocation.getLatestLocation({ timeout: 60000 })
    return curLocation;
  }

}

const update = () => {
  Location().then(RNLocation => {
    RNLocation.subscribeToLocationUpdates(locations => {
      console.log(locations);
        return locations;
    })
  });
}

export {setConfig, getLocation, update}
