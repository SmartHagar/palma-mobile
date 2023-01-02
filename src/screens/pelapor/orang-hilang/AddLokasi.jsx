import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import DialogComp from '../../../componets/form/DialogComp';
import BtnPrimary from '../../../componets/button/BtnPrimary';

import MapboxGL, {MapView, Camera} from '@rnmapbox/maps';
import useLokasi from '../../../store/crud/lokasi';
import colors from '../../../assets/styles/colors';
import SpinerLoad from '../../../componets/loading/SpinerLoad';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic21hcnRzcGFydGFjdXMiLCJhIjoiY2xjOTJ5bXl6MXBnYjNwbW9waTlsdzRoeCJ9.3pOceeR4L5500KVwXWoLZQ',
);

const AddLokasi = ({
  openLokasi,
  setOpenLokasi,
  dataList,
  dtDet,
  setRefreshing,
}) => {
  // store
  const {addData} = useLokasi();
  // state
  const [coordinat, setCoordinat] = useState([
    140.7038764782628, -2.542737536781644,
  ]);
  const [zoom, setZoom] = useState(16);
  const [isLoading, setIsLoading] = useState(false);

  const showPoint = () => {
    return dataList.map((row, index) => {
      const {lokasi} = row;
      if (lokasi !== null) {
        const coorMiss = [lokasi.longitude, lokasi.latitude];
        return (
          <View key={index}>
            <MapboxGL.PointAnnotation
              coordinate={coorMiss}
              id={(index + 3).toString()}>
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

  const onSubmit = async () => {
    setIsLoading(true);
    const items = {
      orang_hilang_id: dtDet.id,
      longitude: coordinat[0],
      latitude: coordinat[1],
    };
    const add = await addData(items);
    setRefreshing(true);
    setIsLoading(false);
  };
  return (
    <DialogComp
      openLokasi={openLokasi}
      height="100%"
      width="100%"
      judul={`Masukan lokasi terakhir ${dtDet.nama}`}>
      <View>
        <View className="-mx-5 h-full relative">
          <View className="absolute right-2 z-50 top-2">
            <View className="flex-row justify-center space-x-2">
              {isLoading ? (
                <SpinerLoad />
              ) : (
                <BtnPrimary
                  text="Simpan Lokasi"
                  type="third"
                  onPress={onSubmit}
                />
              )}
              <BtnPrimary
                text="Tutup Peta"
                onPress={() => (setOpenLokasi(false), setRefreshing(true))}
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
            <MapboxGL.Camera zoomLevel={zoom} centerCoordinate={coordinat} />

            {/* Point */}
            <View>
              <MapboxGL.PointAnnotation
                id="1"
                coordinate={coordinat}
                draggable={true}
                onDragEnd={e => setCoordinat(e.geometry.coordinates)}>
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
      </View>
    </DialogComp>
  );
};

export default AddLokasi;

const styles = StyleSheet.create({});
