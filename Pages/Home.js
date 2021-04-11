import React, { useState, useEffect } from '../node_modules/react';
import styled from '../node_modules/styled-components/native';

import Choice from '../components/Choice';
import PrimaryButton from '../components/PrimaryButton';

const StyledContainer = styled.View`
  flex: 10;
  padding-top: 50px;
  padding-bottom: 50px;
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

const StyledMessage = styled.Text`
  font-family: 'Avenir';
  font-size: 28px;
  text-align: center;
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
      {id: '3000', choiceName: 'Walking', categoryCode: 2000, 'isActive': false},
      {id: '3001', choiceName: 'Bus', categoryCode: 15000, 'isActive': false},
      {id: '3002', choiceName: 'Biking', categoryCode: 8000, 'isActive': false}
    ],
    [
      {id: '3003', choiceName: 'Uber', categoryCode: 15000, 'isActive': false},
      {id: '3004', choiceName: 'Car', categoryCode: 40000, 'isActive': false}
    ]
  ]
  const titles = [
    ['categories', listOfCategories, "Which activities are you looking to do?"],
    ['prices', listOfPrices, "What prices are you willing to pay?"],
    ['transportation', listOfTransportation, "How are you able to commute?"]
  ]

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
      const data = JSON.stringify(finalChoices)
      console.log("DATA: ", data)

      fetch('http://192.168.1.17:8080/resulting-activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },      
        body: data
      })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
          navigation.navigate('Results', { data: data.businesses })
        });
      })
      .catch((error) => {
        console.error(error)
      });

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
      <StyledMessage>
        {choiceCounter < titles.length ? titles[choiceCounter][2] : null}
      </StyledMessage>
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