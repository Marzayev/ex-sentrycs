import React, { useState, useEffect } from 'react'
import checkWord from 'check-if-word'
import MyActionListener from '../MyActionListener'
import Square from './Square'
import Keyboard from './Keyboard'
import './CharacterInput.css'

const CharacterInput = () => {

  const [squares, setSquares] = useState(Array(5).fill(''))
  const [borderColor, setBorderColor] = useState('lightgray')
  const [actionListener] = useState(new MyActionListener())
  const words = checkWord('en');

  useEffect(() => {
    actionListener.registerListener('CHARACTER_CLICK', handleCharacterClick)
    actionListener.registerListener('BACKSPACE', handleBackspace)
    actionListener.registerListener('ENTER', handleEnter)

    return () => {
      actionListener.removeListener('CHARACTER_CLICK')
      actionListener.removeListener('BACKSPACE')
      actionListener.removeListener('ENTER')
    }
  }, [])

  const handleCharacterClick = (char) => {
    setSquares((prevSquares) => {
      const newSquares = [...prevSquares]
      const emptyIndex = newSquares.indexOf('')
      if (emptyIndex !== -1) {
        newSquares[emptyIndex] = char
      }

      return newSquares
    })
  }

  const handleBackspace = () => {
    setSquares((prevSquares) => {
      const newSquares = [...prevSquares]
      const lastFilledIndex = newSquares.indexOf('')
      const indexToClear = lastFilledIndex === -1 ? newSquares.length - 1 : lastFilledIndex - 1
      if (indexToClear >= 0) {
        newSquares[indexToClear] = ''
      }

      return newSquares
    })
  }

  const handleEnter = () => {
    setSquares((prevSquares) => {
      const currentWord = prevSquares.join('')
      if (currentWord.length === squares.length) {
        words.check(currentWord) ? setBorderColor('green') : setBorderColor('red')
      }

      return prevSquares
    })
  }

  return (
    <div>
      <div id="squares-container">
        {squares.map((char, index) => (
          <Square key={index} char={char} borderColor={borderColor} />
        ))}
      </div>
      <Keyboard actionListener={actionListener} />
    </div>
  )
}

export default CharacterInput