import { Textfit } from "react-textfit"
import "./Screen.css"
import React from "react"

const Screen = ({ value }) => {
  return (
    <React.Fragment>
      <Textfit className="Screen" mode="single" max={70}>
        {value}
      </Textfit>
    </React.Fragment>
  )
}

export default Screen
