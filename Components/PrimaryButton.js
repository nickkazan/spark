import React from '../node_modules/react';
import styled from '../node_modules/styled-components/native';

const StyledTouchable = styled.TouchableOpacity`
  align-items: center;
  width: 75%;
  justify-content: flex-end;
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
    <StyledTouchable style={{ backgroundColor: props.disabled ? '#cccccc' : '#2a9d8f' }} disabled={props.disabled} onPress={props.onPress}>
      <StyledText> {props.text} </StyledText>
    </StyledTouchable>
  )
}