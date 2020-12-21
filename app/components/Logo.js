import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';

import logoImg from './img/logo.png';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} resizeMode="contain" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 20,
    marginRight: 20,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    paddingLeft: 10,
  },
});
