import React, { useEffect, useState } from "react";
import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authphone, existphone, login } from "../../config/AxiosFunction";
import { Device } from "../../models/deviceInfo";


type SignUpVerify = {
  navigation?: any,
  route: any
}
const SignUpVerify = ({ navigation, route }: SignUpVerify) => {
  // const [phone, setPhone] = useState<string>('');
  const [buttonReady, setButtonReady] = useState<boolean>(false);
  const [authCode, setAuthCode] = useState<string>('');
  const [verfify, setVerify] = useState<string>('');
  const [deviceInfo, setDeviceInfo] = useState<Device>({
    deviceToken: '',
    deviceType: '',
    isNotificationAgreement: false,
    isAdAgreement: false,
    isNightAdAgreement: false,
  });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [alert, alertSet] = useState<boolean>(true);

  async function Verify(phone: string) {
    console.log(phone);
    const response = await authphone(phone);
    console.log(response.data);
    setAuthCode(response.data.authCode);
  }

  const settingDeviceInfo = () => {
    setDeviceInfo(route.params?.deviceInfo)
  }

  useEffect(() => {
    Verify(route.params?.phone);
    settingDeviceInfo()
    // setDeviceInfo({
    //   ...deviceInfo,
    //   deviceToken: deviceInfo.deviceToken + '1'
    // })
  }, [])

  useEffect(() => {
    // DeviceToken이 어떤값인지 조사해볼것
    console.log("기기 IMEI:", deviceInfo.deviceToken);
    console.log("기기 TYPE:", deviceInfo.deviceType);
  }, [deviceInfo])


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

  const ConfirmCode = async () => {
    if (verfify === authCode) {
      const response = await existphone(route.params?.phone);
      console.log(response.data);

      if (response.data == false) {
        navigation.navigate('SignUpName', { phone: route.params?.phone, deviceInfo: deviceInfo })

      } else {
        setTimeout(() => {
          alertSet(false)
        }, 2000)
        console.log("번호", route.params?.phone);
        console.log("IMEI", deviceInfo.deviceToken);
        try {
          const response = await login(route.params?.phone, deviceInfo.deviceToken)
          console.log(response.data);
          if (response.status === 200)
            navigation.navigate('Home')
        } catch {
          setModalVisible(true)
        }
      }
      // navigation.navigate('SignUpAgree', { phone: input });
      // navigation.navigate('SignUpAgree')
    }

  }
  const InputVerify = (number: string) => {
    setVerify(number);
  }

  const goCheckName = () => {
    navigation.navigate('CheckName', { phone: route.params?.phone })
  }
  return (
    <View style={PhoneWrapper.MainContainer}>
      <Image source={require('../../assets/title.png')}
        style={PhoneWrapper.headerTitle} />
      <View style={PhoneWrapper.WarnContainer}>
        <Text style={PhoneWrapper.PhoneTitle}>
          인증번호를 입력해주세요.
        </Text>
        <Text style={PhoneWrapper.SubPhoneTitle}>
          본인인증을 위해 필요합니다.
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
          keyboardType={"number-pad"}
          onChangeText={value => InputVerify(value)}
          placeholder="인증번호 입력해주세요">
        </TextInput>
        <TouchableOpacity
          style={PhoneWrapper.ConfirmView}
          onPress={ConfirmCode}>
          <Text style={PhoneWrapper.ConfirmText}>확인</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <View style={PhoneWrapper.ModalContainer}>
          <Image source={require('../../assets/title.png')}
            style={PhoneWrapper.headerTitle} />
          <Text style={PhoneWrapper.PhoneTitle}>
            이미 등록된 계정입니다.
          </Text>
          <Text style={PhoneWrapper.SubPhoneTitle}>선택해주세요</Text>

          <TouchableOpacity
            style={PhoneWrapper.ConfirmView}
            onPress={goCheckName}>
            <Text>제가 이 계정의 주인이에요</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={PhoneWrapper.ConfirmView}
            onPress={() => navigation.navigate('Home')}>
            <Text>제 계정이 아니에요</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    flex: 2,
    paddingTop: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
  authCode: {
    width: 300,
    height: 60,
    fontSize: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
  },
  ConfirmView: {
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
  },
  ModalContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
})
export default SignUpVerify;