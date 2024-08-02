const initialState = {
    count: 0  
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ORDER_COUNT':
        return {
          ...state,
          count: action.payload
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;
  