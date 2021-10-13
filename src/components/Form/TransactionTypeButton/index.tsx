import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import * as S from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

interface Props extends RectButtonProps {
  title:string;
  type: 'up' | 'down';
  isActive: boolean;
}

const TransactionTypeButton = ({title, type,isActive, ...rest}:Props) => {
  
  return (
    <S.Container 
      isActive={isActive} 
      type={type} 
      
    >
      <S.Button
        {...rest}
      >
        <S.Icon type={type} name={icons[type]}/>
        <S.Title>
          {title}
        </S.Title>
      </S.Button>
    </S.Container>
  );
}

export default TransactionTypeButton;