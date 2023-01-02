import {
  ActivityIndicator,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../assets/styles/colors';
import Detail from './Detail';
import AddLokasi from './AddLokasi';
import RNFetchBlob from 'rn-fetch-blob';
import useUrl from '../../../services/base_url';
import SpinerLoad from '../../../componets/loading/SpinerLoad';

const ListData = ({
  dataList,
  setRefreshing,
  refreshing,
  page,
  setPage,
  responses,
  handleHapus,
  handleEdit,
}) => {
  const {BASE_URL} = useUrl();
  // state
  const [visible, setVisible] = useState(false);
  const [dtDet, setDtDet] = useState(false);
  const [openLokasi, setOpenLokasi] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // show data detail
  const showDetail = data => {
    setVisible(true);
    setDtDet(data);
  };
  // show lokasi
  const showLokasi = data => {
    setOpenLokasi(true);
    setDtDet(data);
  };
  // download laporan
  const checkPermission = async item => {
    setIsLoading(true);
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadFile(item);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadFile(item);
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
      setIsLoading(false);
    }
  };

  const downloadFile = item => {
    const REMOTE_IMAGE_PATH = `${BASE_URL}/export/pdf/laporan/orang-hilang/${item.id}`;

    // Image URL which we want to download
    let pdf_URL = REMOTE_IMAGE_PATH;
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config} = RNFetchBlob;
    let dirs = RNFetchBlob.fs.dirs;

    let PictureDir = dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          `/palma-aplikasi/Laporan Orang Hilang (${item.nama}).pdf`,
        description: 'PDF',
      },
    };
    config(options)
      .fetch('GET', pdf_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        ToastAndroid.show('Download Berhasil!', ToastAndroid.SHORT);
      });
  };
  // render Item
  const renderItem = ({item, index}) => (
    <View
      style={{
        backgroundColor:
          item.status === 'ditolak'
            ? colors.danger
            : item.status === 'diproses'
            ? colors.primary
            : item.status === 'diterima'
            ? 'rgba(254, 254, 254, 0.895)'
            : '',
      }}
      className="flex-row justify-between items-center h-9 my-[1px] px-1 rounded-lg bg-white">
      <TouchableOpacity onPress={() => showDetail(item)}>
        <Text className="text-black">{item.nama}</Text>
      </TouchableOpacity>
      <View className="flex-row items-center space-x-[2px]">
        {item.status === 'diterima' && (
          <>
            {isLoading ? (
              <SpinerLoad />
            ) : (
              <TouchableOpacity
                onPress={() => checkPermission(item)}
                className="p-1 rounded-md"
                style={{backgroundColor: colors.primary}}>
                <Text className="text-white">Laporan</Text>
              </TouchableOpacity>
            )}
          </>
        )}
        <TouchableOpacity
          onPress={() => showLokasi(item)}
          className="p-1 rounded-md"
          style={{backgroundColor: colors.third}}>
          <Text className="text-white">Lokasi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  //   jika data kosong
  const myListEmpty = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text>Data tidak ditemukan</Text>
      </View>
    );
  };

  const totalData = responses.total;
  const totalLoad = dataList.length;
  const endData = totalData === totalLoad;

  // loader
  const renderLoader = () =>
    !endData ? (
      <View>
        <ActivityIndicator size="large" color={colors.third} />
      </View>
    ) : (
      <View>
        <Text className="text-black text-center my-2">Tidak ada data lagi</Text>
      </View>
    );

  // ketika scroll
  const handleScroll = () => {
    !endData && setPage(page + 1);
  };

  return (
    <View>
      {visible && (
        <Detail
          visible={visible}
          setVisible={setVisible}
          dtDet={dtDet}
          setRefreshing={setRefreshing}
        />
      )}
      {openLokasi && (
        <AddLokasi
          openLokasi={openLokasi}
          setOpenLokasi={setOpenLokasi}
          dtDet={dtDet}
          dataList={dataList}
          setRefreshing={setRefreshing}
        />
      )}
      <FlatList
        data={dataList}
        renderItem={renderItem}
        ListEmptyComponent={myListEmpty}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{paddingBottom: '45%', paddingHorizontal: 5}}
        onRefresh={() => setRefreshing(true)}
        refreshing={refreshing}
        ListFooterComponent={renderLoader}
        onEndReachedThreshold={0.2}
        onEndReached={handleScroll}
        extraData={dataList}
      />
    </View>
  );
};

export default ListData;
