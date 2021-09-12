import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './src/components/Welcome';

interface IPRopsApp{
  name:string;
}

export default function App({name}:IPRopsApp) {
  return (
    <View style={styles.container}>
      <Welcome title="Oii" />
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
