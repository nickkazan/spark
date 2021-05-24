import React, { useState, useEffect, useContext } from '../node_modules/react';
import styled from '../node_modules/styled-components/native';
import Slider from '@react-native-community/slider';
import Choice from '../components/Choice';
import PrimaryButton from '../components/PrimaryButton';

import AuthContext from '../context/auth-context.js';

import Colors from '../styles/Colors';

const StyledContainer = styled.View`
  flex: 10;
  padding-top: 50px;
  padding-bottom: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

const StyledRowGroups = styled.View`
  flex-direction: column;
  align-items: center;
`

const StyledRow = styled.View`
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
`

const StyledMessage = styled.Text`
  font-family: 'Avenir';
  font-size: 28px;
  text-align: center;
  padding-left: 10px;
  padding-right: 10px;
`

export default function Home({navigation}) {
  const listOfCategories = [
    [
      {id: '1000', choiceName: 'Active', categoryCode: 'active', 'isActive': false},
      {id: '1001', choiceName: 'Arts', categoryCode: 'arts', 'isActive': false},
      {id: '1002', choiceName: 'Beauty & Spas', categoryCode: 'beautysvc', 'isActive': false},
    ],
    [
      {id: '1003', choiceName: 'Food Shops', categoryCode: 'food', 'isActive': false},
      {id: '1004', choiceName: 'Local Flavour', categoryCode: 'localflavor', 'isActive': false},
      {id: '1005', choiceName: 'Nightlife', categoryCode: 'nightlife', 'isActive': false},
    ],
    [
      {id: '1006', choiceName: 'Restaurants', categoryCode: 'restaurants', 'isActive': false},
      {id: '1007', choiceName: 'Shopping', categoryCode: 'shopping', 'isActive': false},
    ]
  ]
  const listOfPrices = [
    [
      {id: '2000', choiceName: '$', categoryCode: '1', 'isActive': false},
      {id: '2001', choiceName: '$$', categoryCode: '2', 'isActive': false},
      {id: '2002', choiceName: '$$$', categoryCode: '3', 'isActive': false}
    ],
    [
      {id: '2003', choiceName: '$$$$', categoryCode: '4', 'isActive': false},
    ]
  ]
  const listOfTransportation = [
    [
      {id: '3000', choiceName: 'Walking', categoryCode: 1000, 'isActive': false},
      {id: '3001', choiceName: 'Bus', categoryCode: 5000, 'isActive': false},
      {id: '3002', choiceName: 'Biking', categoryCode: 2500, 'isActive': false}
    ],
    [
      {id: '3003', choiceName: 'Uber', categoryCode: 10000, 'isActive': false},
      {id: '3004', choiceName: 'Car', categoryCode: 15000, 'isActive': false}
    ]
  ]
  const listOfAvailability = [
    [
      {id: '4000', choiceName: 'Yes', categoryCode: true, 'isActive': false},
      {id: '4001', choiceName: 'No', categoryCode: false, 'isActive': false},
    ]
  ]
  const titles = [
    ['categories', listOfCategories, "Which activities are you looking to do?"],
    ['prices', listOfPrices, "What prices are you willing to pay?"],
    ['transportation', listOfTransportation, "How are you able to commute?"],
    ['availability', listOfAvailability, "Does the activity need to be open right now?"]
  ]

  const [listOfChoices, setListOfChoices] = useState(listOfCategories)
  const [choiceCounter, setChoiceCounter] = useState(0)
  const [finalChoices, setFinalChoices] = useState({})
  const [longitude, setLongitude] = useState(0.0)
  const [latitude, setLatitude] = useState(0.0)
  const [numberOfChoicesRequested, setNumberOfChoicesRequested] = useState(3)

  const [state, dispatch] = useContext(AuthContext);
  const color = Colors()


  useEffect(() => {
    grabUserLongitudeAndLatitude()
  }, [finalChoices])

  useEffect(() => {
    console.log(longitude)
    console.log(latitude)
  }, [latitude, longitude])

  useEffect(() => {
    if (choiceCounter === titles.length) {
      setListOfChoices([])
    } else if (choiceCounter < titles.length) {
      setListOfChoices(titles[choiceCounter][1])
    }
  }, [choiceCounter])

  useEffect(() => {
    console.log("Final is now: ", finalChoices)
  }, [finalChoices])

  const grabUserLongitudeAndLatitude = async () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLongitude(position.coords.longitude)
        setLatitude(position.coords.latitude)
      },
      error => alert(error.message),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
    );
  }

  const resetStates = async () => {
    setListOfChoices(listOfCategories)
    setChoiceCounter(0)
    setNumberOfChoicesRequested(3)
    setFinalChoices({})
  }

  const selectChoice = (rowIndex, itemIndex) => {
    var tempListOfChoices = listOfChoices.slice()
    tempListOfChoices[rowIndex][itemIndex].isActive = !tempListOfChoices[rowIndex][itemIndex].isActive
    setListOfChoices(tempListOfChoices)
  }

  const submitChoices = (finalListOfChoices) => {
    console.log("Choice Counter Length: ", choiceCounter)
    if (choiceCounter < titles.length) {
      var choicesWithActiveStatus = []
      for (var i = 0; i < finalListOfChoices.length; i++) {
        finalListOfChoices[i].forEach((choice) => {
          if (choice.isActive) {
            choicesWithActiveStatus.push(choice.categoryCode)
          }
        })
      }
      var keyName = titles[choiceCounter][0]
  
      setFinalChoices({...finalChoices, [keyName]: choicesWithActiveStatus})
      setChoiceCounter(choiceCounter + 1)
    } else {
      // We hit all of the pages, time to call API
      console.log("Our Choice Counter is passed the limit.")
      const dataBeforeStringify = {
        ...finalChoices, 
        "numberOfChoicesRequested" : numberOfChoicesRequested,
        "longitude" : longitude,
        "latitude" : latitude  
      }
      const data = JSON.stringify(dataBeforeStringify)
      console.log("DATA: ", data)
      
      fetch('http://192.168.1.67:8080/resulting-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },      
        body: data
      })
      .then((response) => {
        response.json().then((data) => {
          navigation.navigate('Results', { data: data })
          resetStates()
        });
      })
      .catch((error) => {
        console.error(error)
      });
    }
  }

  const inactiveChoiceStyle = {
    backgroundColor: color.inactiveTint,
  }
  const activeChoiceStyle = {
    backgroundColor: color.activeTint,
  }
  const inactiveTextStyle = {
    color: color.black,
    opacity: 0.7
  }
  const activeTextStyle = {
    color: color.white,
    opacity: 1
  }

  return (
    <StyledContainer style={{backgroundColor: color.background}}>
      <StyledMessage style={{color: color.text}}>
        {choiceCounter < titles.length ? titles[choiceCounter][2] : "How many options do you want to see?"}
      </StyledMessage>
      {choiceCounter < titles.length ? 
        <StyledRowGroups style={{backgroundColor: color.background}}>
          {
            listOfChoices.map((rowOfItems, rowIndex) => (
              <StyledRow key={rowIndex.toString()}> 
                {
                  rowOfItems.map((item, itemIndex) => (
                    <Choice key={item.id} name={item.choiceName} textStyle={ item.isActive ? activeTextStyle: inactiveTextStyle }
                    style={ item.isActive ? activeChoiceStyle: inactiveChoiceStyle } onPress={() => selectChoice(rowIndex, itemIndex)} />
                  ))
                }
              </StyledRow>
            ))
          }
        </StyledRowGroups>
      :
        <>
          <StyledMessage style={{color: color.text}}>
            {numberOfChoicesRequested}
          </StyledMessage>
          <Slider
            style={{width: '80%', height: 40}}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={numberOfChoicesRequested}
            onValueChange={(value) => setNumberOfChoicesRequested(value)}
            minimumTrackTintColor={color.primaryColor}
            maximumTrackTintColor={color.text}
          />
        </>
      }
    <PrimaryButton text={choiceCounter < titles.length ? "Next" : "Get Activities!"} onPress={() => submitChoices(listOfChoices)}/>
    </StyledContainer>
  )
}