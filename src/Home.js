import React, { Component } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import Deck from './Deck';
import { DATA } from './data';

export default class Home extends Component {
  renderNoMoreCards(){
    return (
      <View style={styles.card}>
        <Text>
          BOI OH BOI NO MORE CHIX MAGARAL KA NAMAN TANGA KA
        </Text>
      </View>
    )
  }

  renderCard(item) {
    return (
      <View style={styles.card}>
        <Image source={{uri: item.uri}} style={styles.image}/>
        <Text>{item.text}</Text>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.button}> 
            <Text style={styles.buttonText}>
              Fuck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck 
          onRenderCard={this.renderCard}
          onRenderNoMoreCards={this.renderNoMoreCards}
          data={DATA}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginLeft: 10,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  image: {
    width: 250, 
    height: 250,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    margin: 20,
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'blue',
    alignItems: 'center'
  },
  buttonWrapper: {
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '800'
  }
});
