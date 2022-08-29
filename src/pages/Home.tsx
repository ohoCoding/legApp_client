import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = ({ navigation }: { navigation: any }) => {

    return (
        <View style={homeWrapper.MainContainer}>
            <Image source={require('../assets/main.png')}
                style={{ width: 100, height: 100 }}></Image>
            <Text style={homeWrapper.mainTitle}>당신근처의 포장</Text>
            <Text>시간설정 부터 바로 포장까지</Text>
            <Text>지금 내 근처에서 가게를 설정하고 음식을 받아보세요!</Text>
            <View style={homeWrapper.buttonView}>
                <TouchableOpacity style={homeWrapper.button}>
                    <Text style={homeWrapper.title} onPress={() => navigation.navigate('SignUp')}>포장하기</Text>
                </TouchableOpacity>
                <View style={homeWrapper.confirmView}>
                    <Text>이미 계정이 있나요?</Text>
                    <Text style={homeWrapper.login} onPress={() => navigation.navigate('SignIn')}>로그인</Text>
                </View>
            </View>

        </View>
    )
}
const homeWrapper = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    mainTitle: {
        paddingTop: 10,
        paddingBottom: 10,
        fontWeight: "bold"
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
        width: 200,
        height: 30,
        backgroundColor: '#2da6cf',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        color: 'white'
    },
    confirmView: {
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'row',
    },
    login: {
        paddingLeft: 10,
        color: "#2da6cf",
        fontWeight: "bold"
    }
})
export default Home;
