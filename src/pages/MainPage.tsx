import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { activeLocation, getAccessToken, getStoreList } from "../config/AxiosFunction";
import Icon from 'react-native-vector-icons/Ionicons';

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

type Store = {
  postId: number;
  postTitle: string;
  cookTimeAvg: number;
  storeName: string;
  storeProfile: string;
  storeStar: string;
  town: string;
  distance: number;
}
type MainPageProps = {
  navigation?: any
}

const MainPage = (navigation: MainPageProps) => {
  const [myLocation, setMyLocation] = useState<MyLocation>();
  const menuList = ['전체', '한식', '중식', '일식', '분식'];
  const [choose, setChoose] = useState<string>('');

  const [storeList, setStoreList] = useState<Store[]>([]);

  const getLocation = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await activeLocation(accessToken);
    console.log(response.data);
    setMyLocation(response.data);
  }
  const getList = async () => {
    const accessToken = await getAccessToken('accessToken');
    const response = await getStoreList(accessToken);
    console.log(response.data.content);
    setStoreList(response.data.content)
  }

  useEffect(() => {
    console.log(menuList);
    console.log(choose);

    getList()
    getLocation()
  }, [])

  const goDetail = (id: number) => {
    console.log(id);
    // navigation.navigation.navigate('DetailPage')
  }

  const setMenu = (e: string) => {
    console.log(e);
    setChoose(e)
  }
  const goLocationSetting = () => {
    navigation.navigation.navigate('LocationSetting')
  }
  return (
    <ScrollView style={MainWrapper.MainContainer}>
      <View style={MainWrapper.HeadeWrapper}>
        <View style={{ flexDirection: 'row' }} >
          <Text style={MainWrapper.location} onPressIn={navigation.navigation.navigate('LocationSetting')}>{myLocation?.address.roadAddress}</Text>
          <Icon name='caret-down-outline' size={25} color="black" style={{ paddingRight: 80 }} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Icon name='search-outline' size={25} color="black" />
          <Icon name='notifications-outline' size={25} color="black" />
        </View>
      </View>
      <View style={MainWrapper.BannerWrapper}>
        <Image source={require('../assets/banner.png')} ></Image>
      </View>
      <View style={MainWrapper.Horizon}></View>
      <View style={MainWrapper.TagWrapper}>
        {menuList?.map((menu: string, index: number) =>
          <TouchableOpacity
            key={index}
            style={{
              width: 70,
              height: 30,
              backgroundColor: choose === menu ? '#00C1DE' : '#E8E8E8',
              // backgroundColor: 'rgba(27, 147, 234, 0.93)',
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 3
            }}
            onPress={e => setMenu(menu)}
          >
            <Text style={MainWrapper.menutext}>{menu}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={MainWrapper.ListHeaderWrapper}>
        <Text style={MainWrapper.header}>우리동네 포장맛집 🍽</Text>
        <View style={{ flexDirection: 'row', paddingTop: 10, }}>
          <Text style={MainWrapper.filter}>거리순</Text>
          <Icon name="git-compare-outline" size={20} />
        </View>
        {/* <Image source={require('../assets/filter.png')}></Image> */}
      </View>
      <View style={MainWrapper.ListWrapper}>
        <ScrollView>
          {storeList.map((store: Store, index: number) => {
            return (
              <TouchableOpacity key={index}
                onPress={() => goDetail(store.postId)}
                style={{
                  flexDirection: 'row',
                  borderWidth: 2,
                  borderRadius: 20,
                  // borderBottomColor: 'rgba(0, 0, 0, 0.12)',
                  marginBottom: 10,
                  width: 360,
                  height: 160,
                  borderColor: 'rgba(0, 0, 0, 0.05)',
                  paddingLeft: 10,
                  paddingTop: 15,
                  shadowColor: '#52006A',
                  backgroundColor: 'white',
                  elevation: 5,
                }}>
                <Image
                  source={{ uri: store.storeProfile }}
                  style={{
                    borderRadius: 20,
                    width: 120, height: 120
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    paddingLeft: 15,
                  }}>
                  <Text style={{
                    width: 190,
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: 'black'
                  }}>{store.postTitle}</Text>
                  <Text style={{
                    color: 'black',
                    marginBottom: 10,
                  }}>평균 조리시간 {store.cookTimeAvg}분</Text>
                  <Text style={{
                    fontWeight: '400',
                    marginBottom: 10,
                  }}>{store.town} {store.distance}m</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ marginRight: 10, color: 'black' }}>{store.storeName}</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Icon style={{ justifyContent: 'center', alignItems: 'center' }} name="star" color={"#00C1DE"} size={18} />
                        <Text style={{ fontSize: 15, }}>{store.storeStar}</Text>
                      </View>
                    </View>
                    {/* <Icon name="bookmark-outline" size={18} /> */}
                  </View>

                </View>

              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View >
    </ScrollView >
  )
}
const MainWrapper = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 15,
    // paddingRight: 10
  },
  HeadeWrapper: {
    width: 350,
    paddingTop: 50,
    flex: 2,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  location: {
    fontSize: 15,
    color: 'black'
  },
  BannerWrapper: {
    paddingTop: 30,
    flex: 4,
  },
  Horizon: {
    width: '100%',
    textAlign: 'center',
    borderBottomColor: 'green',
    // borderBottomWidth: 1,
    lineHeight: 1,
    margin: 10
  },
  TagWrapper: {
    paddingTop: 30,
    flex: 1,
    flexDirection: "row",
  },
  menutag: {
    width: 70,
    height: 30,
    backgroundColor: '#E8E8E8',
    // backgroundColor: 'rgba(27, 147, 234, 0.93)',
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 3
  },
  menutext: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15
  },
  ListHeaderWrapper: {
    width: 350,
    paddingTop: 30,
    flex: 4,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  header: {
    color: 'black',
    fontSize: 22,
    fontWeight: '800',
  },
  filter: {
    color: 'black'
  },
  ListWrapper: {
    paddingTop: 10,
    flex: 4,
  }
})
export default MainPage;