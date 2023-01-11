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
import moment from 'moment';

const ListData = ({dataList, setRefreshing, refreshing}) => {
  // state
  const [visible, setVisible] = useState(false);
  const [dtDet, setDtDet] = useState(false);
  // show data detail
  const showDetail = data => {
    setVisible(true);
    setDtDet(data);
  };
  // render Item
  const renderItem = ({item, index}) => (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.third,
      }}
      className="flex-row justify-between items-center h-9 my-[1px] px-1 rounded-lg bg-white/50">
      <View className="w-[90%]">
        <TouchableOpacity onPress={() => showDetail(item)}>
          <Text className="text-black">{item.laporan.orang_hilang.nama}</Text>
          <View className="flex-row space-x-1">
            <Text className="text-black">
              {moment(item.tgl).format('DD MMMM YYYY')}
            </Text>
          </View>
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
      <FlatList
        data={dataList}
        renderItem={renderItem}
        ListEmptyComponent={myListEmpty}
        keyExtractor={(item, index) => index}
        contentContainerStyle={{paddingBottom: '45%', paddingHorizontal: 5}}
        onRefresh={() => setRefreshing(true)}
        refreshing={refreshing}
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
