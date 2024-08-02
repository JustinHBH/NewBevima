// authActions.js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';



export const loginSuccess = (username, userid) => ({
    type: LOGIN_SUCCESS,
    payload: { username, userid },
  });
  
  export const logoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
  });

  export const registerSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: { data },
  });
