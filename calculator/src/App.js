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

//This function provides value formatting creating space seperators for the numbers
const toLocaleString = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")

const removeSpaces = num => num.toString().replace(/\s/g, "")

//The "flat()" method makes a new array wit hall the subarrays combined into whichever level we want to. In this case since we didn't specify the number of "flat" we want it'll drop all arrays down one level
//The "map()" method makes it so we can create a new array based on wah we can to occur to the previous numbers. In this case we map it out based on the "btn" and "i"
const App = () => {
  //Hwew we etup the "useState" to make the buttons work
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0
  })

  //numClickHandler Function Start
  //numClick triggers only when 0-9 i clicked
  const numClickHandler = e => {
    e.preventDefault()
    const value = e.target.innerHTML

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num: calc.num === 0 && value === "0" ? "0" : removeSpaces(calc.num) % 1 === 0 ? toLocaleString(Number(removeSpaces(calc.num + value))) : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res
      })
    }
  }
  //numClickHandler Function End

  //commaClickHandler Start
  //This function occurs when the comma is pressed adding a comma to the current num value making it a decimal number it's also ocndition so extra decimals can't be added
  const commaClickHandler = e => {
    e.preventDefault()
    const value = e.value.innerHTML

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num
    })
  }
  //commaClickhanlder Function End

  //signClickHandler function Start
  // This funciotn occurs when the +,-,* or / sigs are pressed and is set for the "sign" value
  const signClickHandler = e => {
    e.preventDefault()
    const value = e.target.innerHTML

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0
    })
  }
  //signclickHandler Function End

  //equalsClickhandler Function Starts
  //Calculates the results when the = sign is pressed and the returned value is set a new res for further calculations
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) => (sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b)

      setCalc({
        ...calc,
        res: calc.num === "0" && calc.sign === "/" ? "Can't divide with 0" : toLocaleString(math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), calc.sign)),
        sign: "",
        num: 0
      })
    }
  }
  //eqaulsClickHandler Function End

  //invertClickHandler Function Starts
  //Checks if there is any calculated res value already in and then inverts them by multiplying my -1
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: ""
    })
  }
  //invertClcikHandler Function Ends

  //percentClickhandler Function Starts
  //checks if the num or res value is being calculated for the percentage
  //We use the built in "Math.pow" function to calculate the percentage
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: ""
    })
  }
  //percentClickHandler Function Ends

  //resetClickHanlder Function Starts
  //Sets all values within the calc object into a default state
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0
    })
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
