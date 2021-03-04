import { FlatList, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from '../node_modules/react'
import styled from '../node_modules/styled-components/native'

import ResultingItem from '../components/ResultingItem'

const StyledContainer = styled.View`
  flex: 10;
  flex-direction: column;
  background-color: #fff;
  align-items: stretch;
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

export default function Home({navigation, route}) {
  console.log("MADE IT: ", route.params.data[0])
  return (
    <StyledContainer>
      <SafeAreaView>
      <FlatList
        data={route.params.data}
        renderItem={({ item }) => (
          <ResultingItem
            name={item.name}
            price={item.price}
            rating={item.rating.toString()}
            review_count={item.review_count.toString()}
            address={item.location.address1}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
      {/* <ResultingItem name='Hot Dog Man' price='$$$' rating='4.5' review_count='113' 
      is_closed='false' address='123 AppleBlock Crescent' /> */}
    </StyledContainer>
  )
}