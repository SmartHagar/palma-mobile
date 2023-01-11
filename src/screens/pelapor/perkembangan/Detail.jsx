import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DialogComp from '../../../componets/form/DialogComp';
import BtnPrimary from '../../../componets/button/BtnPrimary';
import colors from '../../../assets/styles/colors';
import moment from 'moment';

const Detail = ({visible, setVisible, dtDet, setRefreshing}) => {
  return (
    <DialogComp
      openForm={visible}
      judul={dtDet.laporan.orang_hilang.nama}
      height="90%">
      <ScrollView
        className="mb-2 space-y-1"
        style={{borderColor: colors.third}}>
        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Tgl. Pencarian
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {moment(dtDet.tgl).format('DD MMMM YYYY')}
          </Text>
        </View>

        <View
          className="border p-1 rounded-md"
          style={{borderColor: colors.third}}>
          <Text className="text-black font-[Roboto-Regular] text-center underline">
            Detail
          </Text>
          <Text className="text-black font-[Roboto-Regular]">
            {dtDet.detail}
          </Text>
        </View>
      </ScrollView>
      <View className="space-y-2 mt-4">
        <View className="w-[80%] mx-auto">
          <BtnPrimary
            onPress={() => setVisible(false)}
            type="secondary"
            text="Tutup"
          />
        </View>
      </View>
    </DialogComp>
  );
};

export default Detail;

const styles = StyleSheet.create({});
