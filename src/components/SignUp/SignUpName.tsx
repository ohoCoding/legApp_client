import React, { useCallback, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authphone, checkname, existphone, register } from "../../config/AxiosFunction";
import DeviceInfo from 'react-native-device-info';
import { Device, initialDevice } from "../../models/deviceInfo";

type SignUpName = {
  navigation?: any,
  route: any
}

const SignUpName = ({ navigation, route }: SignUpName) => {
  const [phone, setPhone] = useState<string>('');
  const [buttonReady, setButtonReady] = useState<boolean>(false);

  const [authCode, setAuthCode] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [deviceInfo, setDeviceInfo] = useState<Device>(initialDevice);
  const [isCheck, setIsCheck] = useState<boolean>(false);
  // async function Verify(phone: string) {
  //   console.log(phone);
  //   const response = await authphone(phone);
  //   console.log(response.data);
  //   setAuthCode(response.data.authCode);
  // }

  const settingDeviceInfo = async () => {
    try {
      deviceInfo.deviceToken = DeviceInfo.getDeviceId()
    } catch (e) {
      console.log(
        'Unable to get device token.Either simulator or not iOS11 + ',
      );
    }

    setDeviceInfo({
      ...deviceInfo,
      deviceType: DeviceInfo.getSystemName() === 'Android' ? 'GCM' : 'APNS',
      isNotificationAgreement: true,
      isAdAgreement: false,
      isNightAdAgreement: false,
    })
  }


  useEffect(() => {
    setPhone(route.params?.phone);
    setDeviceInfo(route.params?.deviceInfo);
    console.log("전달받은 폰번호:", route.params?.phone);
    // DeviceToken이 어떤값인지 조사해볼것
    console.log("기기 IMEI:", deviceInfo.deviceToken);
    console.log("기기 TYPE:", deviceInfo.deviceType);
    // Verify(route.params?.phone)
  }, [])
  // const ButtonChange = (text: string) => {
  //   setInput(text);
  //   if (text.length < 11) {
  //     setButtonReady(false)
  //   } else if (text.length === 11) {
  //     setButtonReady(true);
  //   }
  // }

  // const getPhone = async () => {
  //   const response = await authpohe(input);
  //   console.log(response.data);
  //   setAuthCode(response.data.authCode);
  // }

  const Register = async () => {
    console.log("phone ", phone);
    console.log("nickname", nickname);
    console.log("deviceInfo ", deviceInfo);
    const response = await register(phone, nickname, deviceInfo);
    console.log(response.data);
    if (response.status === 200) {
      Alert.alert('회원가입을 완료했습니다!');
    }

  }
  const CheckNickName = async () => {
    const response = await checkname(nickname);
    console.log(response.data);
    if (response.data == true) {
      Alert.alert('사용가능합니다.');
      setIsCheck(true)
      // navigation.navigate('SignUpAgree', { phone: input });
      // navigation.navigate('Home')
    } else {
      Alert.alert('다른 닉네임을 사용하시기 바랍니다.');
    }
  }
  const InputNickName = (name: string) => {
    setNickname(name);
  }
  return (
    <View style={PhoneWrapper.MainContainer}>
      <Image source={require('../../assets/title.png')}
        style={PhoneWrapper.headerTitle} />
      <View style={PhoneWrapper.WarnContainer}>
        <Text style={PhoneWrapper.PhoneTitle}>
          닉네임을 설정해주세요 :)
        </Text>
        <Text style={PhoneWrapper.SubPhoneTitle}>
          사장님과 소통할 내 닉네임은?
        </Text>
      </View>
      {/* <View style={PhoneWrapper.VerifyContainer}>
        <TextInput style={PhoneWrapper.PhoneNumberInput}
          placeholder=" - 없이 숫자만 입력"
          keyboardType={"number-pad"}
          maxLength={11}
          dataDetectorTypes="phoneNumber"
          onChangeText={value => ButtonChange(value)}
        />
        <View
          style={{
            backgroundColor: buttonReady === true ? '#00C1DE' : 'lightgray',
            marginTop: 25,
            borderRadius: 8,
            width: 300,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <TouchableOpacity
            style={PhoneWrapper.ButtonView}
            disabled={!buttonReady}
            onPress={getPhone}>
            <Text style={PhoneWrapper.ButtonText}>인증번호 받기</Text>
          </TouchableOpacity>
        </View>
      </View> */}
      <View style={PhoneWrapper.CodeContainer}>
        <TextInput
          style={PhoneWrapper.authCode}
          // accessible={isCheck}
          keyboardType={"name-phone-pad"}
          onChangeText={value => InputNickName(value)}
          placeholder="닉네임을 입력해주세요.">
        </TextInput>
        <TouchableOpacity
          style={PhoneWrapper.ConfirmView}
          onPress={CheckNickName}>
          <Text style={PhoneWrapper.ConfirmText}>중복확인</Text>
        </TouchableOpacity>

      </View>
      <View style={PhoneWrapper.RegisterContainer}>
        <TouchableOpacity style={PhoneWrapper.Register}
          onPress={Register}>
          <Text style={PhoneWrapper.ConfirmText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const PhoneWrapper = StyleSheet.create({
  MainContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  headerTitle: {
    maxHeight: 100,
    marginTop: 100,
    width: '50%',
  },
  WarnContainer: {
    marginTop: 20,
    // display: 'flex',
    // flex: 1,
    alignItems: 'center',
  },
  PhoneTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
  },
  SubPhoneTitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#B1B1B1'
  },
  CodeContainer: {
    display: 'flex',
    flex: 1,
    marginTop: 50,
    flexDirection: 'row',
  },
  authCode: {
    width: 180,
    height: 50,
    fontSize: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
  },
  ConfirmView: {
    backgroundColor: '#00C1DE',
    marginLeft: 20,
    borderRadius: 8,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  RegisterContainer: {
    display: 'flex',
    flex: 5,
    alignItems: 'center',
  },
  Register: {
    backgroundColor: '#00C1DE',
    marginTop: 25,
    width: 300,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ConfirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
})
export default SignUpName;