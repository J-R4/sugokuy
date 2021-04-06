import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Finish(props) {
  return (
    <View style={styles.container}>
      <Text>Congrats for finisihing the game, <strong>Good People</strong></Text>
      <Button
        title='Home'
        onPress={() => props.navigation.navigate('Home')}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})