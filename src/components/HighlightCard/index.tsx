import React from 'react';

import * as S from './styles';

interface Props {
  title:string;
  amout:string;
  lastTrasaction:string;
  type: 'up' | 'down' | 'total';
};

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
};

const HighlightCard = ({amout,lastTrasaction,title,type}:Props) => {
  
  return (
    <S.Container type={type}>
      <S.Header>
        <S.Title type={type}>{title}</S.Title>
        <S.Icon 
          name={icon[type]}
          type={type}
        />
      </S.Header>
      <S.Footer>
        <S.Amount type={type}>{amout}</S.Amount>
        <S.LastTransaction type={type}>{lastTrasaction}</S.LastTransaction>
      </S.Footer>
    </S.Container>
  );
}

export default HighlightCard;