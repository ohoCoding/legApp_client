import CheckBox from "@react-native-community/checkbox";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SignUpAgree = {
  navigation: any;
  route?: any;
}

const SignUpAgree = ({ navigation, route }: SignUpAgree) => {
  const [checkList, setCheckList] = useState<boolean[]>([]);
  const [allCheckBox, setAllCheckBox] = useState(false);
  const [infoCheckBox, setInfoCheckBox] = useState(false);
  const [eventCheckBox, setEventCheckBox] = useState(false);
  const checkAll = (e: ChangeEvent<HTMLInputElement>) => {
    // e.target.lib ? setCheckList([allCheckBox, infoCheckBox, eventCheckBox]) : setCheckList([]);
  }
  const check = (e: ChangeEvent<HTMLInputElement>) => {
    // e.target ? setCheckList([...checkList, e.target]) : setCheckList(checkList.filter((choice) => choice !== e.target));
  }
  useEffect(() => {
    console.log(route.params?.deviceInfo);

  })
  const goSignUpPhone = () => {
    navigation.navigate('SignUpPhone', { deviceInfo: route.params?.deviceInfo })
  }

  return (
    <View style={AgreeWrapper.MainContainer}>
      <Image source={require('../../assets/title.png')}
        style={AgreeWrapper.headerTitle} />
      <View style={AgreeWrapper.AgreeContainter}>
        <Text style={AgreeWrapper.AgreeTitle}>
          이용 약관에 동의해주세요.
        </Text>
        <View style={AgreeWrapper.AgreeBox}>
          <CheckBox
            nativeID="all"
            style={AgreeWrapper.checkBox}
            disabled={false}
            onValueChange={setAllCheckBox}
            value={allCheckBox}
            onChange={checkAll} />
          <Text style={AgreeWrapper.checkText}> 전체 동의</Text>
        </View>
        <View style={AgreeWrapper.AgreeBox}>
          <CheckBox
            style={AgreeWrapper.checkBox}
            disabled={false}
            onValueChange={setInfoCheckBox}
            value={infoCheckBox}
            onChange={check} />
          <Text style={AgreeWrapper.checkText}> [필수] 개인정보 수집 및 이용 동의</Text>
        </View>
        <View style={AgreeWrapper.AgreeBox}>
          <CheckBox
            style={AgreeWrapper.checkBox}
            disabled={false}
            onValueChange={setEventCheckBox}
            value={eventCheckBox}
            onChange={check} />
          <Text style={AgreeWrapper.checkText}> [선택] 이벤트 정보 수신 동의</Text>
        </View>
        <TouchableOpacity style={AgreeWrapper.button}>
          <Text style={AgreeWrapper.verify} onPress={goSignUpPhone}>인증하기</Text>
        </TouchableOpacity>
      </View>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={AgreeWrapper.phoneBox}>
          <Text style={AgreeWrapper.phone}>휴대폰 번호</Text>
          <TextInput
            value={route.params?.phone}
            keyboardType={'default'}
            onKeyPress={Keyboard.dismiss}
            placeholder="휴대전화 인증후 자동기입됩니다" style={AgreeWrapper.PhoneNumberInput}></TextInput>
        </View>
      </TouchableWithoutFeedback> */}
    </View>

  )
}
const AgreeWrapper = StyleSheet.create({
  MainContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headerTitle: {
    marginTop: 100,
    width: '50%',
  },
  AgreeContainter: {
    marginTop: 20,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
  },
  AgreeTitle: {
    fontWeight: '700',
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20
  },
  AgreeBox: {
    width: 300,
    height: 50,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'lightgray',
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  },
  checkBox: {
    margin: 5,
  },
  checkText: {
    fontSize: 15,
    fontWeight: '700'
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#00C1DE',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  verify: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  phoneBox: {
    marginTop: 100,
    marginLeft: 30,
    flex: 2,
  },
  phone: {
    color: 'black'
  },
  PhoneNumberInput: {
    width: 280,
    height: 50,
    fontSize: 20,
    borderColor: 'lightgray',
    borderBottomWidth: 1,
    borderRadius: 10,
  },
})
export default SignUpAgree;