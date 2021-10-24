import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState} from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'styled-components';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard,{ TranscationCardProps } from '../../components/TransactionCard';
import * as S from './styles';


export interface IDataListProps extends TranscationCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface IHighlightData {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}


const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<IDataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightData>({} as IHighlightData);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  const getLastTransactionDate = (collection:IDataListProps[], type:'positive' | 'negative') =>{
    const lastTransaction = new Date(
      Math.max.apply(Math, collection
          .filter(transaction => transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime())
      )
    )

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
      month: 'long'
    })}`;

  }

  const loadTransactions = async() =>{
    setIsLoading(true);
    try {
      const dataKey = '@gofinances:transactions';

      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];

      let entriesTotal = 0;
      let expensiveTotal = 0;

      const transactionsFormatted: IDataListProps[] = transactions.map((item:IDataListProps) =>{
        const amount = Number(item.amount).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

        if(item.type === "positive"){
          entriesTotal += Number(item.amount);
        }else{
          expensiveTotal += Number(item.amount);
        }
  
        
        const date = Intl.DateTimeFormat('pt-BR',{
          day:'2-digit',
          month:'2-digit',
          year:'2-digit',
        }).format(new Date(item.date));
  
        return {
          id: item.id,
          name: item.name,
          amount,
          date,
          type: item.type,
          category: item.category
        }
  
      });
      
      
      setTransactions(transactionsFormatted);
      let total = entriesTotal - expensiveTotal
      
      setHighlightData({
        entries: { 
          amount: entriesTotal.toLocaleString('pt-BR',{
          style: 'currency',
          currency:'BRL'
        }),
        lastTransaction: getLastTransactionDate(transactions,'positive')
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR',{
          style: 'currency',
          currency:'BRL'
        }),
        lastTransaction: getLastTransactionDate(transactions,'negative')
      },
      total: {
        amount: total.toLocaleString('pt-BR',{
          style: 'currency',
          currency:'BRL'
        }),
        lastTransaction: `01 à ${highlightData.expensives.lastTransaction}`
      }
      })
    } catch (error) {
      
    }finally{
      
      setIsLoading(false);
    }


  }

  useFocusEffect(useCallback(()=>{
    loadTransactions();
  },[]))
  return (
    <S.Container>
      <StatusBar style="light" />
     {isLoading ? 
      <S.LoadView >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </S.LoadView>
      : 
      <>
        <S.Header>
          <S.UserWrapper>
            <S.UserInfo>
              <S.Photo source={{uri:"https://avatars.githubusercontent.com/u/47749249?v=4"}} />
              <S.User>
                <S.UserGreeting>Olá, </S.UserGreeting>
                <S.UserName>Rodrigo</S.UserName>
              </S.User>
            </S.UserInfo>
            <S.LogoutButton onPress={()=>{}}>
              <S.Icon name="power" /> 
            </S.LogoutButton>
            
          </S.UserWrapper>
        </S.Header>
        <S.HighlightCards>
          <HighlightCard 
            type="up"
            title="Entradas" 
            amout={highlightData.entries?.amount} 
            lastTrasaction={`Última entrada dia ${highlightData.entries?.lastTransaction}`}
          />
          <HighlightCard 
            type="down"
            title="Saídas" 
            amout={highlightData.expensives?.amount} 
            lastTrasaction={`Última saída dia ${highlightData.expensives?.lastTransaction}`}
          />
          <HighlightCard 
            type="total"
            title="Total" 
            amout={highlightData.total?.amount} 
            lastTrasaction={highlightData.total?.lastTransaction}
          />
        </S.HighlightCards>

        <S.Transactions>
          <S.Title>Listagem</S.Title>
          <S.TransactionsList
            data={transactions}
            keyExtractor={(item,index) => item.id}
            renderItem={({item}) => <TransactionCard data={item} />}
            
          />
  
        </S.Transactions>
      </>
    }
      
      </S.Container>
  );
}

export default Dashboard;