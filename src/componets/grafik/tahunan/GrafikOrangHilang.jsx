import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {BarChart} from 'react-native-chart-kit';
import colors from '../../../assets/styles/colors';
import SpinerLoad from '../../loading/SpinerLoad';
import TahunSelect from '../../select/TahunSelect';
import {useIsFocused} from '@react-navigation/native';
import useOrangHilangAPI from '../../../store/api/orang-hilang';

const GrafikOrangHilang = () => {
  // store
  const {setApiTahunan, dtLaporan} = useOrangHilangAPI();
  // state
  const [tahun, setTahun] = useState(moment().format('YYYY')); //moment().format('YYYY')
  const [myDataChart, setMyDataChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addWidth, setAddWidth] = useState(2);

  const isFocused = useIsFocused();

  // group
  function groupBy(items) {
    const groups = items.reduce((groups, row) => {
      const date = row.tgl_hilang.split('-')[1];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(row);
      return groups;
    }, {});
    // Edit: to add it in the array format instead
    const groupArrays = Object.keys(groups).map(date => {
      return {
        tgl_hilang: date,
        data: groups[date].length,
      };
    });

    function compare(a, b) {
      if (a.tgl_hilang < b.tgl_hilang) {
        return -1;
      }
      if (a.tgl_hilang > b.tgl_hilang) {
        return 1;
      }
      return 0;
    }

    groupArrays.sort(compare);
    return groupArrays;
  }
  const fetchData = async () => {
    setIsLoading(true);
    const {data} = await setApiTahunan({tahun});
    showGrafik(data);
  };
  // effect
  useEffect(() => {
    fetchData();
    return () => {};
  }, [tahun, isFocused]);

  const showGrafik = dataChart => {
    const dataGroup = groupBy(dataChart);
    // return;
    const categories = [];
    const data = [];
    dataGroup.forEach(el => {
      categories.push(moment(`${tahun}-${el.tgl_hilang}-01`).format('MMM'));
      data.push(el.data);
    });
    setMyDataChart({
      labels: categories,
      datasets: [
        {
          data,
        },
      ],
    });
    setAddWidth(categories.length + addWidth);
    setIsLoading(false);
  };

  return (
    <View>
      <View className="mx-[10%]">
        <TahunSelect setPilihTahun={setTahun} defaultButtonText={tahun} />
      </View>
      {isLoading ? (
        <SpinerLoad />
      ) : (
        <ScrollView horizontal={true}>
          <BarChart
            style={{
              marginVertical: 8,
              borderRadius: 0,
            }}
            data={myDataChart}
            width={Dimensions.get('window').width - 30 + addWidth}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#ffffff',
              backgroundGradientFromOpacity: 1,
              backgroundGradientTo: '#ffffff',
              backgroundGradientToOpacity: 1,
              color: () => colors.third,
              strokeWidth: 2, // optional, default 3
              barPercentage: 0.8,
              decimalPlaces: 2,
            }}
            verticalLabelRotation={0}
            fromZero={true}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default GrafikOrangHilang;

const styles = StyleSheet.create({});
