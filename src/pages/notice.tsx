import React, {Component, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import axios from 'axios';
import {noticeList} from '../config/AxiosFunction';

// class App extends Component {
//   render() {
//     return (
//       <View>
//         <Text style={noticeStyle.noticeHeader}>hello world</Text>
//       </View>
//     );
//   }
// }
type noticeData = {
  id: number;
  createdDate: string;
  modifiedDate: string;
  createdBy: string;
  modifiedBy: string;
  title: string;
  content: string;
  pub: boolean;
};

function notice() {
  const [data, setData] = useState<noticeData[]>([]);

  async function GetData() {
    const response = await noticeList();
    console.log(response.data.content);
    setData(response.data.content);
  }

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <View style={noticeStyle.VectorArea}>
        <Image
          source={require('../assets/Vector.png')}
          style={noticeStyle.noticeVector}
        />
        <Text style={noticeStyle.noticeHeader}>공지사항</Text>
        {data
          ? data.map((item: noticeData, index: number) => (
              <View key={index}>
                <Text>{item.title}</Text>
                <Text>{item.createdDate}</Text>
                <Text>{item.createdBy}</Text>
              </View>
            ))
          : null}
      </View>
    </>
  );
}
export const noticeStyle = StyleSheet.create({
  noticeHeader: {
    position: 'absolute',
    width: 75,
    height: 28,
    left: 54,
    top: 69,
    fontfamily: 'Urbanist',
    fontstyle: 'normal',
    fontweight: 600,
    fontsize: 20,
    lineheight: '140%',
    // /* identical to box height, or 28px */
    display: 'flex',
    alignitems: 'center',
    letterspacing: 0.2,
    color: '#000000',
  },
  noticePrevButton: {
    display: 'flex',
    flexdirection: 'row',
    alignitems: 'flex-start',
    padding: 10,
    gap: 10,
    position: 'absolute',
    width: 44,
    height: 44,
    left: 16,
    top: 61,
  },
  noticeVector: {
    position: 'absolute',
    left: '16.67%',
    right: '16.67%',
    top: '17.59%',
    bottom: '17.59%',

    background: ' #00C1DE',
  },
  VectorArea: {
    display: 'flex',
    flexdirection: 'row',
    alignitems: 'flexstart',
    padding: 10,
    gap: 10,

    position: 'absolute',
    width: 44,
    height: 44,
    left: 16,
    top: 61,
  },
});

export default notice;
