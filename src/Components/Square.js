import React from 'react'
import './Square.css'

const Square = ({ char, borderColor }) => {
  return (
    <div className="square" style={{ borderColor: borderColor }}>
      {char}
    </div>
  )
}

export default Square