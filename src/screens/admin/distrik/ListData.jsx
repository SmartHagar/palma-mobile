import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const ListData = ({
  dataList,
  setRefreshing,
  refreshing,
  page,
  setPage,
  isLoading,
  responses,
  handleHapus,
  handleEdit,
}) => {
  // render Item
  const renderItem = ({item, index}) => (
    <View className="flex-row justify-between items-center h-9 my-[1px] px-1 rounded-lg bg-slate-300">
      <View>
        <Text className="text-black">{item.nama}</Text>
      </View>
      <View className="flex-row items-center space-x-[2px]">
        <TouchableOpacity
          onPress={() => handleEdit(item)}
          className="p-1 rounded-md bg-yellow-200">
          <Text className="text-black">Ubah</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleHapus(item.id)}
          className="p-1 rounded-md bg-red-500">
          <Text className="text-white">Hapus</Text>
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
        <ActivityIndicator size="small" color="#aaa" />
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

const styles = StyleSheet.create({
  container: {
    padding: 50,
    flex: 1,
  },
});
