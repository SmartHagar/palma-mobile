import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import MapboxGL, {MapView, Camera} from '@rnmapbox/maps';
import colors from '../../../assets/styles/colors';
import DialogDelete from '../../../componets/form/DialogDelete';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic21hcnRzcGFydGFjdXMiLCJhIjoiY2xjOTJ5bXl6MXBnYjNwbW9waTlsdzRoeCJ9.3pOceeR4L5500KVwXWoLZQ',
);

const AddLokasi = ({dataList, setGetCoord, handleHapus}) => {
  // state
  const [coordinat, setCoordinat] = useState([
    140.7038764782628, -2.542737536781644,
  ]);
  const [zoom, setZoom] = useState(16);

  const showPoint = () => {
    return dataList.map((row, index) => {
      const coorMiss = [row.longitude, row.latitude];
      return (
        <View key={index}>
          <MapboxGL.PointAnnotation
            onSelected={() => handleHapus(row)}
            coordinate={coorMiss}
            id={(index + 3).toString()}>
            <View
              style={{backgroundColor: colors.primary}}
              className="rounded-full">
              <Text className="text-white p-1">{row.orang_hilang.nama}</Text>
            </View>
          </MapboxGL.PointAnnotation>
        </View>
      );
    });
  };
  return (
    <View className="h-full -mt-20 -z-10">
      <MapboxGL.MapView
        logoEnabled={false}
        localizeLabels={true}
        onRegionDidChange={e => setZoom(e.properties.zoomLevel)}
        style={{flex: 1}}>
        {/* koordinate */}
        <MapboxGL.Camera zoomLevel={zoom} centerCoordinate={coordinat} />

        {/* Point */}
        <View>
          <MapboxGL.PointAnnotation
            id="1"
            coordinate={coordinat}
            draggable={true}
            onDragEnd={e => (
              setCoordinat(e.geometry.coordinates),
              setGetCoord(e.geometry.coordinates)
            )}>
            <View
              style={{
                height: 30,
                width: 30,
                backgroundColor: '#00cccc',
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 3,
                zIndex: 40,
              }}
            />
          </MapboxGL.PointAnnotation>
          {showPoint()}
        </View>
      </MapboxGL.MapView>
    </View>
  );
};

export default AddLokasi;

const styles = StyleSheet.create({});
