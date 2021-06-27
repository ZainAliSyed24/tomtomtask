import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonView } from '../../reuseableComponents';
import {dispatchNearByRestaurants} from '../../dispatch';

const constants = {
  lat: '37.337',
  lon: '-121.89',
  key: 'zmcr0ehB1AHQYpavoBBCHypGhRWa3kqq'
}

export default class Home extends Component {

  nearByRestaurants = () => {
    console.log('nearByRestaurants')
    dispatchNearByRestaurants(
      constants,
      (data) => {console.log('summary, results', data)},
      (err) => console.log(err)  
    )
  }

  render() {
    return (
      <View style={styles.container}>        
        <ButtonView
          style={{margin: 20, padding: 20, backgroundColor: 'blue'}}
          onPress={this.nearByRestaurants}
        ><Text>Nearby Restaurants</Text></ButtonView>
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});