import { useReducer } from 'react';
import './calculatorStyle.css';
import { DigitButton } from './digitButton';
import { OperationButton } from './operationButton';

function reducer(state,{type,payload}){
   switch (type){
      case "add_digit":
         if (state.overwrite) {
            return (
              { ...state,
                currentOperand: payload.digit,
                overwrite: false,

              }
            )
         }
         if (payload.digit === "." && state.currentOperand?.includes(".")) {
           return state;
         }
         if (payload.digit === "0" && state.currentOperand?.includes("0")) {
            return state;
         }
         return (
           { ...state,currentOperand: `${state.currentOperand || ""}${payload.digit}`}
         )
      case "choose_operator":
            if(state.currentOperand === null && state.previousOperand === null){
              return state;
            }
            if(state.previousOperand === null){
              return (
                  { ...state,
                    operator: payload.operator,
                    previousOperand:state.currentOperand,
                    currentOperand:null,
                  }
                )
            }
            if(state.currentOperand === null && state.operator !== null){
                return (
                  { ...state,
                      operator: payload.operator,
                      
                  }
                )
            }
          if (state.operator !== null) {
              return (
                { ...state,
                    operator:payload.operator,
                    currentOperand:null,
                    previousOperand:calculate(state),

                }
              )
          }
            break;
      case "clear":
         return (
            { ...state,
               previousOperand:null,
               currentOperand:null,
               operator:null,
            }
         )
      case "delete_degit":
         if(state.currentOperand == null || state.currentOperand === ""){
          return (
             {state}
          )
         } 
         return (
             { ...state,
                currentOperand: state.currentOperand.slice(0,-1),
              
              }
           )
      case "calculate":
         if(state.currentOperand === null || state.previousOperand === null || state.operator === null){
           return state;
         }
       return (
          {...state,
            overwrite: true,
            previousOperand: null,
            operator:null,
            currentOperand: calculate(state),
          }
         )
      default:
        return state;
   }
}
 function calculate({previousOperand,currentOperand,operator}){
    let prev = parseFloat(previousOperand);
    let current = parseFloat(currentOperand);
    if(isNaN(current) || isNaN(prev)) return "";
    let computation = "";
    switch (operator) {
      case "+":
        computation= prev + current;
        break;
      case "-":
        computation= prev - current;
        break;
      case "/":
        computation= prev / current;
        break;
      case "*":
        computation= prev * current;
        break;
      default:
        break;
    }
   return computation.toString();
}
function App() {
  const [{previousOperand,currentOperand,operator},dispatch] = useReducer(reducer,{
    previousOperand: null,
  currentOperand: null,
  operator: null,
  });
  return (
    <div className="calculator">
        <div className='calculator-gride'>
           <div className='output'>
              <div className='previous-operand'> { previousOperand } { operator }</div>
              <div className='current-operand'> { currentOperand }</div>
           </div>
           <button className='span-two' onClick={() => dispatch({type: "clear"})}>AC</button>
           <button onClick={() => dispatch({type : "delete_degit"})}>DEL</button>
           <OperationButton operator="/" dispatch={dispatch} />
           <DigitButton digit="1" dispatch={dispatch} />
           <DigitButton digit="2" dispatch={dispatch} />
           <DigitButton digit="3" dispatch={dispatch} />
           <OperationButton operator="*" dispatch={dispatch} />
           <DigitButton digit="4" dispatch={dispatch} />
           <DigitButton digit="5" dispatch={dispatch} />
           <DigitButton digit="6" dispatch={dispatch} />
           <OperationButton operator="+" dispatch={dispatch} />
           <DigitButton digit="7" dispatch={dispatch} />
           <DigitButton digit="8" dispatch={dispatch} />
           <DigitButton digit="9" dispatch={dispatch} />
           <OperationButton operator="-" dispatch={dispatch} />
           <DigitButton digit="." dispatch={dispatch} />
           <DigitButton digit="0" dispatch={dispatch} />
           <button className='span-two' onClick={() => dispatch({type: "calculate"})}>=</button>
        </div>
    </div>
  );
}

export default App;
