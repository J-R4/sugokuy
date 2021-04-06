import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Game(props) {
  const [board, setBoard] = useState([])

  useEffect(() => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=random`)
      .then(res => res.json())
      .then(res => {
        setBoard(res.board)
      })
  }, [])
  return (
    <View style={styles.container}>
      {
        board.map((row, iRow) => {
          return (
            <View key={iRow} style={{ flexDirection: 'row' }}>
              {
                row.map((col, iCol) => {
                  return (
                    <Text style={styles.box}  key={iCol}>{col}</Text>
                  )
                })
              }
            </View>  
          )
        })
      }
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
  },
  box: {
    width: 35,
    height: 35,
    borderWidth: 1
  }
})