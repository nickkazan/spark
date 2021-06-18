import { Linking } from 'react-native';
import React, { useContext } from '../node_modules/react';
import styled from '../node_modules/styled-components/native';
import Tool from '../components/Tool';

import AuthContext from '../context/auth-context.js';
import { storeActivity, deleteActivity } from '../context/utility';
import { saveActivities, deleteActivityById } from '../context/actions';

import Colors from '../styles/Colors';

const StyledContainer = styled.View`
  flex: 10;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`
const StyledImage = styled.Image`
  flex: 1;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`
const StyledInformation = styled.View`
  flex: 2;
`
const StyledTitle = styled.Text`
  font-family: 'Avenir';
  font-size: 22px;
  align-self: center;
  padding-top: 10px;
  padding-bottom: 10px;
`
const StyledText = styled.Text`
  font-family: 'Avenir';
  font-size: 16px;
  opacity: 0.5;
`
const StyledMetadataRow = styled.View`
  flex-direction: row;
  align-self: stretch;
  align-items: flex-end;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`
const StyledCategories = styled.View`
  flex-direction: row;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
`
const StyledButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export default function ChosenItem({navigation, route}) {
  const [state, dispatch] = useContext(AuthContext);
  const data = route.params.data
  const saved = route.params.saved
  const lengthOfCategories = data.categories.length
  
  const color = Colors()

  const openWebsite = () => {
    Linking.canOpenURL(data.url).then(supported => {
      if (supported) {
        Linking.openURL(data.url);
      } else {
        console.log("Don't know how to open URI: " + data.url);
        alert("Website is not available.")
      }
    });
  };

  const openPhone = () => {
    Linking.canOpenURL(`tel:${data.phone}`).then(supported => {
      console.log("Phone is ->>> ", data.phone)
      if (supported && data.phone !== "") {
        Linking.openURL(`tel:${data.phone}`);
      } else {
        console.log("Don't know how to open URI: " + data.phone);
        alert("No phone number found for this activity.")
      }
    });
  };

  const openDirections = () => {
    const address = data.location.address1
    const city = data.location.city
    const zipCode = data.location.zip_code

    let daddr = encodeURIComponent(`${address} ${zipCode}, ${city}`);

    console.log(daddr)
    Linking.canOpenURL(`http://maps.google.com/?daddr=${daddr}`).then(googleSupported => {
    if (googleSupported) {
      Linking.openURL(`http://maps.google.com/?daddr=${daddr}`)
    } else {
      Linking.canOpenURL(`http://maps.apple.com/?daddr=${daddr}`).then(appleSupported => {
        if (appleSupported) {
          Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`)
        } else {
          console.log("Cannot open in Google Maps or Apple Maps")
          alert("Failed to open directions to activity.")
        }
      })
    }
    })
  }

  const saveActivityToProfile = async () => {
    const username = state.userData.username
    let savedActivities = await storeActivity(username, data.id)
    dispatch(saveActivities(savedActivities))
  }

  const removeActivityFromProfile = async () => {
    const username = state.userData.username
    let savedActivities = await deleteActivity(username, data.id)
    console.log("NEW ", savedActivities)
    dispatch(deleteActivityById(savedActivities))
    navigation.navigate('Profile')
  }


  return (
    <StyledContainer style={{backgroundColor: color.background}}>
      <StyledImage source={{uri: data.image_url}}/>
      <StyledInformation>
        <StyledTitle style={{color: color.text}}>
          {data.name}
        </StyledTitle>
        <StyledMetadataRow>
          <StyledText style={{color: color.primaryColor}}>
            {data.price}
          </StyledText>
          <StyledText style={{color: color.primaryColor}}>
            {data.rating} from {data.review_count} reviews
          </StyledText>
        </StyledMetadataRow>
        <StyledCategories>
            {
              data.categories.map((item, index) => (
                <StyledText style={{color: color.primaryColor}} key={index.toString()}>
                  {(index + 1) == lengthOfCategories ? item.title : item.title + ", "}
                </StyledText>
              ))
            }
        </StyledCategories>
        <StyledButtonRow>
          <Tool name="phone" onPress={() => openPhone()}/>
          <Tool name="earth" onPress={() => openWebsite()}/>
          <Tool name="directions-fork" onPress={() => openDirections()}/>
          {
            saved ? 
            <Tool name="trash-can" onPress={() => removeActivityFromProfile()}/>
            :
            <Tool name="download-circle" onPress={() => saveActivityToProfile()}/>
          }
        </StyledButtonRow>
      </StyledInformation>
    </StyledContainer>
  )
}