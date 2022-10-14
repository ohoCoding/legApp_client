import React, { useState } from "react";
import { Alert, Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type SignInPhone = {
    navigation: any;
}
const SignInPhone = ({ navigation }: SignInPhone) => {
    const [input, setInput] = useState<string>();
    const [buttonReady, setButtonReady] = useState<boolean>(false);

    const ButtonChange = (text: string) => {
        setInput(text);
        if (text.length < 11) {
            setButtonReady(false)
        } else if (text.length === 11) {
            setButtonReady(true);
        }
    }
    const getPhone = async () => {
        // const response = await authphone(input);
        // console.log(response.data);
        // setAuthCode(response.data.authCode);
        navigation.navigate('SignInVerify', { phone: input })
    }
    return (
        <View style={SignInWrapper.Container}>
            <View style={SignInWrapper.TitleContainer}>
                <Text style={SignInWrapper.Title}>
                    휴대폰 번호를 입력해주세요.
                </Text>
                <Text style={SignInWrapper.SubTitle}>
                    본인 인증을 위해 필요합니다.
                </Text>
            </View>
            <View style={SignInWrapper.VerifyContainer}>
                <TextInput style={SignInWrapper.PhoneNumberInput}
                    placeholder=" - 없이 숫자만 입력"
                    keyboardType={"number-pad"}
                    maxLength={11}
                    dataDetectorTypes="phoneNumber"
                    onChangeText={value => ButtonChange(value)}
                />
                <View
                    style={{
                        backgroundColor: buttonReady === true ? '#2da6cf' : 'lightgray',
                        marginTop: 25,
                        borderRadius: 8,
                        width: 300,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <TouchableOpacity
                        style={SignInWrapper.ButtonView}
                        disabled={!buttonReady}
                        onPress={getPhone}>
                        <Text style={SignInWrapper.ButtonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const SignInWrapper = StyleSheet.create({
    Container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    TitleContainer: {
        marginTop: 20,
        // display: 'flex',
        // flex: 1,
        alignItems: 'center',
    },
    Title: {
        fontSize: 20,
        fontWeight: '700',
        color: 'black',
        marginTop: 20,
        marginBottom: 20,
    },
    SubTitle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#B1B1B1'
    },
    VerifyContainer: {
        display: 'flex',
        flex: 2,
        paddingTop: 30,
        flexDirection: 'column',
        alignItems: 'center',
    },
    PhoneNumberInput: {
        width: 300,
        height: 60,
        fontSize: 15,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 10,
    },
    ButtonView: {
        padding: 10,
    },
    ButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    }
})

export default SignInPhone;