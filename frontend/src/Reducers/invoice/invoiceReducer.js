// src/reducers/invoiceReducer.js

import { ADD_INVOICE, REMOVE_INVOICE, FETCH_INVOICES } from './invoiceAction';

const initialState = {
    invoices: []
};

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INVOICE:
            return {
                ...state,
                invoices: [...state.invoices, action.payload]
            };
        case REMOVE_INVOICE:
            return {
                ...state,
                invoices: state.invoices.filter(invoice => invoice.id !== action.payload)
            };
        case FETCH_INVOICES:
            return {
                ...state,
                invoices: action.payload
            };
        default:
            return state;
    }
};

export default invoiceReducer;
