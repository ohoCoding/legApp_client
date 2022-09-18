import axios from "axios";
import { Device } from "../models/deviceInfo";

const hosturi = 'http://0giri.com/api';

export const authphone = async (phone: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/auth/phone',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone
      },
    })
    return result;
  } catch (err) {
    throw err;
  }
}

export const existphone = async (phone: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/users/phone/check',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone
      },
    })
    return result;
  } catch (err) {
    throw err;
  }
}

export const checkname = async (nickname: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/users/nickname/check',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        nickname: nickname,
      },
    })
    return result;
  } catch (err) {
    throw err;
  }
}

export const checkuser = async (nickname: string, phone: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/auth/nickname',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        nickname: nickname,
        phone: phone,
      },
    })
    return result;
  } catch (err) {
    throw err;
  }
}

export const changeuser = async (deviveType: string, deviveToken: string, phone: string) => {
  try {
    const result = await axios({
      method: 'patch',
      url: hosturi + '/users/device',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
        deviveType: deviveType,
        deviveToken: deviveToken,
      },
    })
    return result;
  } catch (err) {
    throw err;
  }
}

export const register = async (phone: string, nickname: string, deviceInfo: Device) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/users',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
        nickname: nickname,
        device: deviceInfo
      },
    })
    return result;
  } catch (err) {
    throw err;
  }
}

export const login = async (phone: string, deviceToken: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/auth/login/user',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
        deviceToken: deviceToken
      },
    })
    return result;
  } catch (err) {
    throw err;
  }
}