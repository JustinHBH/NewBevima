// cartActions.js

export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_ONE_TO_CART = 'ADD_ONE_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const DECREASE_PRODUCT_QUANTITY = 'DECREASE_PRODUCT_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

export function addToCart(product) {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_TO_CART,
            payload: product
        });
        localStorage.setItem('cart', JSON.stringify(getState().cart.items));
    };
}

export function addOneToCart(product) {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_ONE_TO_CART,
            payload: product
        });
        localStorage.setItem('cart', JSON.stringify(getState().cart.items));
    };
}

export function removeFromCart(product_id) {
    return (dispatch, getState) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: product_id
        });
        localStorage.setItem('cart', JSON.stringify(getState().cart.items));
    };
}

export function increaseQuantity(product_id) {
    return (dispatch, getState) => {
        dispatch({
            type: INCREASE_QUANTITY,
            payload: product_id
        });
        localStorage.setItem('cart', JSON.stringify(getState().cart.items));
    };
}

export function decreaseQuantity(product_id) {
    return (dispatch, getState) => {
        dispatch({
            type: DECREASE_QUANTITY,
            payload: product_id
        });
        localStorage.setItem('cart', JSON.stringify(getState().cart.items));
    };
}

export function addToFavorites(product) {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_TO_FAVORITES,
            payload: product
        });
        localStorage.setItem('favorites', JSON.stringify(getState().cart.favorites));
    };
}

export function removeFromFavorites(product_id) {
    return (dispatch, getState) => {
        dispatch({
            type: REMOVE_FROM_FAVORITES,
            payload: product_id
        });
        localStorage.setItem('favorites', JSON.stringify(getState().cart.favorites));
    };
}

export const clearCart = () => {
    return (dispatch, getState) => {
        dispatch({ type: CLEAR_CART });
        localStorage.setItem('cart', JSON.stringify(getState().cart.items));
    };
};
