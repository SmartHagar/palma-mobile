import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DialogComp from '../../../componets/form/DialogComp';
import BtnPrimary from '../../../componets/button/BtnPrimary';

import MapboxGL, {MapView, Camera} from '@rnmapbox/maps';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic21hcnRzcGFydGFjdXMiLCJhIjoiY2xjOTJ5bXl6MXBnYjNwbW9waTlsdzRoeCJ9.3pOceeR4L5500KVwXWoLZQ',
);

const ShowLokasi = ({openLokasi, setOpenLokasi, dtDet}) => {
  // state
  const [zoom, setZoom] = useState(16);
  const lockMiss = [dtDet.lokasi.longitude, dtDet.lokasi.latitude];
  console.log('lokasi', lockMiss);

  return (
    <DialogComp
      openLokasi={openLokasi}
      height="100%"
      width="100%"
      judul={`Lokasi terakhir ${dtDet.nama}`}>
      <View>
        <View className="-mx-5 h-full relative">
          <View className="absolute right-2 z-50 top-2">
            <View className="flex-row justify-center space-x-2">
              <BtnPrimary
                text="Tutup Peta"
                onPress={() => setOpenLokasi(false)}
              />
            </View>
          </View>
          {/* Peta */}
          <MapboxGL.MapView
            logoEnabled={false}
            localizeLabels={true}
            onRegionDidChange={e => setZoom(e.properties.zoomLevel)}
            style={{flex: 1}}>
            {/* koordinate */}
            <MapboxGL.Camera zoomLevel={zoom} centerCoordinate={lockMiss} />

            {/* Point */}
            <View>
              <MapboxGL.PointAnnotation id="1" coordinate={lockMiss}>
                <View
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: '#cc0000',
                    borderRadius: 50,
                    borderColor: '#fff',
                    borderWidth: 3,
                    zIndex: 40,
                  }}
                />
              </MapboxGL.PointAnnotation>
            </View>
          </MapboxGL.MapView>
        </View>
      </View>
    </DialogComp>
  );
};

export default ShowLokasi;

const styles = StyleSheet.create({});
