import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const StyledTouchable = styled.TouchableOpacity`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
`

const StyledText = styled.Text`
  font-family: 'Avenir';
  font-size: 18px;
`

export default function Choice(props) {
  return (
    <StyledTouchable onPress={props.onPress} style={props.style}>
      <StyledText style={props.textStyle}>{props.name}</StyledText>
    </StyledTouchable>
  )
}