import React from 'react'
import './Keyboard.css'

const Keyboard = ({ actionListener }) => {

  const handleCharacterClick = (char) => {
    actionListener.emit('CHARACTER_CLICK', char)
  }

  const handleBackspace = () => {
    actionListener.emit('BACKSPACE')
  }

  const handleEnter = () => {
    actionListener.emit('ENTER')
  }

  const genAlphArray = (charA, charZ) => {
    let arr = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0)

    for (; i <= j; ++i) {
      arr.push(String.fromCharCode(i))
    }

    return arr
  }

  return (
    <div>
      <div className="keyboard">
        {genAlphArray('A', 'Z').map((char) => (
          <button
            key={char}
            onClick={() => handleCharacterClick(char)}
            className="character-button"
          >
            {char}
          </button>
        ))}
      </div>
      <button onClick={handleBackspace} className="control-button">DELETE</button>
      <button onClick={handleEnter} className="control-button">ENTER</button>
    </div>
  )
}

export default Keyboard