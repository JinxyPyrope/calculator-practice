import "./Button.css"

//We connected the buttons to the btnValues in the App.js so that each 
const Button = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  )
}

export default Button
