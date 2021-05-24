import React from '../node_modules/react';
import styled from '../node_modules/styled-components/native';

const StyledTouchable = styled.TouchableOpacity`
    width: 125px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
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
`

export default function Choice(props) {
  return (
    <StyledTouchable onPress={props.onPress} style={props.style}>
      <StyledText style={props.textStyle}>{props.name}</StyledText>
    </StyledTouchable>
  )
}