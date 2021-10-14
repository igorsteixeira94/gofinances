import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import {Alert, Keyboard, Modal, TouchableWithoutFeedback} from 'react-native';
import Button from '../../components/Form/Button';
import CategorySelectButton from '../../components/Form/CategorySelectButton';
import InputForm from '../../components/Form/InputForm';
import TransactionTypeButton from '../../components/Form/TransactionTypeButton';
import CategorySelect from '../CategorySelect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';

import * as S from './styles';


interface FormData {
  name:string;
  amount:string
}

const schema = Yup.object().shape({
  name: Yup.
    string()
    .required('Nome é obrigatório'),
  amount: Yup
    .number()
    .typeError('Informe um valor númerico')
    .positive('O valor não pode ser negativo')
    .required('Valor é obrigatório')
})



const Register= () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const { navigate } = useNavigation() as {navigate:(name:string)=>void;};
  
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {control, handleSubmit, formState:{errors}, reset} = useForm({resolver:yupResolver(schema)});

  const handleTransactionsTypeSelect = (type: 'positive' | 'negative') =>{
    setTransactionType(type);
  }

  const handleCloseSelectCategoryModal = () =>{
    setCategoryModalOpen(false)
  }

  const handleOpenSelectCategoryModal = () =>{
    setCategoryModalOpen(true)
  }

  const handleRegister = async (form:FormData) => {
    if(!transactionType)
      return Alert.alert('Selecione o tipo da transação.');

    if(category.key === "category")
      return Alert.alert('Selecione uma categoria.');

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }
    try {
      const dataKey = '@gofinances:transactions';
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]
      navigate('Listagem');
      await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted));
      setTransactionType('');
      setCategory({
        key:'category',
        name:'Categoria'
      });
      reset();
      
      
    } catch (error) {
      
      Alert.alert('Não foi possível salvar.')
    }
  }

    return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

        <S.Form>
          
          <S.Fields>
            <InputForm 
              name={"name"}
              control={control}
              placeholder="Nome"
              autoCapitalize={"sentences"}
              autoCorrect={false}  
              error={errors.name && errors.name.message}    
            />
            <InputForm 
              name={"amount"}
              control={control}
              placeholder="Preço"
              keyboardType={"numeric"}  
              error={errors.amount && errors.amount.message}    
            />
            <S.TransactionsTypes>

              <TransactionTypeButton 
                title={'Income'} 
                type={'positive'} 
                onPress={() => handleTransactionsTypeSelect('positive')}
                isActive={transactionType === "positive"}
              />
              <TransactionTypeButton 
                title={'Outcome'} 
                type={'negative'} 
                onPress={() => handleTransactionsTypeSelect('negative')}
                isActive={transactionType === "negative"}
              />
          
            </S.TransactionsTypes>

            <CategorySelectButton 
              title={category.name} 
              onPress={handleOpenSelectCategoryModal}
            />

          </S.Fields>

          <Button 
            title={'Enviar'} 
            onPress={handleSubmit(handleRegister)}
          />
        </S.Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect 
            category={category} 
            setCategory={setCategory} 
            closeSelectCategory={handleCloseSelectCategoryModal} 
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
}

export default Register;