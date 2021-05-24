import React from '../node_modules/react';
import styled from '../node_modules/styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../styles/Colors';

const StyledTouchable = styled.TouchableOpacity`
    align-items: center;
    width: 65px;
    justify-content: center;
    border-radius: 50px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 15px;
    margin-right: 15px;
`

export default function Tool(props) {
  const color = Colors()

  return (
    <StyledTouchable onPress={props.onPress} style={{backgroundColor: color.primaryColor}}>
      <MaterialCommunityIcons name={props.name} color="white" size={35} />
    </StyledTouchable>
  )
}