import React, { useContext } from '../node_modules/react'
import styled from '../node_modules/styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthContext from '../context/auth-context.js';
import { logUserOutOfAccount, saveColorMode } from '../context/utility.js';
import { changeTheme, signOut } from '../context/actions';

import Colors from '../styles/Colors';


const StyledContainer = styled.View`
  flex: 10;
  flex-direction: column;
  align-items: stretch;
  border-top-width: 1px;
  border-color: #2a9d8f;
`
const StyledRow = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`
const StyledText = styled.Text`
  font-family: 'Avenir';
  font-size: 22px;
  text-align: center;
`


export default function Settings({ navigation }) {
  const [state, dispatch] = useContext(AuthContext);
  const color = Colors()

  const logOutOfAccount = async () => {
    logUserOutOfAccount()
    dispatch(signOut())
  }

  const toggleColorMode = async () => {
    if (state.colorMode === 'DEFAULT') {
      dispatch(changeTheme('NIGHTMODE'));
      saveColorMode('NIGHTMODE')
    } else {
      dispatch(changeTheme('DEFAULT'));
      saveColorMode('DEFAULT')
    }
  }



  return (
    <StyledContainer style={{backgroundColor: color.background, borderColor: color.primaryColor}}>

        <StyledRow style={{borderColor: color.primaryColor}} onPress={() => logOutOfAccount()}>
          <StyledText style={{color: color.primaryColor}}>Log Out</StyledText>
          <MaterialCommunityIcons name="arrow-right" color={color.primaryColor} size={30} />
        </StyledRow>

        <StyledRow style={{borderColor: color.primaryColor}} onPress={() => toggleColorMode()}>
          <StyledText style={{color: color.primaryColor}}>Toggle Night Mode</StyledText>
          <MaterialCommunityIcons name="arrow-right" color={color.primaryColor} size={30} />
        </StyledRow>

    </StyledContainer>
  )
}