import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

interface Props extends TouchableOpacityProps {
  title:string;
  type: 'up' | 'down';
  isActive: boolean;
}

const TransactionTypeButton = ({title, type,isActive, ...rest}:Props) => {
  
  return (
    <S.Container 
      isActive={isActive} 
      type={type} 
      {...rest} 
    >
      <S.Icon type={type} name={icons[type]}/>
      <S.Title>
        {title}
      </S.Title>
      
    </S.Container>
  );
}

export default TransactionTypeButton;