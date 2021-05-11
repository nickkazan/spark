import React, { useState, useContext } from "react";
import styled from '../node_modules/styled-components/native';
import { View } from "react-native";
import { Auth } from "aws-amplify";

import AuthContext from '../context/auth-context.js'
import { signIn } from '../context/actions';
import { storeSignInData } from '../context/utility';

import PrimaryButton from "../components/PrimaryButton";
import Input from "../components/Input";
import ConfirmSignup from "./ConfirmSignup";

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


export default function Signup({ props, navigation }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")
  const [confirmSignupPage, setConfirmSignupPage] = useState(false)
  const [state, dispatch] = useContext(AuthContext);


  const handleSignupAttempt = async (email, username, password) => {
    const clearFirstName = firstName.trim()
    const clearLastName = lastName.trim()
    const clearEmail = email.trim()
    const clearUsername = username.trim()
    const clearPassword = password.trim()

    try {
      await Auth.signUp({
        username: clearUsername,
        password: clearPassword,
        attributes: {
          email: clearEmail,
          given_name: firstName,
          family_name: lastName
        },
      });
    } catch (err) {
      console.log("sign up err: ", err)
      alert(err)
    }
  }

  const inputIsValid = () =>
    firstName !== "" && lastName !== "" && username !== "" && password !== "" && !passwordIsInvalid() && email !== "" && !emailIsInvalid()
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
  }

  const passwordIsInvalid = () => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.\[\]{}\(\)?\-“!@#%&\/,><\’:;|_~`])\S{8,99}$/;

    if (!re.test(password)) {
      return true
    }
    return false
  }

  const confirmSignUp = async (username, code) => {
    try {
      await Auth.confirmSignUp(username, code)
    } catch (error) {
      console.log("error confirming sign up", error)
    }
  };

  const handleSignIn = async (username, password) => {
    try {
      await Auth.signIn(username, password)
    } catch (error) {
      console.log("error signing in", error)
    }
  };

  const handleConfirm = async () => {
    await confirmSignUp(username, code)
    await handleSignIn(username, password)
    const {userToken, userData} = storeSignInData()
    dispatch(signIn(userToken, userData))
};

  const handleCode = (val) => setCode(val)

  return (
      <View>
        {!confirmSignupPage ?
        <View>
          <StyledText style={{alignSelf: "center", paddingTop: 15, paddingBottom: 15, fontSize: 24}}>
            Welcome to Spark
          </StyledText>
          <Input
            label="first name"
            value={firstName}
            error={
              firstName.trim() === ""
                ? "mandatory field"
                : firstName.trim().includes(" ")
                ? "invalid characters"
                : firstName.length < 1
                ? "too short"
                : false
            }
            onChangeText={(val) => setFirstName(val)}
          />
          <Input
            label="last name"
            value={lastName}
            error={
              lastName.trim() === ""
                ? "mandatory field"
                : lastName.trim().includes(" ")
                ? "invalid characters"
                : lastName.length < 1
                ? "too short"
                : false
            }
            onChangeText={(val) => setLastName(val)}
          />
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
                  setConfirmSignupPage(true);
                }}
            />
            </>
          </StyledActions>
        </View>
        :
        <View>
          <ConfirmSignup
            code={code}
            email={email}
            handleConfirm={handleConfirm}
            handleCode={handleCode}
            handleCancel={() => setConfirmSignupPage(false)}
          />
        </View>
        }
      </View>
  );
};