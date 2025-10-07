import { useEffect, useRef, useState } from "react";
import Die from "./components/Die";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Intro from './components/Intro.jsx';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import VideoPage from './components/VideoPage.jsx';
import React from "react";

export default function App(){
  const [dice, setDice] = useState(() => generateAllNewDice()) //this is the dice array, we gotta map over it to get individual values
  const buttonRef = useRef(null)

  // check if the game is won
  const gameWon = dice.every((prevValue) => (
    prevValue.isHeld && prevValue.value === dice[0].value //compare to any one value of dice which is being held. 
  ))

  // press enter to start a new game
  useEffect(() => {
    if(gameWon){
      buttonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice(){
    // returns an array of 10 numbers btewwn 1 - 6 inclusive
      return new Array(10)
                  .fill(0)
                  .map(() => ({
                    value: Math.ceil(Math.random() * 6),
                    isHeld: false,
                    id: nanoid()
                  }))
  }

  function hold(id){
    setDice(oldDice => oldDice.map(die => (
      die.id === id ? {...die, isHeld : !die.isHeld} : die
    )))
  }

  const diceElements = dice.map(dieObject => (
    <Die 
      key = {dieObject.id} 
      value = {dieObject.value} 
      isHeld = {dieObject.isHeld} 
      hold = {() => hold(dieObject.id)}
    />
  ))

  const rollDice = () => {
    if(!gameWon){
      setDice(oldDice => oldDice.map(die => (
        // if isHeld property has not changed then that perticular Die value have to change, by clicking on Roll button
        die.isHeld ? die : {...die, value: Math.ceil(Math.random() * 6)
        }
      )))
    } else {
      setDice(generateAllNewDice())
    }
  }
  
  return (
    <>
      <section className="gameIntro">
        <Intro/>
      {/* Navigate to video page */}
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px" }}>
                  <Link to="/video">
                    <button type="button" className="videoButton">Watch Demo Video</button>
                  </Link>
                </div>
              }
            />
            <Route path="/video" element={<VideoPage />} />
          </Routes>
        </Router>
      </section>

      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all the dice are same. Click each die to freeze it at its current value between rolls. </p>
        
        <div aria-live="polite" className="sr-only">
          {gameWon && <p>congratulations! You won. Press New game button to start again</p>}
        </div>
        <div className="dice-container">
          {diceElements}
        </div>
        <button ref={buttonRef} className="roll-dice" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
        {gameWon && <Confetti/>}
      </main>
    </>
  )
}