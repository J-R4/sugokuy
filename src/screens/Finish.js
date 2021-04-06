import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Finish(props) {
  return (
    <View style={styles.container}>
      <Text>Congrats for finishing the game on {props.route.params.difficulty} difficulty,</Text>
      <Text style={styles.boldText}>{props.route.params.name} :)) </Text>
      <Button
        title='Home'
        onPress={() => props.navigation.navigate('Home')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  boldText: {
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})