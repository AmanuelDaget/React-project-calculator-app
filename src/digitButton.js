
export const DigitButton = ({dispatch,digit}) => {
    return (
        <button onClick={() => dispatch({type: "add_digit" , payload: {digit} })}> { digit } </button>
    )
}