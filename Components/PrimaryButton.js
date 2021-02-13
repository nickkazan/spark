import React from 'react';
import styled from 'styled-components/native';

const StyledTouchable = styled.TouchableOpacity`
    background-color: #2a9d8f;
    align-items: center;
    width: 75%;
    justify-content: center;
    border-radius: 10px;
    margin-bottom: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
`

const StyledText = styled.Text`
  font-family: 'Avenir';
  font-size: 18px;
  color: #fff;
`

export default function PrimaryButton(props) {
  return (
    <StyledTouchable onPress={props.onPress}>
      <StyledText> {props.text} </StyledText>
    </StyledTouchable>
  )
}