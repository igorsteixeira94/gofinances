import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'

import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';


interface IconProps {
  type: 'positive' | 'negative';
}

interface ContainerProps  {
  isActive: boolean;
  type: 'positive' | 'negative';
}

export const Container = styled.View<ContainerProps>`
  width: 48%;



  border: ${({isActive}) => isActive ? '0' : '1.5px'} solid ${({theme})=> theme.colors.text};
  border-radius: 5px;

 

  ${({isActive, type,theme})=> isActive && type === "positive" && css`
    background-color: ${theme.colors.success_light};
  `}

  ${({isActive, type,theme})=> isActive && type === "negative" && css`
    background-color: ${theme.colors.attention_light};
  `}
`;

export const Button = styled(RectButton)`
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({theme,type}) => type === "positive" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({theme})=> theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
