import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';

import Choice from '../Components/Choice';
import PrimaryButton from '../Components/PrimaryButton';

const StyledContainer = styled.View`
  flex: 10;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
`

const StyledRowGroups = styled.View`
  flex: 10;
  flex-direction: column;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

const StyledRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export default function Home() {
  const listOfCategories = [
    [
      {id: '100', choiceName: 'Restaurants', 'isActive': false},
      {id: '101', choiceName: 'Sports', 'isActive': false},
      {id: '102', choiceName: 'Bars', 'isActive': false},
    ],
    [
      {id: '103', choiceName: 'Nature', 'isActive': false},
      {id: '104', choiceName: 'Site Seeing', 'isActive': false},
    ]
  ]
  const listOfPrices = [
    [
      {id: '105', choiceName: '$', 'isActive': false},
      {id: '106', choiceName: '$$', 'isActive': false},
      {id: '107', choiceName: '$$$+', 'isActive': false}
    ]
  ]
  const listOfTransportation = [
    [
      {id: '108', choiceName: 'Walking', 'isActive': false},
      {id: '109', choiceName: 'Biking', 'isActive': false},
      {id: '110', choiceName: 'Bus', 'isActive': false},
    ],
    [
      {id: '111', choiceName: 'Car', 'isActive': false}
    ]
  ]
  const titles = [['categories', listOfCategories], ['prices', listOfPrices], ['transportation', listOfTransportation]]

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

  const selectChoice = (rowIndex, itemIndex) => {
    // console.log(listOfChoices)
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
            choicesWithActiveStatus.push(choice.choiceName)
          }
        })
      }
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
      <StyledRowGroups>
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
      <PrimaryButton text="Next" onPress={() => submitChoices(listOfChoices)}/>
    </StyledContainer>
  )
}