import React, { useState, useContext, useEffect } from "react";
import styled from '../node_modules/styled-components/native';
import { FlatList } from 'react-native';
import ResultingItem from '../components/ResultingItem';
import Colors from '../styles/Colors';

import AuthContext from '../context/auth-context.js';
import { getSavedActivities } from '../context/utility.js';


const StyledContainer = styled.View`
  flex: 10;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
const StyledText = styled.Text`
  padding-left: 16px;
  padding-right: 16px;
  font-family: "Avenir";
  font-size: 18px;
  align-self: center;
`
const StyledTopBar = styled.View`
  flex: 2;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
const StyledBottomBar = styled.View`
  flex: 8;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
`

export default function Profile({ props, navigation }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [savedActivities, setSavedActivities] = useState([])

  const [state, dispatch] = useContext(AuthContext);
  const color = Colors()

  useEffect(() => {
    fetchUserData()
    getSavedActivities().then((activities) => { setSavedActivities(activities) })
  }, [state.userData, state.savedActivities])

  
  const fetchUserData = async () => {
    const parsedUserData = JSON.parse(state.userData)
    setFirstName(parsedUserData['firstName'])
    setLastName(parsedUserData['lastName'])
    setEmail(parsedUserData['email'])
    setUsername(parsedUserData['username'])
  }

  const selectItem = (itemData) => {
    navigation.navigate('ChosenItem', { data: itemData, saved: true }) 
  }


  return (
      <StyledContainer style={{backgroundColor: color.background}}>
        <StyledTopBar style={{backgroundColor: color.primaryColor}}>
          <StyledText style={{color: color.white}}>{firstName + " " + lastName}</StyledText>
          <StyledText style={{color: color.white}}>{email}</StyledText>
          <StyledText style={{color: color.white}}>@{username}</StyledText>
        </StyledTopBar>
        <StyledBottomBar style={{backgroundColor: color.background}}>
          <StyledText style={{fontSize: 24, color: color.text}}>Saved Activities</StyledText>
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
        </StyledBottomBar>
      </StyledContainer>
  );
};