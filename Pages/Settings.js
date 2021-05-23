import { FlatList, SafeAreaView } from 'react-native'
import React, { useContext } from '../node_modules/react'
import styled from '../node_modules/styled-components/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthContext from '../context/auth-context.js';
import { logUserOutOfAccount } from '../context/utility.js';
import { signOut } from '../context/actions';


const StyledContainer = styled.View`
  flex: 10;
  flex-direction: column;
  background-color: white;
  align-items: stretch;
  border-top-width: 1px;
  border-color: #2a9d8f;
`
const StyledRow = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
  border-color: #2a9d8f;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`
const StyledText = styled.Text`
  font-family: 'Avenir';
  color: #2a9d8f;
  font-size: 22px;
  text-align: center;
`


export default function Settings({ navigation }) {

  const [state, dispatch] = useContext(AuthContext);

  const logOutOfAccount = async () => {
    logUserOutOfAccount()
    dispatch(signOut())
  }



  return (
    <StyledContainer>

        <StyledRow onPress={() => logOutOfAccount()}>
          <StyledText>Log Out</StyledText>
          <MaterialCommunityIcons name="arrow-right" color="#2a9d8f" size={30} />
        </StyledRow>

        <StyledRow>
          <StyledText>Change Password</StyledText>
          <MaterialCommunityIcons name="arrow-right" color="#2a9d8f" size={30} />
        </StyledRow>

    </StyledContainer>
  )
}