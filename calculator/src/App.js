import React, { useState } from "react"
import Wrapper from "./components/Wrapper/Wrapper"
import Screen from "./components/Screen/Screen"
import ButtonBox from "./components/ButtonBox/ButtonBox"
import Button from "./components/Button/Button"

//These are the values ofthe buttons we will place in the ButtonBox
const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
]

//The "flat()" method makes a new array wit hall the subarrays combined into whichever level we want to. In this case since we didn't specify the number of "flat" we want it'll drop all arrays down one level
//The "map()" method makes it so we can create a new array based on wah we can to occur to the previous numbers. In this case we map it out based on the "btn" and "i"
const App = () => {
  //Hwew we etup the "useState" to make the buttons work
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0
  })

  //numClick triggers only when 0-9 i clicked
  const numClickHandler = e => {
    e.preventDefault()
    const value = e.target.innerHTML

    if (calc.num.length < 16) {
      setCalc({
        ...calc,
        num: calc.num === 0 && value === "0" ? "0" : calc.num % 1 === "0" ? Number(calc.num + value) : calc.num + value,
        res: !calc.sign ? 0 : calc.res
      })
    }
  }

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {btnValues.flat().map((btn, i) => {
          return <Button key={i} className={btn === "=" ? "equals" : ""} value={btn} onClick={btn === "C" ? resetClickHandler : btn === "+-" ? invertClickHandler : btn === "%" ? percentClickHandler : btn === "=" ? equalsClickHandler : btn === "/" || btn === "X" || btn === "-" || btn === "+" ? signClickHandler : btn === "." ? commaClickHandler : numClickHandler} />
        })}
      </ButtonBox>
    </Wrapper>
  )
}

export default App
