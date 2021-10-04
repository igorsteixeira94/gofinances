import React from 'react';
import { View } from 'react-native';

import * as S from './styles';

interface Category {
  name: string;
  icon: string;

}

interface Props {
  data : {
    title: string;
    amount: string;
    category: Category;
    date: string;  
  }
}

const TransactionCard = ({data:{title,amount,category,date}}:Props) => {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Amount>{amount}</S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name="dollar-sign"/>
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>

        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  )
}

export default TransactionCard;