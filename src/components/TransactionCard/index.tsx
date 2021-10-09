import React from 'react';
import { View } from 'react-native';

import * as S from './styles';

interface ICategory {
  name: string;
  icon: string;

}

export interface TranscationCardProps {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: ICategory;
  date: string;  
 
}

interface Props {
  data: TranscationCardProps
}

const TransactionCard = ({data:{title,amount,category,date,type}}:Props) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Amount type={type}>
        {type ==="negative" && '- '}
        {amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={category.icon}/>
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>

        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  )
}

export default TransactionCard;