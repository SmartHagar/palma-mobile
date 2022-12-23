/** @format */

import Toast from 'react-native-toast-message';
import colors from '../assets/styles/colors';

const showToast = event => {
  Toast.show({
    type: event.type,
    text1: event.judul,
    text2: event.pesan,
    position: 'top',
    topOffset: -100,
  });
};

export default showToast;
