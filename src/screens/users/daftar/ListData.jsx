import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../assets/styles/colors';
import Detail from './Detail';
import ShowLokasi from './ShowLokasi';

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
  // state
  const [visible, setVisible] = useState(false);
  const [dtDet, setDtDet] = useState(false);
  const [openLokasi, setOpenLokasi] = useState(false);
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
  // render Item
  const renderItem = ({item, index}) => (
    <>
      {item.status === 'diterima' && (
        <View
          style={{borderWidth: 1, borderColor: colors.third}}
          className="flex-row justify-between items-center h-9 my-[1px] px-1 rounded-lg bg-white/70">
          <TouchableOpacity onPress={() => showDetail(item)}>
            <Text className="text-black">{item.nama}</Text>
          </TouchableOpacity>
          <View className="flex-row items-center space-x-[2px]">
            <TouchableOpacity
              onPress={() => showLokasi(item)}
              style={{backgroundColor: colors.primary}}
              className="p-1 rounded-md">
              <Text className="text-white">Lokasi</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
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
        <ShowLokasi
          openLokasi={openLokasi}
          setOpenLokasi={setOpenLokasi}
          dtDet={dtDet}
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
