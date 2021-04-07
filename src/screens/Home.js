import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, Picker, Image } from 'react-native';

export default function Home(props) {
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState('easy');

  const playKuy = () => {
    if (name && difficulty) {
      props.navigation.navigate('Sugokuy', {
        name,
        difficulty
      })
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{uri:'https://silverandgold.s3-ap-southeast-1.amazonaws.com/SUGOKUY.png'}} style={{width: 200, height: 150}} />
      <View style={styles.top}>
        <Text>Welcome to sugoKUY,</Text>
        <TextInput
          style={styles.inputText}
          placeholder='insert your name'
          onChangeText={setName}
          value={name}
          />
      </View>
      <Text>Pick Difficulty :</Text>
      <Picker
        selectedValue={difficulty}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setDifficulty(itemValue)}
      >
        <Picker.Item label="easy" value="easy" />
        <Picker.Item label="medium" value="medium" />
        <Picker.Item label="hard" value="hard" />
        <Picker.Item label="random" value="random" />
      </Picker>

      <Button
        title='Play SUGOKUY'
        onPress={playKuy} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputText: {
    borderBottomColor: 'green',
    borderBottomWidth: 1,
    alignItems: 'center'
  }
})