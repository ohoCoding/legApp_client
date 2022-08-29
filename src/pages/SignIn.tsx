import React, { useState } from "react";
import { Alert, Button, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const SignIn = () => {
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
    return (
        <SafeAreaView style={SignInWrapper.Container}>
            <View style={SignInWrapper.TitleContainer}>
                <Text style={SignInWrapper.Title}>휴대폰 번호를 입력해주세요.</Text>
                <Text style={SignInWrapper.SubTitle}>본인 인증을 위해 필요합니다.</Text>
                <TextInput style={SignInWrapper.PhoneNumberInput}
                    keyboardType={"number-pad"}
                    maxLength={11}
                    dataDetectorTypes="phoneNumber"
                    onChangeText={value => ButtonChange(value)}
                />
                <View
                    style={{
                        backgroundColor: buttonReady === true ? '#2da6cf' : 'lightgray',
                        top: 20,
                        borderRadius: 8,
                        width: 150,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: 100
                    }}>
                    <TouchableOpacity
                        style={SignInWrapper.ButtonView}
                        disabled={!buttonReady}
                        onPress={() => Alert.alert('인증')}>
                        <Text style={SignInWrapper.ButtonText}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}

const SignInWrapper = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white'
    },
    TitleContainer: {
        flex: 1,
        marginTop: 120,
        marginLeft: 20,
        marginRight: 20,
    },
    Title: {
        fontSize: 20,
        fontWeight: '700',
    },
    SubTitle: {
        fontSize: 16,
        fontWeight: '400',
        paddingTop: 10,
        color: 'gray'
    },
    PhoneNumberInput: {
        height: 40,
        fontSize: 20,
        borderColor: 'lightgray',
        borderBottomWidth: 2,
    },
    ButtonView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonText: {
        textAlign: 'center',

    }
})

export default SignIn;