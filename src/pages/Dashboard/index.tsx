import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HighlightCard from '../../components/HighlightCard';
import TransactionCard,{ TranscationCardProps } from '../../components/TransactionCard';
import * as S from './styles';


export interface IDataListProps extends TranscationCardProps {
  id: string;
}

const data: IDataListProps[] = [
  {
    id:"1",
    type:'positive',
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category:{
      name: 'Vendas',
      icon: 'dollar-sign'
    },
    date:'13/04/2021'
  },
  {
    id:'2',
    type:'negative',
    title: "Hambugueria Pizzy",
    amount: "R$ 59,00",
    category:{
      name: 'Alimentação',
      icon: 'coffee'
    },
    date:'13/04/2021'
  },
  {
    id:'3',
    type:'negative',
    title: "Aluguel do apartamento",
    amount: "R$ 1.200,00",
    category:{
      name: 'Casa',
      icon: 'shopping-bag'
    },
    date:'13/04/2021'
  },
];

const Dashboard: React.FC = () => {
  return (
    <S.Container>
      <StatusBar style="light" />
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
          amout="17.400,00" 
          lastTrasaction="Última entrada dia 13 de abril" 
        />
        <HighlightCard 
          type="down"
          title="Saídas" 
          amout="1.259,00" 
          lastTrasaction="Última entrada dia 03 de abril" 
        />
        <HighlightCard 
          type="total"
          title="Total" 
          amout="16.141,00" 
          lastTrasaction="01 à 16 de abril" 
        />
      </S.HighlightCards>

      <S.Transactions>
        <S.Title>Listagem</S.Title>
        <S.TransactionsList
          data={data}
          keyExtractor={(item,index) => item.id}
          renderItem={({item}) => <TransactionCard data={item} />}
          
        />
 
      </S.Transactions>
      
      </S.Container>
  );
}

export default Dashboard;