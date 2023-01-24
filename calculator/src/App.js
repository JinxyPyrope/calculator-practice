import React from "react"
import Wrapper from "./components/Wrapper/Wrapper"
import Screen from "./components/Screen/Screen"
import ButtonBox from "./components/ButtonBox/ButtonBox"
import Button from "./components/Button/Button"

function App() {
  return (
    <>
      <Wrapper>
        <Screen value="0" />
        <ButtonBox>
          <Button
            className=""
            value="0"
            onClick={() => {
              console.log("Button Clicked!")
            }}
          />
        </ButtonBox>
      </Wrapper>
    </>
  )
}
export default App
