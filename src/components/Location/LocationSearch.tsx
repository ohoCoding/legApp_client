import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import axios from "axios";

interface ILocation {
  latitude: number;
  longitude: number;
}

type LocationSearch = {
  navigation?: any,
  route: any
}

interface ILocationList {
  place_name: string;
  distance: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  id: string;
  phone: string;
  category_group_code: string;
  category_group_name: string;
  x: string;
  y: string;
}

const LocationSearch = ({ navigation, route }: LocationSearch) => {
  const [input, setInput] = useState<string>('');
  const [location, setLocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0
  });
  const [searchedLocation, setSearchedLocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0
  });

  const [locationList, setLocationList] = useState<ILocationList[]>([]);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position.coords);

        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
      },
    )
  }, [])

  //현재 위치로 주소설정
  const currentAddress = (location: ILocation) => {
    console.log("현재위치로 주소 설정", location);
    if (location) {
      axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${location.longitude}&y=${location.latitude}`,
        {
          headers: {
            Authorization: 'KakaoAK b49d403eab459f2dcb5d7b635c14139b',
          },
        },
      ).then((result) => {
        console.log("current", result.data.documents[0]);
        navigation.navigate('LocationVerify', { location: result.data.documents[0], gps: location })
      })
    }
  }

  const onPress = useCallback((e: { nativeEvent: { text: string; }; }) => {
    const { text } = e.nativeEvent;
    console.log(e.nativeEvent);
    console.log(typeof (text));
    console.log(text.length);

    if (text) {
      axios.get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${text}`,
        {
          headers: {
            Authorization: 'KakaoAK b49d403eab459f2dcb5d7b635c14139b',
          },
        },
      ).then((result) => {
        // console.log(result.data.documents);
        console.log("주소로 검색결과", result.data.documents);
        setLocationList(result.data.documents);
      })
    }


  }, [input]);

  // const onPress = useCallback((e: { nativeEvent: { text: string; }; }) => {
  //   const { text } = e.nativeEvent;
  //   console.log(e.nativeEvent);
  //   console.log(typeof (text));
  //   if (text) {
  //     axios.get(
  //       `https://dapi.kakao.com/v2/local/search/keyword.json?query=${text}`,
  //       {
  //         headers: {
  //           Authorization: 'KakaoAK b49d403eab459f2dcb5d7b635c14139b',
  //         },
  //       },
  //     ).then((result) => {
  //       console.log(result.data.documents);
  //       setLocationList(result.data.documents);
  //     })
  //   }


  // }, []);

  useEffect(() => {
    if (location)
      console.log("location", location);
    setIsActive(true)
    console.log("좌표로 주소검색 후 받은 결과 길이", locationList.length);

  }, [locationList, location])

  const renderItem = (item: ILocationList) => {
    return (
      <View style={LocationWrapper.RecommandContainer}>
        <Text>{item.address_name}</Text>
      </View>
    )
  }

  const getGps = (x: string, y: string) => {
    console.log("검색한 주소 위치", x, y);

    const SearchLocationGps: ILocation = { longitude: parseFloat(x), latitude: parseFloat(y) }

    setSearchedLocation(SearchLocationGps);
    // setSearchedLocation({
    //   longitude: parseInt(x),
    //   latitude: parseInt(y)
    // })

    axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${x}&y=${y}`,
      {
        headers: {
          Authorization: 'KakaoAK b49d403eab459f2dcb5d7b635c14139b',
        },
      },
    ).then((result) => {
      console.log("current", result.data.documents[0]);
      navigation.navigate('LocationVerify', { location: result.data.documents[0], gps: SearchLocationGps })
    })

  }
  return (
    <>
      <View style={LocationWrapper.MainContainer}>

        <View style={LocationWrapper.SearchContainer}>
          <Icon name='search-outline' size={20} color="black" />
          <TextInput
            multiline={false}
            // style={isActive ? LocationWrapper.textFocus : null}
            // onKeyPress={ }
            // clearTextOnFocus={true}
            // onPressIn={() => setIsActive(false)}
            // onBlur={() => setIsActive(false)}
            onSubmitEditing={onPress}
            placeholder="건물명, 도로명 또는 지번으로 검색"
          // onChangeText={value => onPress(value)} 
          />
        </View>
        <View style={LocationWrapper.CureernLocationContinaer}>
          <Icon name='compass-outline' size={20} color="#00C1DE" />
          <Text style={LocationWrapper.current} onPress={e => currentAddress(location)}>현재 위치로 설정</Text>
        </View>
      </View>
      <View style={LocationWrapper.Horizon}></View>
      {locationList.length > 0 ?
        // locationList.map((locationList: ILocationList, index: number) =>
        //   <View key={index} style={LocationWrapper.RecommandContainer}>
        //     <Text style={LocationWrapper.RecommandSearch}>{locationList.address_name}</Text>
        //   </View>
        // )
        <FlatList
          data={locationList}
          renderItem={({ item }) =>
            <View style={LocationWrapper.RecommandContainer}>
              <Text onPress={() => getGps(item.x, item.y)}>{item.road_address_name}</Text>
            </View>
          }
          keyExtractor={(item: ILocationList) => item.id}
        // windowSize={2}
        />
        :
        <View style={LocationWrapper.RecommandContainer}>
          <Text style={LocationWrapper.RecommandSearch}>이렇게 검색해보세요🔎</Text>

          <View style={LocationWrapper.exampleWrapper}>
            <Text style={LocationWrapper.form}>도로명 + 건물번호</Text>
            <Text style={LocationWrapper.example}>ex. 서초로 38길 12</Text>

            <Text style={LocationWrapper.form}>지역명(동/리) + 번지</Text>
            <Text style={LocationWrapper.example}>ex. 서초로 1498-5</Text>

            <Text style={LocationWrapper.form}>지역명(동/리) + 건물명(아파트명)</Text>
            <Text style={LocationWrapper.example}>ex. 서초동 렛잇고빌딩</Text>
          </View>

        </View>
      }

    </>
  )
}

const LocationWrapper = StyleSheet.create({
  MainContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  SearchContainer: {
    width: 300,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 20
  },
  // textFocus: {
  //   // backgroundColor: 'black',
  //   borderColor: "black",
  // },
  CureernLocationContinaer: {
    paddingTop: 10,
    width: 300,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  current: {
    color: '#00C1DE',
    fontSize: 15,
    fontWeight: '700'
  },
  Horizon: {
    width: '100%',
    textAlign: 'center',
    borderBottomColor: 'green',
    // borderBottomWidth: 1,
    lineHeight: 1,
    margin: 10
  },
  RecommandContainer: {
    flex: 2,
    // height: 30,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 50,
    paddingLeft: 50,
    backgroundColor: 'white',
  },
  RecommandSearch: {
    color: '#000000',
    fontFamily: 'Urbanist',
    fontSize: 20,
    fontWeight: 'bold'
  },
  exampleWrapper: {
    paddingTop: 10,
    paddingLeft: 30,
    justifyContent: 'center',
    textAlign: 'center',
  },
  form: {
    color: '#000000',
    fontWeight: 'bold',
  },
  example: {
    color: '#00C1DE',
    fontWeight: 'bold',
    paddingBottom: 20
  }
})
export default LocationSearch;