import axios from 'axios';
import {Device} from '../models/deviceInfo';

const hosturi = 'http://0giri.com/api';

export const authphone = async (phone: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/auth/phone',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const existphone = async (phone: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/users/phone/check',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const checkname = async (nickname: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/users/nickname/check',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        nickname: nickname,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

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
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const changeuser = async (
  deviveType: string,
  deviveToken: string,
  phone: string,
) => {
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
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const register = async (
  phone: string,
  nickname: string,
  deviceInfo: Device,
) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/users',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
        nickname: nickname,
        device: deviceInfo,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const login = async (phone: string, deviceToken: string) => {
  try {
    const result = await axios({
      method: 'post',
      url: hosturi + '/auth/login/user',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      data: {
        phone: phone,
        deviceToken: deviceToken,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const noticeDetail = async (noticeId: number) => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/notices/',
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      params: {
        noticeId: noticeId,
      },
    });
    return result;
  } catch (err) {
    throw err;
  }
};

export const noticeList = async () => {
  try {
    const result = await axios({
      method: 'get',
      url: hosturi + '/notices',
      headers: {
        Authorization:
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJsZWciLCJpYXQiOjE2NjU0OTE5NjQsInN1YiI6IjEiLCJ0b2tlblR5cGUiOnRydWUsImFjY291bnRUeXBlIjoiVVNFUiIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifV19.-ubh1wk5XWTSgDrIiBCm69S1jEwY0Gtb5Mv5Bqz8_NQel56XmUiPejUOeAwmg6OuvxKK8YOW3duHjzDKunqaSw',
      },
      // header: await AsyncStorage.getItem('session'), JWT 토큰 헤더에 담는 방법
      // data: {
      //   phone: phone,
      // },
    });
    return result;
  } catch (err) {
    throw err;
  }
};
