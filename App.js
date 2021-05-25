import React, { Component, useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid } from 'react-native';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

async function requestPermissions() {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
     authorizationLevel: 'whenInUse',
   });
  }

  if (Platform.OS === 'android') {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
}


const App = () => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    const _watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude, speed} = position.coords;
        setLocation({latitude, longitude, speed});
        console.log(latitude,longitude,speed);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
      },
    );

    return () => {
      if (_watchId) {
        Geolocation.clearWatch(_watchId);
      }
    };
  }, []);
  
  return (
    <View>
      <Text>latitude:{location.latitude}</Text>
      <Text>longitude:{location.longitude}</Text>
    </View>
  );
};


export default App;
