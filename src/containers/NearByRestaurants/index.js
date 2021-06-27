import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ButtonView, FlatListHandler } from '../../reuseableComponents';
import {dispatchNearByRestaurants} from '../../dispatch';
import {Images} from '../../theme'
import {useSelector} from 'react-redux';

const constants = {
  lat: '37.337',
  lon: '-121.89',
  key: 'zmcr0ehB1AHQYpavoBBCHypGhRWa3kqq'
}

export default NearByRestaurants = () => {
  const [nearByRestaurantsList, setNearByRestaurants] = useState([]);

  useEffect(() => {
    dispatchNearByRestaurants(
      constants,
      (data) => {
        setTimeout(() => setNearByRestaurants(data.results), 1000)        
      },
      (err) => console.log(err)  
    );
  }, []);

  const _renderItem = ({item, index}) => {
    console.log(index, item)
    return (
      <View style={styles.eachItemContainer}>
        <Image source={index % 2 == 0 ? Images.img01 : Images.img02} style={styles.imgStyle}/>
        <View style={styles.detailContainer}>         
          <Text 
            style={styles.nameStyle}
            numberOfLines={1}
            ellipsizeMode={'tail'}
          >
            {item.poi.name}
          </Text>
          <Text style={styles.phoneStyle}>{item.poi.phone}</Text>
          <Text style={styles.categoryStyle}>{item.poi.categories.join(', ')}</Text>
          <Text>{item.address.freeformAddress}</Text> 
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>              
      <FlatListHandler
        data={nearByRestaurantsList}
        renderItem={_renderItem}
        style={{marginHorizontal: 20, flex: 1}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  eachItemContainer: {
    flex: 1, 
    marginVertical: 10, 
    paddingVertical: 20, 
    paddingHorizontal: 10, 
    backgroundColor: 'white', 
    flexDirection: 'row',
    borderRadius: 8
  },
  imgStyle: {
    height: 120, 
    width: 100
  },
  detailContainer: {
    flex: 2, 
    padding: 5
  },
  nameStyle: {
    fontSize: 20, 
    fontWeight: "bold",     
  },
  phoneStyle: {
    marginVertical: 5
  },
  categoryStyle: {
    fontStyle: 'italic', 
    fontSize: 14
  }
});