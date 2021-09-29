import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${({theme})=> theme.fonts.bold} ;
  font-size: 24px;
  font-weight: bold;
  color: ${({theme})=> theme.colors.text};
`;



/**
 * Android usa dpi - como metrica para os seus pixels
 * Ios usa points - como metrica para os seus pixels
 * O styleSheet converte de maneira automatica.
 */