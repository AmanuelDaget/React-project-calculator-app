
export const OperationButton = ({dispatch, operator }) => {
    return (
        <button onClick={() => dispatch({type: "choose_operator" , payload: { operator } })}>{ operator }</button>
    )
}