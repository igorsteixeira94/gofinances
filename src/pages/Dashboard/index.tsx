import { StatusBar } from 'expo-status-bar';
import React from 'react';
import HighlightCard from '../../components/HighlightCard';
import * as S from './styles';

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
          <S.Icon name="power" />
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
      
      </S.Container>
  );
}

export default Dashboard;