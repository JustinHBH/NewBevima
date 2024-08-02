import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from '../auth/authActions';

const initialState = {
  isLoggedIn: false,
  username: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: 
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        userId: action.payload.userId, 
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        username: null,
        userId: null, 
      };
    default:
      return state;
  }
};

export default authReducer;
