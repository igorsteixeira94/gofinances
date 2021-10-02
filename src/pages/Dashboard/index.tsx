import React from 'react';
import HighlightCard from '../../components/HighlightCard';
import * as S from './styles';

const Dashboard: React.FC = () => {
  return (
    <S.Container>
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
        <HighlightCard />
        <HighlightCard />
        <HighlightCard />
      </S.HighlightCards>
      
      </S.Container>
  );
}

export default Dashboard;