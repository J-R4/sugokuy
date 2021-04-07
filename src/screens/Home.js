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
    } else {
      alert('insert your name first !')
    }
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://silverandgold.s3-ap-southeast-1.amazonaws.com/SUGOKUY.png' }} style={{ width: 200, height: 150 }} />
      <View>
        <View style={styles.top}>
          <View style={{ flexDirection: 'row'}}>
            <Text style={{ fontSize: 20 }}>Welcome to </Text>
            <Text style={{ fontWeight: 'bold',fontSize: 20 }}>sugoKUY,</Text>
          </View>
          <TextInput
            style={styles.inputText}
            placeholder='insert your name'
            onChangeText={setName}
            value={name}
            />
        </View>
        <View>
        <Text style={{ fontSize: 20 }}>Pick Difficulty :</Text>
          <Picker
            style={{borderWidth: 1, borderColor: 'green'}}
            selectedValue={difficulty}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue) => setDifficulty(itemValue)}
          >
            <Picker.Item label="easy" value="easy" />
            <Picker.Item label="medium" value="medium" />
            <Picker.Item label="hard" value="hard" />
            <Picker.Item label="random" value="random" />
          </Picker>
          </View>
        </View>

      <Button
        title='Play SUGOKUY'
        onPress={playKuy} />
    </View>
  )
}

const styles = StyleSheet.create({
  top: {
    marginBottom: 20
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 100
  },
  inputText: {
    borderBottomColor: 'green',
    borderBottomWidth: 1,
    alignItems: 'center',
    fontSize: 17
  }
})