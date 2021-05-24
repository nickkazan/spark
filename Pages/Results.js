import { FlatList, SafeAreaView } from 'react-native';
import React from '../node_modules/react';
import styled from '../node_modules/styled-components/native';
import ResultingItem from '../components/ResultingItem';

import Colors from '../styles/Colors';

const StyledContainer = styled.View`
  flex: 10;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`

export default function Results({ navigation, route }) {
  const color = Colors()

  const selectItem = (itemData) => {
    navigation.navigate('ChosenItem', { data: itemData }) 
  }


  return (
    <StyledContainer style={{backgroundColor: color.background}}>
      <SafeAreaView>
        <FlatList
          data={route.params.data}
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
      </SafeAreaView>
    </StyledContainer>
  )
}