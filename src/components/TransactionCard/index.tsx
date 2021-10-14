import React from 'react';
import { View } from 'react-native';
import { categories } from '../../utils/categories';

import * as S from './styles';

interface ICategory {
  name: string;
  icon: string;

}

export interface TranscationCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;  
 
}

interface Props {
  data: TranscationCardProps
}

const TransactionCard = ({data:{name,amount,category,date,type}}:Props) => {
  const searchCategory = categories.find(item => item.key === category)
  return (
    <S.Container>
      <S.Title>{name}</S.Title>
      <S.Amount type={type}>
        {type ==="negative" && '- '}
        {amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={searchCategory?.icon}/>
          <S.CategoryName>{searchCategory?.name}</S.CategoryName>
        </S.Category>

        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  )
}

export default TransactionCard;