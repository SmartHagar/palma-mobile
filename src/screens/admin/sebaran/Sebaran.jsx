import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import MapboxGL, {MapView, Camera} from '@rnmapbox/maps';
import colors from '../../../assets/styles/colors';
import useOrangHilangAPI from '../../../store/api/orang-hilang';
import {useIsFocused} from '@react-navigation/native';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic21hcnRzcGFydGFjdXMiLCJhIjoiY2xjOTJ5bXl6MXBnYjNwbW9waTlsdzRoeCJ9.3pOceeR4L5500KVwXWoLZQ',
);

const Sebaran = () => {
  // store
  const {setApiOrangHilang, dtApiOrgHilang} = useOrangHilangAPI();
  const coordinates = [140.7038764782628, -2.542737536781644];
  const isFocused = useIsFocused();
  // effect
  useEffect(() => {
    setApiOrangHilang({});
    return () => {};
  }, [isFocused]);

  const showPoint = () => {
    return dtApiOrgHilang.map((row, index) => {
      const {lokasi} = row;
      if (lokasi !== null) {
        const coorMiss = [lokasi.longitude, lokasi.latitude];
        return (
          <View key={index}>
            <MapboxGL.PointAnnotation
              coordinate={coorMiss}
              id={(index + 1).toString()}>
              <View
                style={{backgroundColor: colors.danger}}
                className="rounded-full">
                <Text className="text-white p-1">{row.nama}</Text>
              </View>
            </MapboxGL.PointAnnotation>
          </View>
        );
      }
    });
  };
  return (
    <View className="h-full">
      <MapboxGL.MapView
        logoEnabled={false}
        localizeLabels={true}
        style={{flex: 1}}>
        {/* koordinate */}
        <MapboxGL.Camera zoomLevel={15} centerCoordinate={coordinates} />
        {/* Mark */}
        {showPoint()}
      </MapboxGL.MapView>
    </View>
  );
};

export default Sebaran;

const styles = StyleSheet.create({});
