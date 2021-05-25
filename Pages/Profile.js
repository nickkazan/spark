import React, { useState, useContext, useEffect } from "react";
import styled from '../node_modules/styled-components/native';
import { FlatList, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ResultingItem from '../components/ResultingItem';
import Colors from '../styles/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthContext from '../context/auth-context.js';
import { changeProfilePicture } from '../context/actions';
import { getSavedActivities, saveProfilePicture } from '../context/utility.js';

const IMAGE_DIMENSIONS = 125

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
`
const StyledTopBar = styled.View`
  flex: 2;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const StyledTextTopBar = styled.View`
  flex: 2;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
const StyledBottomBar = styled.View`
  flex: 8;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
`
const StyledTouchableOpacity = styled.TouchableOpacity`
  width: ${IMAGE_DIMENSIONS}px;
  height: ${IMAGE_DIMENSIONS}px;
  border-radius: ${IMAGE_DIMENSIONS/2}px;
  background-color: black;
  align-items: center;
  justify-content: center;
`
const StyledProfilePicture = styled.Image`
  width: ${IMAGE_DIMENSIONS}px;
  height: ${IMAGE_DIMENSIONS}px;
  border-radius: ${IMAGE_DIMENSIONS/2}px;
`

export default function Profile({ props, navigation }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [savedActivities, setSavedActivities] = useState([])
  const [profilePicture, setProfilePicture] = useState(null)

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
    setProfilePicture(state.profilePicture)
  }

  const selectItem = (itemData) => {
    navigation.navigate('ChosenItem', { data: itemData, saved: true }) 
  }

  const handleChoosePhoto = async () => {
    let response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true
    })

    if (!response.cancelled) {
      setProfilePicture(response.uri)
      dispatch(changeProfilePicture(response.uri))
      saveProfilePicture(response.uri)
    }
  };


  return (
      <StyledContainer style={{backgroundColor: color.background}}>
        <StyledTopBar style={{backgroundColor: color.primaryColor}}>
          <StyledTouchableOpacity onPress={handleChoosePhoto}>
            {profilePicture
            ?
              <StyledProfilePicture
                source={{ uri: profilePicture }}
              />            
            :
              <MaterialCommunityIcons name="camera" color="white" size={35} />
            }
          </StyledTouchableOpacity>
          <StyledTextTopBar>
            <StyledText style={{color: color.white}}>{firstName + " " + lastName}</StyledText>
            <StyledText style={{color: color.white}}>{email}</StyledText>
            <StyledText style={{color: color.white}}>@{username}</StyledText>
          </StyledTextTopBar>
        </StyledTopBar>
        <StyledBottomBar style={{backgroundColor: color.background}}>
          <StyledText style={{fontSize: 24, color: color.text, alignSelf: 'center'}}>Saved Activities</StyledText>
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