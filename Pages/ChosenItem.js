import { FlatList, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from '../node_modules/react'
import styled from '../node_modules/styled-components/native'


const StyledContainer = styled.View`
  flex: 10;
  flex-direction: column;
  background-color: #fff;
  align-items: stretch;
  justify-content: space-between;
`


export default function ChosenItem({navigation, route}) {
  console.log(route.params.data)
  return (
    <StyledContainer>
      
    </StyledContainer>
  )
}