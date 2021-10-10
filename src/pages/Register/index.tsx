import React, {useState} from 'react';
import {Modal} from 'react-native';
import Button from '../../components/Form/Button';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import Input from '../../components/Form/Input';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import CategorySelect from '../CategorySelect';

import * as S from './styles';


const Register= () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const handleTransactionsTypeSelect = (type: 'up' | 'down') =>{
    setTransactionType(type);
  }

  const handleCloseSelectCategoryModal = () =>{
    setCategoryModalOpen(false)
  }

  const handleOpenSelectCategoryModal = () =>{
    setCategoryModalOpen(true)
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        
        <S.Fields>
          <Input 
            placeholder="Nome"      
          />
          <Input 
            placeholder="Preço"      
          />
          <S.TransactionsTypes>

            <TransactionTypeButton 
              title={'Income'} 
              type={'up'} 
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton 
              title={'Outcome'} 
              type={'down'} 
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === "down"}
            />
         
          </S.TransactionsTypes>

          <CategorySelectButton 
            title={category.name} 
            onPress={handleOpenSelectCategoryModal}
          />

        </S.Fields>

        <Button title={'Enviar'} />
      </S.Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category} 
          setCategory={setCategory} 
          closeSelectCategory={handleCloseSelectCategoryModal} 
        />
      </Modal>
    </S.Container>
  );
}

export default Register;