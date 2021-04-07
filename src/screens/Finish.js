import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function Finish({route, navigation}) {
  const { name, difficulty, done } = route.params
  const [count, setCount] = useState(1)
  const [gif, setGif] = useState('')
  const [rank, setRank] = useState([])
  const [profiles, setProfiles] = useState([])
  const [dup, setDup] = useState(false)

  useEffect(() => {
    // for (let i = 0; i < profiles.length; i++) {
    //   if (profiles[i].name === name) {
    //     setDup(true)
    //   }
    // }
    // if (!dup) {
    //   setRank(...rank, done)
    //   setProfiles(...profiles, {id: count, name: name, difficulty: difficulty})
    // }

    fetch('https://g.tenor.com/v1/search?winning&key=66YN2LW5JYQL')
      .then(res => res.json())
      .then(res => {
        let randomNum = Math.floor(Math.random() * 20)
        setGif(res.results[randomNum].media[0].mediumgif.url)
      })
    // setDup(false)
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' ,marginBottom: 20}}>
        <Text>Congrats for finishing the game on {difficulty} difficulty,</Text>
        <Text style={styles.boldText}>{name} :)) </Text>
      </View>
      <Image
        source={{ uri: gif ? gif : 'https://media.tenor.com/images/17958b861b8c4baa0da99063cc4a5d20/tenor.gif' }}
        style={{width: 100, height:100, marginBottom: 20 }}
      />
      <DataTable style={{textAlign: 'center', marginBottom: 20, borderColor: 'green'}}>
        <DataTable.Header>
          <DataTable.Title>Rank</DataTable.Title>
          <DataTable.Title>Username</DataTable.Title>
          <DataTable.Title>Difficulty</DataTable.Title>
          <DataTable.Title>Time Solved</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>{count}</DataTable.Cell>
          <DataTable.Cell>{name}</DataTable.Cell>
          <DataTable.Cell>{difficulty}</DataTable.Cell>
          <DataTable.Cell>{done} seconds</DataTable.Cell>
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