import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/Home';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Home/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
