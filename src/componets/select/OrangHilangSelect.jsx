import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {Icon} from '@rneui/themed';
import colors from '../../assets/styles/colors';
import useOrangHilang from '../../store/crud/orang-hilang';

const OrangHilangSelect = ({setPilihOrangHilang, isReset}) => {
  // store
  const {setOrangHilang, dtOrangHilang} = useOrangHilang();
  const dropdownRef = useRef({});

  useEffect(() => {
    dropdownRef.current.reset();
    console.log('reset');
    setOrangHilang({});
  }, [isReset]);

  // pilihan org
  const optionsOrg = dtOrangHilang.map(function (org) {
    return {
      value: org.id,
      label: `${org.nama}`,
    };
  });

  const onSearchSelect = search => {
    setOrangHilang({search});
    console.log('cari', search);
  };

  return (
    <SelectDropdown
      search={true}
      data={optionsOrg}
      ref={dropdownRef}
      onChangeSearchInputText={onSearchSelect}
      onSelect={selectedItem => {
        setPilihOrangHilang(selectedItem.value);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.label;
      }}
      rowTextForSelection={(item, index) => {
        return item.label;
      }}
      defaultButtonText="Pilih Orang Hilang"
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
        height: 30,
        borderBottomColor: colors.third,
        borderBottomWidth: 1,
      }}
      dropdownStyle={{
        backgroundColor: colors.putih,
        borderRadius: 6,
      }}
      rowStyle={{height: 30}}
      rowTextStyle={{fontSize: 14}}
      dropdownOverlayColor="rgba(0, 0, 0, 0.314)"
    />
  );
};

export default OrangHilangSelect;

const styles = StyleSheet.create({});
