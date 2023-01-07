import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {Icon} from '@rneui/themed';
import useDistrik from '../../store/crud/distrik';
import colors from '../../assets/styles/colors';

const DistrikSelect = ({pilihDistrik, isReset}) => {
  // store
  const {setDistrik, dtDistrik} = useDistrik();
  const dropdownRef = useRef({});

  useEffect(() => {
    dropdownRef.current.reset();
    console.log('reset');
  }, [isReset]);

  useEffect(() => {
    setDistrik({});
  }, []);

  // pilihan Distrik
  const optionsDistrik = dtDistrik.map(function (Distrik) {
    return {
      value: Distrik.id,
      label: `${Distrik.nama}`,
    };
  });

  const onSearchSelect = search => {
    setDistrik({search});
    console.log('cari', search);
  };

  return (
    <SelectDropdown
      search={true}
      data={optionsDistrik}
      ref={dropdownRef}
      onChangeSearchInputText={onSearchSelect}
      onSelect={selectedItem => {
        pilihDistrik(selectedItem.value);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.label;
      }}
      rowTextForSelection={(item, index) => {
        return item.label;
      }}
      defaultButtonText="Pilih Distrik"
      buttonStyle={{
        backgroundColor: colors.putih,
        borderColor: colors.third,
        borderWidth: 1,
        width: '100%',
        height: 35,
        borderRadius: 6,
      }}
      buttonTextStyle={{fontSize: 14}}
      renderDropdownIcon={isOpened => {
        return (
          <Icon
            name={isOpened ? 'chevron-up' : 'chevron-down'}
            type="evilicon"
            size={18}
            color={'#444'}
          />
        );
      }}
      dropdownIconPosition={'right'}
      searchInputStyle={{
        height: 50,
        borderBottomColor: colors.third,
        borderBottomWidth: 1,
      }}
      dropdownStyle={{
        backgroundColor: colors.putih,
        borderRadius: 6,
        minHeight: 200,
      }}
      rowStyle={{height: 40}}
      rowTextStyle={{fontSize: 14}}
      dropdownOverlayColor="rgba(0, 0, 0, 0.314)"
    />
  );
};

export default DistrikSelect;

const styles = StyleSheet.create({});
