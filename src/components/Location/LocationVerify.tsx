import React, { useEffect, useState } from "react"
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAccessToken, location } from "../../config/AxiosFunction";
import { initialKaKaoAddress, initialPostLocation, KaKaoAddress, PostLocation } from "../../models/locationInfo";

type LocationVerify = {
  navigation?: any;
  route: any;
}

const LocationVerify = ({ navigation, route }: LocationVerify) => {
  const [address, setAddress] = useState<KaKaoAddress>(initialKaKaoAddress);
  const [homeAlias, setHomeAlias] = useState<boolean>(false);
  const [companyAlias, setCompanyAlias] = useState<boolean>(false);

  const [data, setData] = useState<PostLocation>(initialPostLocation);

  useEffect(() => {
    if (route.params.location.road_address === null) {
      setAddress({
        ...address,
        location: {
          road_address: route.params.location.road_address,
          address: route.params.location.address
        },
        // address_name: route.params.location.address.address_name as string, 
        type: '지번명'
      })
    } else {
      setAddress({
        ...address,
        location: {
          road_address: route.params.location.road_address,
          address: route.params.location.address
        },
        type: '도로명'
      })
    }
  }, [])

  useEffect(() => {
    console.log("주소 확인", route.params?.location);
  }, [])

  const setAlias = (key: string) => {
    if (key === 'home' && address.type == '지번명') {
      setHomeAlias(true);
      setData({
        alias: 'HOME',
        isMarked: true,
        address: {
          regionAddress: address.location.address.address_name,
          roadAddress: address.location.address.address_name,
          locationName: address.location.address.address_name,
          depth1: address.location.address.region_1depth_name,
          depth2: address.location.address.region_2depth_name,
          depth3: address.location.address.region_3depth_name,
          detail: address.location.address.address_name,
          lng: route.params?.gps.longitude,
          lat: route.params?.gps.latitude
        }
      })
    } else if (key === 'home' && address.type == '도로명') {
      setHomeAlias(true);
      setData({
        alias: 'HOME',
        isMarked: true,
        address: {
          regionAddress: address.location.road_address.address_name,
          roadAddress: address.location.road_address.address_name,
          locationName: address.location.road_address.building_name,
          depth1: address.location.road_address.region_1depth_name,
          depth2: address.location.road_address.region_2depth_name,
          depth3: address.location.road_address.region_3depth_name,
          detail: address.location.road_address.address_name,
          lng: route.params?.gps.longitude,
          lat: route.params?.gps.latitude
        }
      })
    }

    if (key === 'company' && address.type == '지번명') {
      setCompanyAlias(true);
      setData({
        alias: 'COMPANY',
        isMarked: true,
        address: {
          regionAddress: address.location.address.address_name,
          roadAddress: address.location.road_address.address_name,
          locationName: address.location.address.address_name,
          depth1: address.location.address.region_1depth_name,
          depth2: address.location.address.region_2depth_name,
          depth3: address.location.address.region_3depth_name,
          detail: address.location.address.address_name,
          lng: route.params?.gps.longitude,
          lat: route.params?.gps.latitude
        }
      })
    } else if (key === 'company' && address.type == '도로명') {
      setCompanyAlias(true);
      setData({
        alias: 'COMPANY',
        isMarked: true,
        address: {
          regionAddress: address.location.road_address.address_name,
          roadAddress: address.location.road_address.address_name,
          locationName: address.location.road_address.building_name,
          depth1: address.location.road_address.region_1depth_name,
          depth2: address.location.road_address.region_2depth_name,
          depth3: address.location.road_address.region_3depth_name,
          detail: address.location.road_address.address_name,
          lng: route.params?.gps.longitude,
          lat: route.params?.gps.latitude
        }
      })
    }
  }

  const setLocation = () => {
    if (address.type == '도로명') {
      return address.location.road_address.address_name;
    } else {
      return address.location.address.address_name;
    }
  }

  const saveLocation = async () => {
    console.log(data);
    const accessToken = await getAccessToken('accessToken');
    const response = await location(data, accessToken);
    console.log(response.data);
    try {
      Alert.alert("위치 저장 성공")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <View style={LocationVerifyWrapper.MainContainer}>
        <View style={LocationVerifyWrapper.PlaceContainer}>
          <Text style={LocationVerifyWrapper.TypeText}>{address.type}</Text>
          <Text style={LocationVerifyWrapper.LocationText}>{setLocation()}</Text>
        </View>
        <View style={LocationVerifyWrapper.AliasContainer}>
          <TouchableOpacity style={{
            backgroundColor: homeAlias === true ? '#87CEEB' : 'white',
            width: 100,
            height: 80,
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
            marginRight: 50
          }} onPress={e => setAlias('home')}>
            <Icon name='greenhouse' size={30} color="black" />
            <Text style={LocationVerifyWrapper.alias}> 우리집</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: companyAlias === true ? '#87CEEB' : 'white',
            width: 100,
            height: 80,
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderRadius: 10,
            borderColor: 'black',
            borderWidth: 1,
          }} onPress={e => setAlias('company')}>
            <Icon name='office-building-outline' size={30} color="black" />
            <Text style={LocationVerifyWrapper.alias}> 회사 </Text>
          </TouchableOpacity>
        </View>
        <View style={LocationVerifyWrapper.buttonView}>
          <TouchableOpacity style={LocationVerifyWrapper.button} onPress={saveLocation}>
            <Text style={LocationVerifyWrapper.title} > 위치설정 하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const LocationVerifyWrapper = StyleSheet.create({
  MainContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  PlaceContainer: {
    flex: 1,
    paddingTop: 50,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  TypeText: {
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 60,
    paddingTop: 5,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold'
  },
  LocationText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    // paddingBottom: 20,
  },
  AliasContainer: {
    flex: 4,
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,

  },
  home: {
    width: 100,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 50
  },
  school: {
    width: 100,
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  alias: {
    color: 'black',
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 10
  },
  buttonView: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#3E3E3E',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: 'white',
    fontSize: 20
  },
})
export default LocationVerify;