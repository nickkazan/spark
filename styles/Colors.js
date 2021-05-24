import { useContext } from "react";
import AuthContext from '../context/auth-context.js';


export default function Colors() {
  const [state, dispatch] = useContext(AuthContext)

  // Colors that dont change
  const colors = {
    primaryColor: '#595ec9',
    lightPrimaryColor: '#8e8df2',
    secondaryColor: '#243447',
    placeholderText: '#8488cf',
    white: '#fff',
    black: '#000'
  };

  switch (state.colorMode) {
    case 'NIGHTMODE':
      return {
        ...colors,
        inactiveTint: '#7B7B7B',
        activeTint: '#595ec9',    
        background: '#121212',
        text: '#fff',
      };
    default:
      return {
        ...colors,
        inactiveTint: '#c9c9c9',
        activeTint: '#595ec9',
        background: '#fff',
        text: '#000',
      };
  }
}
