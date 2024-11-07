import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import BirthdayCard from './components/Birthday';

const theme = {
  colors: {
    primary: '#4A6741',
    accent: '#8BA888',
    background: '#E8E8E8',
    surface: '#FFFFFF',
    text: '#484848',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
        <BirthdayCard />
      </SafeAreaView>
    </PaperProvider>
  );
}