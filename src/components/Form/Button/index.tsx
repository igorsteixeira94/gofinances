import React from 'react';
import { TouchableOpacityProps, View } from 'react-native';

import * as S from './styles';

interface Props extends TouchableOpacityProps{
  title: string;
}

const Button = ({title,...rest}:Props) => {
  return (
    <S.Container {...rest}>
      <S.Title>
        {title}
      </S.Title>
    </S.Container>
  );
}

export default Button;