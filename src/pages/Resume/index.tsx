import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoryCard from '../../components/HistoryCard';
import {VictoryPie} from 'victory-native'

import * as S from './styles';
import { categories } from '../../utils/categories';


interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string
}

interface CategoryData {
  key: string;
  name: string;
  color: string;
  totalFormatted: string;
  total: number;
}

const Resume= () => {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  const loadData = async() => {
    
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter((expensive:TransactionData) => expensive.type === "negative");

    

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive:TransactionData) => {
        
        
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);

          
        }

        const existsCategory = totalByCategory.find(total => total.key === category.key)


        if(categorySum > 0 && !existsCategory){
          
          totalByCategory.push({
            key: category.key,
            name: category.name,
            totalFormatted: categorySum.toLocaleString('pt-BR', {
              style: 'currency',
              currency:'BRL'
            }),
            total: categorySum,
            color: category.color,
          });
        }

      });
        
    });
    console.log(totalByCategory)
    setTotalByCategories(totalByCategory);

    
  }

  useEffect(()=>{
    loadData();
    
  },[]);


  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      <VictoryPie
          data={totalByCategories}
          x="name"
          y="total"
        />

      <S.Content>

      {
        totalByCategories.map(totalCategory => {
          
          return (
            <HistoryCard 
              key={totalCategory.key}
              amount={totalCategory.totalFormatted}
              title={totalCategory.name}
              color={totalCategory.color}
            />
          )
        })
      }
      </S.Content>


      
    </S.Container>
  )
}

export default Resume;