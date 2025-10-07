function Intro() {
  return (
    <div>
        <h1 className="gameName">Tensies</h1>
        <h2 className="introHeader">Game playing Instruction</h2>
        <section className="intro-Para">
          <p>Click on same dices to lock them. Then rolls again, then click on same dices. After all are locked game will be over. </p>
          <p>Click on newgame button to start a new game</p>
          <p>For example: Select a number 3. You have to lock 3 in the beginning and everytime after a roll. When all three are locked(turn to red) then game is over. </p>
        </section>
    </div>
  )
}

export default Intro