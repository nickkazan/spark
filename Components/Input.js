import React from '../node_modules/react';
import styled from '../node_modules/styled-components/native';


const StyledContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  align-self: center;
  width: 75%;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`
const StyledText = styled.Text`
  font-family: 'Avenir';
  font-size: 18px;
  color: black;
`
const StyledErrorText = styled.Text`
  font-family: 'Avenir';
  font-size: 18px;
  align-self: flex-end;
  color: red;
`
const StyledSuccessText = styled.Text`
  font-family: 'Avenir';
  font-size: 18px;
  align-self: flex-end;
  color: green;
`
const StyledTextInput = styled.TextInput`
  width: 100%;
  border-bottom-color: black;
  border-bottom-width: 1px;
  font-family: 'Avenir';
  font-size: 18px;
  color: black;
`

export default function Input(props) {
  return (
    <StyledContainer>
      <StyledText>{props.label}</StyledText>
      <StyledTextInput
        onChangeText={props.onChangeText}
        value={props.value}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        returnKeyType={props.returnKeyType}
        style={{borderBottomColor: props.error ? "red" : "green"}}
        secureTextEntry={props.secure}
      />
      {props.error ? (
        <StyledErrorText>{props.error}</StyledErrorText>
      )
      :
      <StyledSuccessText>Looks Good</StyledSuccessText>
      }
    </StyledContainer>
  )
}