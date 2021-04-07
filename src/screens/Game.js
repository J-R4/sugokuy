import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StyleSheet, Text, View, Button, Dimensions, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CountDown from 'react-native-countdown-component';
import { StackActions } from '@react-navigation/native';

export default function Game(props) {
  const dispatch = useDispatch()
  const [board, setBoard] = useState([])
  const [time, setTime] = useState(0)
  const [done, setDone] = useState(0)
  const [stillPlay, setStillPlay] = useState(true)
  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const LoadingText = useSelector(state => state.apps.LoadingText)
  const ErrorText = useSelector(state => state.apps.ErrorText)

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
    Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');
  
  useEffect(() => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${props.route.params.difficulty}`)
      .then(res => res.json())
      .then(res => {
        // console.log(res,'terbaru <<<<<<<')
        setBoard(res.board)
      })
      .catch((err) => {
        dispatch({type: 'error/set', payload: err})
      })
    
    setName(props.route.params.name)
    setDifficulty(props.route.params.difficulty)
    
    dispatch({ type: 'loading/set', payload: 'loading THE GOOD STUFF..' })
    
  }, [])

  useEffect(() => {
    if (!time && stillPlay && !board.length) {
      switch (props.route.params.difficulty) {
        case 'easy':
          setTime(600)
          break;
        case 'medium':
          setTime(1200)
          break;
        case 'hard':
          setTime(1800)
          break;
        default:
          setTime(1800)
          break;
      }
    }
  }, [])

  const inputNum = (num, iRow, iCol) => {
    // console.log(num)
    // console.log(iRow)
    // console.log(iCol)
    let newBoard = [...board]
    newBoard[iRow][iCol] = Number(num)
    setBoard(newBoard)
  }

  const submitIt = () => {
    console.log('validating !')
    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response =>
      {
        if (response.status === 'solved') {
          props.navigation.dispatch(
            StackActions.replace('Congrats', {
            name,
            difficulty,
            done: done
          }))
        } else {
          alert('Your answer has some wrong in it !')
        }
      })
      .catch(console.warn)
  }

  const solveIt = () => {
    console.log('mantap ketok magic solved !')
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams({board}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response =>
        setBoard(response.solution)
      )
      .catch(console.warn)
  }

  return (
    <View style={styles.container}>
      
      <Button
        title='Home'
        onPress={() => props.navigation.navigate('Home')} />
      
      <View style={{ alignItems: 'center' }}>
        {
          ErrorText && <Text style={{color: 'red'}}>{ ErrorText }</Text>
        }
        <Text>Difficulty: {difficulty}</Text>
        <Text>Time limit : {Math.round(time / 60)} minute</Text>
        <View style={{ flexDirection: 'row'}}>
          <Text>Good luck, </Text>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
        </View>
      </View>

      {
        board.length === 0 ? <Text style={{textAlign: 'center'}}>{LoadingText}</Text> :
          <View style={{
            alignItems: 'center'
          }}>
            <CountDown
              until={time}
              size={20}
              onFinish={() => {
                alert('Time is up !! You can do it better next time :)')
                props.navigation.navigate('Home')
              }}
              onChange={() => setDone(done + 1)}
              digitStyle={{backgroundColor: '#FFF'}}
              digitTxtStyle={{color: '#1CC625'}}
              timeToShow={['M', 'S']}
              timeLabels={{m: 'MM', s: 'SS'}}
            />
            {
              board.map((row, iRow) => {
              return (
                <View key={iRow} style={{ flexDirection: 'row' }}>
                  {
                    row.map((col, iCol) => {
                      return (
                        <TextInput style={styles.box}
                          key={iCol}
                          value={col === 0 ? '' : String(col)}
                          onChangeText={(text) => inputNum(text, iRow, iCol)}
                          keyboardType="numeric"
                          maxLength={1}
                          editable={col === 0 ? true : false}
                        />
                      )
                    })  
                  }
                </View>  
              )
            })
            }
          </View>
      }
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20
      }}>
        <Button
          title='Submit Answer'
          onPress={() => submitIt()} />
        <Button
          title='Solve it for me'
            onPress={() => solveIt()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingVertical: 100,
    paddingHorizontal: 50
  },
  box: {
    textAlign: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: 'green'
  }
})