// cartReducer.js

function safeParse(json, defaultValue = []) {
    try {
      return JSON.parse(json) || defaultValue;
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      return defaultValue;
    }
  }
  
  const persistedCart = safeParse(localStorage.getItem('cart'));
  const persistedFavorites = safeParse(localStorage.getItem('favorites'));
  
  const initialState = {
      items: persistedCart,
      favorites: persistedFavorites
  };
  
  const cartReducer = (state = initialState, action) => {
      let updatedItems = [...state.items];  
      let updatedFavorites = [...state.favorites];  
  
      switch (action.type) {
          case 'ADD_TO_CART':
              updatedItems.push(action.payload);
              break;
          case 'REMOVE_FROM_CART':
              updatedItems = updatedItems.filter(item => item.product_id !== action.payload);
              break;
          case 'INCREASE_QUANTITY':
              updatedItems = updatedItems.map(item => 
                  item.product_id === action.payload ? {...item, quantity: item.quantity + 1} : item);
              break;
          case 'DECREASE_QUANTITY':
              updatedItems = updatedItems.map(item => 
                  item.product_id === action.payload ? {...item, quantity: Math.max(item.quantity - 1, 0)} : item);
              break;
              case 'ADD_ONE_TO_CART':
                const index = updatedItems.findIndex(item => item.product_id === action.payload.product_id);
                if (index !== -1) {
                    const updatedItem = { ...updatedItems[index], quantity: updatedItems[index].quantity + 1 };
                    updatedItems = [
                        ...updatedItems.slice(0, index),
                        updatedItem,
                        ...updatedItems.slice(index + 1)
                    ];
                } else {
                    updatedItems.push({...action.payload, quantity: 1});
                }
                break;
          case 'ADD_TO_FAVORITES':
              if (!updatedFavorites.some(fav => fav.product_id === action.payload.product_id)) {
                  updatedFavorites.push(action.payload);
              }
              break;
          case 'REMOVE_FROM_FAVORITES':
              updatedFavorites = updatedFavorites.filter(fav => fav.product_id !== action.payload.product_id);
              break;
          case 'CLEAR_CART':
              updatedItems = [];
              break;
          default:
              return state;
      }
  
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  
      return {
          ...state,
          items: updatedItems,
          favorites: updatedFavorites
      };
  };
  
  export default cartReducer;
  