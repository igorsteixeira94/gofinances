import React from 'react';

import * as S from './styles';

interface Props {
  title: string;
  amount: string;
  color: string;
}

const HistoryCard  = ({title,amount,color}:Props) => {
  return (
    <S.Container color={color}>
      <S.Title>{title}</S.Title>
      <S.Amount>{amount}</S.Amount>
    </S.Container>
  )
}

export default HistoryCard;