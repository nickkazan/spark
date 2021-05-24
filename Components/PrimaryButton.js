import React from '../node_modules/react';
import styled from '../node_modules/styled-components/native';

import Colors from '../styles/Colors';

const StyledTouchable = styled.TouchableOpacity`
  align-items: center;
  width: 50%;
  justify-content: flex-end;
  border-radius: 10px;
  margin-bottom: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
`

const StyledText = styled.Text`
  font-family: 'Avenir';
  font-size: 18px;
`

export default function PrimaryButton(props) {
  const color = Colors()

  return (
    <StyledTouchable style={[props.style, { backgroundColor: props.disabled ? color.inactiveTint : color.activeTint }]} disabled={props.disabled} onPress={props.onPress}>
      <StyledText style={[props.textStyle, {color: color.white}]}> {props.text} </StyledText>
    </StyledTouchable>
  )
}