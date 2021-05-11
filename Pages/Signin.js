import React, { useState, useContext } from "react";
import styled from '../node_modules/styled-components/native';
import { View } from "react-native";
import { Auth } from "aws-amplify";

import AuthContext from '../context/auth-context.js';
import { signIn } from '../context/actions';
import { storeSignInData } from '../context/utility';

import PrimaryButton from "../components/PrimaryButton";
import Input from "../components/Input";

const StyledText = styled.Text`
  padding-left: 16px;
  padding-right: 16px;
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


export default function Signin({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [unknownLogin, setUnknownLogin] = useState(false)
  const [state, dispatch] = useContext(AuthContext);


  const inputIsValid = () =>
    username !== "" && password !== "" && !passwordIsInvalid()
      ? true
      : false

  const passwordIsInvalid = () => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/;

    if (!re.test(password)) {
      return true
    }
    return false
  }

  const handleSignIn = async (username, password) => {
    try {
      await Auth.signIn(username, password)
      storeSignInData()
      dispatch(signIn())
    } catch (error) {
      console.log("error signing in", error)
      setUnknownLogin(true)
    }
  };

  const handleUsernameOnChange = (val) => {
    setUsername(val)
    setUnknownLogin(false)
  }

  const handlePasswordOnChange = (val) => {
    setPassword(val)
    setUnknownLogin(false)
  }

  return (
      <View>
        <View>
          <StyledText style={{alignSelf: "center", paddingTop: 30, paddingBottom: 30, fontSize: 24}}>
            Welcome back to Spark
          </StyledText>
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
                : unknownLogin === true
                ? "login doesn't exist"
                : false
            }
            onChangeText={(val) => handleUsernameOnChange(val)}
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
                : unknownLogin === true
                ? "login doesn't exist"
                : false
            }
            onChangeText={(val) => setPassword(val)}
          />
          <StyledActions>
            <>
              <StyledText
                onPress={() => navigation.navigate('Signup')}
                style={{color: "#2a9d8f"}}
              >
                I'm new here
              </StyledText>
              <PrimaryButton
                text="login"
                disabled={!inputIsValid()}
                onPress={ async () => { await handleSignIn(username, password) } }
              />
            </>
          </StyledActions>
        </View>
      </View>
  );
};