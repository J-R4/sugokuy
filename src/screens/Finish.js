import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function Finish({route, navigation}) {
  const { name, difficulty, time } = route.params
  const [count, setCount] = useState(1)
  const [gif, setGif] = useState('')

  useEffect(() => {
    fetch('https://g.tenor.com/v1/search?winning&key=66YN2LW5JYQL')
      .then(res => res.json())
      .then(res => {
        console.log(res,'ini dari res')
        setGif(res.results[Math.floor(Math.random() * (res.results).length - 1)].media.tinygif.url ? res.results[Math.floor(Math.random() * (res.results).length - 1)].media.tinygif.url : 'https://media.tenor.com/images/07b7e39236a37284480cb5bc7f349a8a/tenor.gif')
      })
  }, [])

  return (
    <View style={styles.container}>
      <Image source={{uri: gif}} />
      <View style={{ alignItems: 'center' ,marginBottom: 20}}>
        <Text>Congrats for finishing the game on {difficulty} difficulty,</Text>
        <Text style={styles.boldText}>{name} :)) </Text>
      </View>

      <DataTable style={{textAlign: 'center', marginBottom: 20, borderColor: 'green'}}>
        <DataTable.Header>
          <DataTable.Title>Id</DataTable.Title>
          <DataTable.Title>Username</DataTable.Title>
          <DataTable.Title>Difficulty</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>{count}</DataTable.Cell>
          <DataTable.Cell>{name}</DataTable.Cell>
          <DataTable.Cell>{difficulty}</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
      
      <Button
        title='Home'
        onPress={() => navigation.navigate('Home')}/>
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