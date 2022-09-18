import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DeviceInfo from 'react-native-device-info';
import { Device } from "../models/deviceInfo";

const Home = ({ navigation }: { navigation: any }) => {

    const [deviceInfo, setDeviceInfo] = useState<Device>({
        deviceToken: '',
        deviceType: '',
        isNotificationAgreement: false,
        isAdAgreement: false,
        isNightAdAgreement: false,
    });

    const settingDeviceInfo = () => {
        // try {
        //   deviceInfo.deviceToken = DeviceInfo.getDeviceId()
        // } catch (e) {
        //   console.log(
        //     'Unable to get device token.Either simulator or not iOS11 + ',
        //   );
        // }

        setDeviceInfo({
            deviceToken: DeviceInfo.getDeviceId(),
            deviceType: DeviceInfo.getSystemName() === 'Android' ? 'GCM' : 'APNS',
            isNotificationAgreement: true,
            isAdAgreement: false,
            isNightAdAgreement: false,
        })
    };
    // useEffect(() => {

    // }, [])

    useEffect(() => {
        settingDeviceInfo();
    }, [])

    const goSignUp = () => {
        // DeviceToken이 어떤값인지 조사해볼것
        console.log("기기 IMEI:", deviceInfo.deviceToken);
        console.log("기기 TYPE:", deviceInfo.deviceType);
        navigation.navigate('SignUpAgree', { deviceInfo: deviceInfo });
    }

    return (
        <>
            <View style={homeWrapper.MainContainer}>
                {/* <Image source={require('../assets/main.png')}
                style={{ width: 100, height: 100 }}></Image> */}
                <Text style={homeWrapper.mainTitle}>지금은 음식 포장하러 가는 중</Text>
                <Image source={require('../assets/title.png')}
                    style={homeWrapper.headerTitle} />
                <ImageBackground source={require('../assets/background.png')}
                    style={homeWrapper.background} />
                <View style={homeWrapper.buttonView}>
                    <TouchableOpacity style={homeWrapper.button}>
                        <Text style={homeWrapper.title} onPress={goSignUp}>포장하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={homeWrapper.confirmContainer}>
                <Text style={homeWrapper.login}>이미 계정이 있나요?</Text>
                <Text style={homeWrapper.login} onPress={() => navigation.navigate('SignIn')}>로그인</Text>
            </View>
        </>

    )
}
const homeWrapper = StyleSheet.create({
    MainContainer: {
        flex: 8.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    mainTitle: {
        paddingTop: 100,
        paddingBottom: 10,
        fontWeight: '700',
        fontSize: 24
    },
    headerTitle: {
        margin: 15,
        width: '50%'
    },
    background: {
        width: '100%',
        height: '70%'
    },
    buttonView: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50
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
    confirmContainer: {
        display: 'flex',
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00C1DE',
    },
    login: {
        paddingBottom: 50,
        paddingLeft: 10,
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 15
    }
})
export default Home;
