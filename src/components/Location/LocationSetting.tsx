import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import axios from "axios";
import { getAccessToken, mylocation } from "../../config/AxiosFunction";
import BottomPopup from "../BottomPopUp";

interface ILocation {
  latitude: number;
  longitude: number;
}

type LocationSetting = {
  navigation?: any;
  route: any;
}

type MyLocation = {
  locationId: number;
  userId: number;
  alias: string;
  isActive: boolean;
  address: {
    regionAddress: string;
    roadAddress: string;
    locationName: string;
    depth1: string;
    depth2: string;
    depth3: string;
    detail: string;
    lng: number;
    lat: number;
  }
};

const LocationSetting = ({ navigation, route }: LocationSetting) => {
  const [location, setLocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0
  });
  const [myLocationList, setMyLocationList] = useState<MyLocation[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const MyLocationSetting = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await mylocation(accessToken);
    console.log(response.data);
    setMyLocationList(response.data);

  }

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
    MyLocationSetting();
  }, [])

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  useEffect(() => {
    if (route.params?.registSucess) {
      openModal()
    }
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

  return (
    <>
      <View style={LocationWrapper.MainContainer}>

        <View style={LocationWrapper.SearchContainer}>
          <Icon name='search-outline' size={20} color="black" />
          <TextInput
            onPressIn={() => navigation.navigate('LocationSearch')}
            // onKeyPress={() => navigation.navigate('LocationSearch')}
            placeholder="건물명, 도로명 또는 지번으로 검색" />
        </View>
        <View style={LocationWrapper.CureernLocationContinaer}>
          <Icon name='compass-outline' size={20} color="#00C1DE" />
          <Text style={LocationWrapper.current} onPress={e => currentAddress(location)}>현재 위치로 설정</Text>
        </View>
      </View>
      <View style={LocationWrapper.Horizon}></View>
      {myLocationList.length > 0 ?
        myLocationList.map((myLocation: MyLocation, index: number) =>
          <View key={index} style={LocationWrapper.RecommandContainer}>
            <Text>{myLocation.address.roadAddress}</Text>
            <Text>{myLocation.address.regionAddress}</Text>
          </View>
        )
        :
        <View style={LocationWrapper.RecommandContainer}>
          <Text style={LocationWrapper.RecommandSearch}>아직 설정한 장소가 없습니다!</Text>
        </View>
      }
      <BottomPopup
        open={modalOpen}
        close={closeModal}
        header={"회원가입 완료!"}
        onTouchOutSide={closeModal}
      />
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
    flex: 7,
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
export default LocationSetting;