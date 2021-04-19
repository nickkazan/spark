import React from "react";
import { View, Text, Platform } from "react-native";
import styled from "../node_modules/styled-components/native";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";

const StyledContainer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`
const StyledText = styled.Text`
  padding-left: 16px;
  padding-right: 16px;
  font-family: "Avenir";
  font-size: 20px;
  color: black;
`
const StyledCluster = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 25px;
`

export default function ConfirmSignup({
  email,
  handleConfirm,
  handleCode,
  code,
  handleCancel,
}) {

  const codeIsInvalid = () => {
    return code.length !== 6 ? true : false
  }

  const handleVerifyClick = () => {
    handleConfirm()
    handleCancel()
  }

  return (
    <StyledContainer>
      <StyledCluster>
        <StyledText>enter the code sent to:</StyledText>
        <StyledText style={{color: '#2a9d8f'}}>{email}</StyledText>
      </StyledCluster>
      <StyledCluster>
      <Input
        error={code.trim() === "" && "please enter a code"}
        label="Code"
        value={code}
        onChangeText={handleCode}
        keyboardType="number-pad"
        returnKeyType='done'
      />
      <View
        style={{
          marginTop: 24,
          display: "flex",
          flexDirection: "row",
          alignSelf: "flex-end",
        }}
      />
      <PrimaryButton
        text="verify"
        disabled={codeIsInvalid()}
        onPress={() => handleVerifyClick()}
      />
      </StyledCluster>
    </StyledContainer>
  );
};