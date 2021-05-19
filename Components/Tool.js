import React from '../node_modules/react';
import styled from '../node_modules/styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StyledTouchable = styled.TouchableOpacity`
    background-color: #2a9d8f;
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

const StyledText = styled.Text`
  font-family: 'Avenir';
  font-size: 18px;
  color: #fff;
`

export default function Tool(props) {
  return (
    <StyledTouchable onPress={props.onPress} style={props.style}>
      <MaterialCommunityIcons name={props.name} color="white" size={35} />
    </StyledTouchable>
  )
}