import { INCREMENT_REQUEST } from './action';

const initialState = { delta: false };

const counterReducer = (state = initialState, action: any) => {
  console.log("delta", action, state.delta);
  
  switch (action.type) {
    case INCREMENT_REQUEST:
      return { ...state, delta: action.payload };
    // case 'decrement':
    //   return { ...state, value: state.value - 1 };
    // case 'incrementByAmount':
    //   return { ...state, value: state.value + action.payload };
    default:
      return state;
  }
};

export default counterReducer;
