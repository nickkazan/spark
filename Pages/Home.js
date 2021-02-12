import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

import Choice from '../Components/Choice';

const StyledContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

const StyledRow = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export default function Home() {
  const [listOfChoices, setListOfChoices] = useState([
      {choiceName: 'Restaurants', 'isActive': false},
      {choiceName: 'Sports', 'isActive': false},
      {choiceName: 'Bars', 'isActive': true}
  ])

  const selectChoice = (choice, index) => {
    console.log(listOfChoices)
    var tempListOfChoices = listOfChoices.slice()
    tempListOfChoices[index].isActive = !tempListOfChoices[index].isActive
    setListOfChoices(tempListOfChoices)
    console.log(listOfChoices)
  }

  const inactiveChoiceStyle = {
    backgroundColor: '#e5e5e5'
  }
  const activeChoiceStyle = {
    backgroundColor: '#2a9d8f',
    color: '#fff'
  }
  const inactiveTextStyle = {
    color: '#000'
  }
  const activeTextStyle = {
    color: '#fff'
  }

  return (
    <StyledContainer>
      <StyledRow>
        { listOfChoices.map((item, index) => (
          <Choice key={index} name={item.choiceName} textStyle={ item.isActive ? activeChoiceStyle: inactiveChoiceStyle } style={ item.isActive ? activeChoiceStyle: inactiveChoiceStyle } onPress={() => selectChoice(item, index)} />
        )) 
        }
      </StyledRow>
    </StyledContainer>
  )
}