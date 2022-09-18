import React from "react";
import { Image, Text, View } from "react-native";

const Header = () => {
  return (
    <View style={{
      marginTop: 100,
      width: '50%',
      height: 30
    }}>
      <Image source={require('../assets/title.png')}
      />
    </View>
  )
}

export default Header;