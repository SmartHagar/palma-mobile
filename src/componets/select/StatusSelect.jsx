import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import {Icon} from '@rneui/themed';
import colors from '../../assets/styles/colors';

// data status
const dtStatus = [
  {
    label: 'Diproses',
    value: 'diproses',
  },
  {
    label: 'Diterima',
    value: 'diterima',
  },
  {
    label: 'Ditolak',
    value: 'ditolak',
  },
  {
    label: 'Dihentikan',
    value: 'dihentikan',
  },
];

const StatusSelect = ({isReset, setPilihStatus, hilang = false, ...props}) => {
  // store
  const dropdownRef = useRef({});

  useEffect(() => {
    dropdownRef.current.reset();
  }, [isReset]);

  // pilihan Status
  const optionsStatus = dtStatus.map(function (status) {
    if (!hilang) {
      if (status.value !== 'dihentikan') {
        return {
          value: status.value,
          label: `${status.label}`,
        };
      }
    } else {
      return {
        value: status.value,
        label: `${status.label}`,
      };
    }
  });

  return (
    <SelectDropdown
      data={optionsStatus}
      ref={dropdownRef}
      onSelect={selectedItem => {
        setPilihStatus(selectedItem.value);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.label;
      }}
      rowTextForSelection={(item, index) => {
        return item.label;
      }}
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
      searchInputStyle={{height: 30, borderBottomColor: colors.third}}
      dropdownStyle={{
        backgroundColor: colors.putih,
        borderRadius: 6,
      }}
      rowStyle={{height: 30}}
      rowTextStyle={{fontSize: 14}}
      dropdownOverlayColor="rgba(0, 0, 0, 0.314)"
      {...props}
    />
  );
};

export default StatusSelect;

const styles = StyleSheet.create({});
