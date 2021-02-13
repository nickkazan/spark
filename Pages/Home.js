import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

import Choice from '../Components/Choice';
import PrimaryButton from '../Components/PrimaryButton';

const StyledContainer = styled.View`
  flex: 10;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

const StyledRow = styled.View`
  flex: 8;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export default function Home() {
  const listOfCategories = [
    {choiceName: 'Restaurants', 'isActive': false},
    {choiceName: 'Sports', 'isActive': false},
    {choiceName: 'Bars', 'isActive': false}
  ]
  const listOfPrices = [
    {choiceName: '$', 'isActive': false},
    {choiceName: '$$', 'isActive': false},
    {choiceName: '$$$+', 'isActive': false}
  ]
  const titles = [['categories', listOfCategories], ['prices', listOfPrices]]

  const [listOfChoices, setListOfChoices] = useState(listOfCategories)
  const [choiceCounter, setChoiceCounter] = useState(0)
  const [finalChoices, setFinalChoices] = useState({})

  useEffect(() => {
    if (choiceCounter < titles.length) {
      setListOfChoices(titles[choiceCounter][1])
    }
  }, [choiceCounter])

  useEffect(() => {
    console.log("Final is now: ", finalChoices)
  }, [finalChoices])

  const selectChoice = (index) => {
    // console.log(listOfChoices)
    var tempListOfChoices = listOfChoices.slice()
    tempListOfChoices[index].isActive = !tempListOfChoices[index].isActive
    setListOfChoices(tempListOfChoices)
  }

  const submitChoices = (finalListOfChoices) => {
    console.log("Choice Counter Length: ", choiceCounter)
    if (choiceCounter < titles.length) {
      var choicesWithActiveStatus = []
      finalListOfChoices.forEach((choice) => {
        if (choice.isActive) {
          choicesWithActiveStatus.push(choice.choiceName)
        }
      })
      console.log(choiceCounter)
      console.log(titles.length)
      console.log(titles[choiceCounter][0])
      var keyName = titles[choiceCounter][0]
  
      setFinalChoices({...finalChoices, [keyName]: choicesWithActiveStatus})
      setChoiceCounter(choiceCounter + 1)
    } else {
      console.log("Our Choice Counter is passed the limit.")
    }
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
          <Choice key={index} name={item.choiceName} textStyle={ item.isActive ? activeTextStyle: inactiveTextStyle } style={ item.isActive ? activeChoiceStyle: inactiveChoiceStyle } onPress={() => selectChoice(index)} />
        )) 
        }
      </StyledRow>
      <PrimaryButton text="Next" onPress={() => submitChoices(listOfChoices)}/>
    </StyledContainer>
  )
}