import React from '../node_modules/react';
import styled from '../node_modules/styled-components/native';

import Colors from '../styles/Colors';

const StyledTouchable = styled.TouchableOpacity`
  flex-direction: row;
  align-self: stretch;
  border-radius: 10px;
  border-width: 1px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 150px;
`
const StyledInformation = styled.View`
  flex: 2;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
`
const StyledMetadataRow = styled.View`
  flex-direction: row;
  align-self: stretch;
  align-items: flex-end;
  justify-content: space-between;
`
const StyledNameAndAddress = styled.View`
  align-self: stretch;
  align-items: center;
  justify-content: space-between;
`
const StyledImage = styled.Image`
  flex: 1;
  align-self: stretch;
  align-items: center;
  margin-left: 5px;
  justify-content: center;
  margin-right: 10px;
  border-radius: 10px;
`
const StyledTitle = styled.Text`
  font-family: 'Avenir';
  font-size: 22px;
`
const StyledAddress = styled.Text`
  font-family: 'Avenir';
  font-size: 16px;
  opacity: 0.5;
`
const StyledPrice = styled.Text`
  font-family: 'Avenir';
  font-size: 16px;
  opacity: 0.5;
`
const StyledRating = styled.Text`
  font-family: 'Avenir';
  font-size: 16px;
  opacity: 0.5;
`

export default function Choice(props, {navigation}) {
  const color = Colors()

  return (
    <StyledTouchable onPress={props.onPress} style={{borderColor: color.primaryColor}}>
      <StyledImage source={{uri: props.image}} />
      <StyledInformation>
        <StyledNameAndAddress>
          <StyledTitle style={{color: color.text}}>
            {props.name}
          </StyledTitle>
          <StyledAddress style={{color: color.primaryColor}}>
            {props.address}
          </StyledAddress>
        </StyledNameAndAddress>
        <StyledMetadataRow>
          <StyledPrice style={{color: color.primaryColor}}>
            {props.price}
          </StyledPrice>
          <StyledRating style={{color: color.primaryColor}}>
            {props.rating} from {props.review_count} reviews
          </StyledRating>
        </StyledMetadataRow>
      </StyledInformation>
    </StyledTouchable>
  )
}
