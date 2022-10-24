import React, { useEffect, useState } from "react"
import { Modal, Text, View, Dimensions, TouchableWithoutFeedback } from "react-native";
type BottomPopupProps = {
  open: boolean;
  close: any;
  header: string;
  onTouchOutSide: any;
}

const BottomPopup = (props: BottomPopupProps) => {
  const { open, close, header, onTouchOutSide } = props;
  const [isShow, setIsShow] = useState<boolean>(false);
  const deviceHeight = Dimensions.get("window").height;

  const outsideTouchable = (onTouchOutSide: any) => {
    const view = <View style={{ flex: 1, width: '100%' }} />
    if (!onTouchOutSide)
      return view
    else {
      return (
        <TouchableWithoutFeedback onPress={onTouchOutSide}
          style={{ flex: 1, width: '100%' }}>
          {view}
        </TouchableWithoutFeedback>
      )
    }
  }
  const renderTitle = () => {
    return (
      <View>
        <Text style={{
          color: '#00C1DE',
          fontSize: 20,
          fontWeight: 'bold',
          width: '100%'
        }}>
          {header}
        </Text>
      </View>
    )
  }
  useEffect(() => {
    if (open) {
      setIsShow(true)
    } else if (close) {
      setIsShow(false)
    }
  })

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={isShow}
      onRequestClose={close}
    >
      <View style={{
        flex: 1,
        backgroundColor: '#000000AA',
        justifyContent: 'flex-end'
      }}
      >
        {outsideTouchable(onTouchOutSide)}
        <View style={{
          backgroundColor: '#FFFFFF',
          width: '100%',
          height: '100%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingHorizontal: 120,
          paddingVertical: 80,
          maxHeight: deviceHeight * 0.3
        }}>
          {renderTitle()}
        </View>
      </View>
    </Modal>
  )
}
export default BottomPopup;