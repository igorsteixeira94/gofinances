import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IWelcomeProps{
  title:string;
}
const Welcome= ({title}:IWelcomeProps) => {
  return (
    <View style={styles.container}>
    <Text>{title}</Text>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Welcome;