import React from 'react';
import { View } from 'react-native';
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps{}
import * as S from './styles';

const Input = ({...rest}:Props) => {

  return <S.Container {...rest} />;
  
}

export default Input;