import React from 'react'
import RNLocation from 'react-native-location';


const setLocationConfig = (config) => {
  RNLocation.configure({
    desiredAccuracy: {
      android: "balancedPowerAccuracy"
    }
  });
};

const getPermission = async () => {

  let permission = await RNLocation.requestPermission({
    ios: 'whenInUse', // or 'always'
    android: {
      detail: 'fine', // or 'fine'
      rationale: {
        title: "We need to access your location",
        message: "We use your location to show where you are on the map",
        buttonPositive: "OK",
        buttonNegative: "Cancel"
      }
    }
  });
  return permission;
}

const getLocation = async () => {
  return new Promise(resolve => {
    RNLocation.subscribeToLocationUpdates(locations => {
      resolve(locations);
    })
  })
}

export {
  getPermission,
  getLocation,
  setLocationConfig
}
