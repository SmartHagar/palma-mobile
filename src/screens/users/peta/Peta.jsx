import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapboxGL, {MapView, Camera} from '@rnmapbox/maps';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic21hcnRzcGFydGFjdXMiLCJhIjoiY2xjOTJ5bXl6MXBnYjNwbW9waTlsdzRoeCJ9.3pOceeR4L5500KVwXWoLZQ',
);

const Peta = () => {
  const coordinates = [140.7038764782628, -2.542737536781644];
  return (
    <View className="h-full">
      <MapboxGL.MapView
        logoEnabled={false}
        localizeLabels={true}
        style={{flex: 1}}>
        {/* koordinate */}
        <MapboxGL.Camera zoomLevel={13} centerCoordinate={coordinates} />
        {/* Mark */}
        <View>
          <MapboxGL.MarkerView id="1" coordinate={coordinates}>
            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: '#cc001f',
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 3,
              }}
            />
          </MapboxGL.MarkerView>
        </View>
        {/* Point */}
        <MapboxGL.PointAnnotation
          coordinate={coordinates}
          draggable={true}
          onDragEnd={e => console.log('titik', e.geometry.coordinates)}>
          <View
            style={{
              height: 30,
              width: 30,
              backgroundColor: '#00cccc',
              borderRadius: 50,
              borderColor: '#fff',
              borderWidth: 3,
            }}
          />
        </MapboxGL.PointAnnotation>
      </MapboxGL.MapView>
    </View>
  );
};

export default Peta;

const styles = StyleSheet.create({});
