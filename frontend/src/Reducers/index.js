// Reducers/index.js
import { combineReducers } from 'redux';
import cartReducer from './cart/cartReducer';
import invoiceReducer from './invoice/invoiceReducer';
import authReducer from '../Reducers/auth/authReducer'; 
import orderReducer  from '../Reducers/order/orderReducer'; 
const rootReducer = combineReducers({
  cart: cartReducer,
  invoice: invoiceReducer,
  auth: authReducer, 
  invoices: invoiceReducer,
  orders: orderReducer,
});

export default rootReducer;
