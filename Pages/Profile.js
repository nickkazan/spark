import React, { useState, useContext, useEffect, useCallback } from "react";
import styled from '../node_modules/styled-components/native';
import { Auth } from "aws-amplify";
import { FlatList, SafeAreaView } from 'react-native';
import ResultingItem from '../components/ResultingItem';
import PrimaryButton from '../components/PrimaryButton';

import AuthContext from '../context/auth-context.js';
import { getSavedActivities, logUserOutOfAccount } from '../context/utility.js';
import { signOut } from '../context/actions';


const StyledContainer = styled.View`
  flex: 10;
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
  align-self: center;
`
const StyledTopBar = styled.View`
  flex: 2;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  background-color: #2a9d8f;
  align-items: center;
  justify-content: space-between;
`
const StyledBottomBar = styled.View`
  flex: 8;
  width: 100%;
  flex-direction: column;
  background-color: #fff;
  align-items: stretch;
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
  }, [state.userData, state.savedActivities])

  
  const fetchUserData = async () => {
    console.log(state)
    const parsedUserData = JSON.parse(state.userData)
    setFirstName(parsedUserData['firstName'])
    setLastName(parsedUserData['lastName'])
    setEmail(parsedUserData['email'])
    setUsername(parsedUserData['username'])
  }

  const selectItem = (itemData) => {
    navigation.navigate('ChosenItem', { data: itemData, saved: true }) 
  }

  const logOutOfAccount = async () => {
    logUserOutOfAccount()
    dispatch(signOut())
  }

  return (
      <StyledContainer>
        <StyledTopBar>
          <StyledText style={{color: '#fff'}}>{firstName + " " + lastName}</StyledText>
          <StyledText style={{color: '#fff'}}>{email}</StyledText>
          <StyledText style={{color: '#fff'}}>@{username}</StyledText>
        </StyledTopBar>
        <StyledBottomBar>
          <StyledText style={{fontSize: 24, padding: 15}}>Saved Activities</StyledText>
          <FlatList
            data={savedActivities}
            renderItem={({ item }) => (
            <ResultingItem
              name={item.name}
              price={item.price}
              image={item.image_url}
              rating={item.rating.toString()}
              review_count={item.review_count.toString()}
              address={item.location.address1}
              onPress={() => selectItem(item)}
            />
            )}
            keyExtractor={item => item.id}
          />
          <PrimaryButton
            style={{marginBottom: 10, marginTop: 10, alignSelf: 'center'}}
            text="log out"
            onPress={() => logOutOfAccount()}
          />

        </StyledBottomBar>
      </StyledContainer>
  );
};