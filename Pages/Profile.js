import React, { useState, useContext, useEffect, useCallback } from "react";
import styled from '../node_modules/styled-components/native';
import { Auth } from "aws-amplify";
import { useFocusEffect } from '@react-navigation/native';

import AuthContext from '../context/auth-context.js'
import { getSavedActivities } from '../context/utility.js'


const StyledContainer = styled.View`
  flex: 1;
  padding-bottom: 50px;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
`
const StyledText = styled.Text`
  padding-left: 16px;
  padding-right: 16px;
  font-family: "Avenir";
  font-size: 18px;
  color: black;
`
const StyledTopBar = styled.View`
  flex: 2;
  width: 100%;
  padding-top: 25px;
  padding-bottom: 25px;
  flex-direction: column;
  background-color: #2a9d8f;
  align-items: center;
  justify-content: space-between;
`
const StyledBottomBar = styled.View`
  flex: 6;
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
`

export default function Profile({ props, navigation }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [savedActivities, setSavedActivities] = useState([])

  const [state, dispatch] = useContext(AuthContext);

  useEffect(() => {
    fetchUserData()
    getSavedActivities().then((activities) => { setSavedActivities(activities) })
  }, [])

  
  const fetchUserData = async () => {
    const parsedUserData = JSON.parse(state.userData)
    setFirstName(parsedUserData.firstName)
    setLastName(parsedUserData.lastName)
    setEmail(parsedUserData.email)
    setUsername(parsedUserData.username)
  }

  return (
      <StyledContainer>
        <StyledTopBar>
          <StyledText style={{color: '#fff'}}>{firstName + " " + lastName}</StyledText>
          <StyledText style={{color: '#fff'}}>{email}</StyledText>
          <StyledText style={{color: '#fff'}}>@{username}</StyledText>
        </StyledTopBar>
        <StyledBottomBar>
          <StyledText>Here is where saved activities will go...</StyledText>
          <StyledText>{savedActivities.length}</StyledText>
        </StyledBottomBar>
      </StyledContainer>
  );
};