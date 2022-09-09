import axios from "axios";

const hosturi = 'http://0giri.com/api';

export const authpohe = async (phone: string) => {
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