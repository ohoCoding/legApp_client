import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authpohe } from "../../config/AxiosFunction";

const SignUpPhone = () => {
  const [input, setInput] = useState<string>('');
  const [buttonReady, setButtonReady] = useState<boolean>(false);
  const [authCode, setAuthCode] = useState<string>('');
  const [verfify, setVerify] = useState<string>('');

  const ButtonChange = (text: string) => {
    setInput(text);
    if (text.length < 11) {
      setButtonReady(false)
    } else if (text.length === 11) {
      setButtonReady(true);
    }
  }

  const getPhone = async () => {
    const response = await authpohe(input);
    console.log(response.data);
    setAuthCode(response.data.authCode);
  }

  const ConfirmCode = () => {
    if (verfify === authCode) {
      Alert.alert('인증완료')
    }
  }
  const InputVerify = (number: string) => {
    setVerify(number);
  }
  return (
    <View style={PhoneWrapper.MainContainer}>
      <View style={PhoneWrapper.WarnContainer}>
        <Text style={PhoneWrapper.PhoneTitle}>
          휴대폰 번호는 안전하게 보관되어 노출의 위험이 전혀 없습니다.
        </Text>
      </View>
      <View style={PhoneWrapper.VerifyContainer}>
        <TextInput style={PhoneWrapper.PhoneNumberInput}
          placeholder=" - 없이 숫자만 입력"
          keyboardType={"number-pad"}
          maxLength={11}
          dataDetectorTypes="phoneNumber"
          onChangeText={value => ButtonChange(value)}
        />
        <View
          style={{
            backgroundColor: buttonReady === true ? '#2da6cf' : 'lightgray',
            marginLeft: 20,
            marginTop: 25,
            borderRadius: 8,
            width: 120,
            height: 50,
          }}>
          <TouchableOpacity
            style={PhoneWrapper.ButtonView}
            disabled={!buttonReady}
            onPress={getPhone}>
            <Text style={PhoneWrapper.ButtonText}>인증번호 받기</Text>
          </TouchableOpacity>
        </View>
      </View>
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


    </View>
  )
}
const PhoneWrapper = StyleSheet.create({
  MainContainer: {
    backgroundColor: 'white',
    flex: 1,
    display: "flex",
    // flexDirection: 'column',
  },
  WarnContainer: {
    alignItems: 'center',
  },
  VerifyContainer: {
    marginLeft: 50,
    flexDirection: 'row'
  },
  PhoneTitle: {
    width: 200,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginBottom: 20
  },
  PhoneNumberInput: {
    marginTop: 25,
    width: 170,
    height: 50,
    fontSize: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
  },
  ButtonView: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  CodeContainer: {
    marginLeft: 50,
    flexDirection: 'row'
  },
  authCode: {
    marginTop: 30,
    width: 170,
    height: 50,
    fontSize: 15,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
  },
  ConfirmView: {
    backgroundColor: '#2da6cf',
    marginLeft: 20,
    marginTop: 25,
    borderRadius: 8,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ConfirmText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  }
})
export default SignUpPhone;