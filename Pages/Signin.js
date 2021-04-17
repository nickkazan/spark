import React, { useState } from "react";
import styled from '../node_modules/styled-components/native';
import { StyleSheet, View, Text } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import Input from "../components/Input";
import { Auth } from "aws-amplify";

const StyledText = styled.Text`
  padding-left: 16;
  padding-right: 16;
  padding-top: 16;
  padding-bottom: 16;
  font-family: "Avenir";
  font-size: 18;
  color: black;
`
const StyledActions = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-left: 16;
  padding-right: 16;
`


export default function Signin({ props, navigation, login }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSigninAttempt = async (email, username, password) => {
    const clearEmail = email.trim();
    const clearUsername = username.trim();
    const clearPassword = password.trim();

    try {
      await Auth.signIn({
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
    username !== "" && password !== "" && password.length >= 8
      ? email !== "" && !emailIsInvalid()
      : true;

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
                ? "username contains invalid characters"
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
                ? "password contains invalid characters"
                : password.length < 8
                ? "password is too short"
                : false
            }
            onChangeText={(val) => setPassword(val)}
          />
          <StyledActions>
            <>
              <StyledText
                onPress={() => navigation.navigate()}
                style={{color: "#2a9d8f"}}
              >
                I have an account
              </StyledText>
              <PrimaryButton
                text="register"
                disabled={!inputIsValid()}
                onPress={async () => {
                  await handleSigninAttempt(email, username, password);
                }}
              />
            </>
          </StyledActions>
        </View>
      </View>
    </>
  );
};