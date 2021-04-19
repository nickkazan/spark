import React, { useState } from "react";
import styled from '../node_modules/styled-components/native';
import { View } from "react-native";
import { Auth } from "aws-amplify";

import PrimaryButton from "../components/PrimaryButton";
import Input from "../components/Input";

const StyledText = styled.Text`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
  padding-bottom: 16px;
  font-family: "Avenir";
  font-size: 18px;
  color: black;
`
const StyledActions = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
  padding-right: 16px;
`


export default function Signup({ props, navigation, login }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupAttempt = async (email, username, password) => {
    const clearEmail = email.trim();
    const clearUsername = username.trim();
    const clearPassword = password.trim();

    try {
      await Auth.signUp({
        username: clearUsername,
        password: clearPassword,
        attributes: {
          email: clearEmail,
        },
      });
    } catch (err) {
      console.log("sign up err: ", err);
      alert(err)
    }
  };

  const inputIsValid = () =>
    username !== "" && password !== "" && !passwordIsInvalid() && email !== "" && !emailIsInvalid()
      ? true
      : false

  const emailIsInvalid = () => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.trim() === "") {
      return "mandatory field";
    }

    if (!re.test(email)) {
      return "invalid email";
    }

    return false;
  };

  const passwordIsInvalid = () => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/;

    if (!re.test(password)) {
      return true
    }
    return false
  }

  return (
    <>
      <View >
        <View >
          <StyledText style={{alignSelf: "center", paddingTop: 30, paddingBottom: 30, fontSize: 24}}>
            Welcome to Spark
          </StyledText>
          <Input
            label="email"
            error={emailIsInvalid()}
            value={email}
            onChangeText={(val) => setEmail(val)}
          />
          <Input
            label="username"
            value={username}
            error={
              username.trim() === ""
                ? "mandatory field"
                : username.trim().includes(" ")
                ? "invalid characters"
                : username.length < 2
                ? "too short"
                : false
            }
            onChangeText={(val) => setUsername(val)}
          />
          <Input
            secure={true}
            label="password"
            value={password}
            error={
              password.trim() === ""
                ? "mandatory field"
                : password.trim().includes(" ")
                ? "invalid characters"
                : password.length < 8
                ? "too short"
                : passwordIsInvalid()
                ? "needs a special character, number, lowercase and capital letter"
                : false
            }
            onChangeText={(val) => setPassword(val)}
          />
          <StyledActions>
            <>
              <StyledText
                onPress={() => navigation.navigate('Signin')}
                style={{color: "#2a9d8f"}}
              >
                I have an account
              </StyledText>
              <PrimaryButton
                text="register"
                disabled={!inputIsValid()}
                onPress={async () => {
                  await handleSignupAttempt(email, username, password);
                }}
              />
            </>
          </StyledActions>
        </View>
      </View>
    </>
  );
};