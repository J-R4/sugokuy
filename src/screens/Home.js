import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home(props) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Sugokuy, <strong>Good People</strong></Text>
      <Button
        title='Play Sugokuy'
        onPress={() => props.navigation.navigate('Sugokuy', {
          name: 'Josh',
          difficulty: 'random'
        })} />
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

/**
 * navigation.navigate
 * Home -> Board -> navigate lagi ke home, dia kaan cek dulu di stack, kalau ada maka dia ga akan nambah
 * 
 * navigation.push
 * Home -> Board -> Home
 * 
 * navigation.replace
 * Home -> Board -> Finish
 */