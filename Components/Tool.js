import React from '../node_modules/react';
import styled from '../node_modules/styled-components/native';

const StyledTouchable = styled.TouchableOpacity`
    background-color: #2a9d8f;
    align-items: center;
    width: 100px;
    justify-content: center;
    border-radius: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 5px;
    margin-bottom: 5px;
`

const StyledText = styled.Text`
  font-family: 'Avenir';
  font-size: 18px;
  color: #fff;
`

export default function Tool(props) {
  return (
    <StyledTouchable onPress={props.onPress} style={props.style}>
      <StyledText style={props.textStyle}>{props.name}</StyledText>
    </StyledTouchable>
  )
}