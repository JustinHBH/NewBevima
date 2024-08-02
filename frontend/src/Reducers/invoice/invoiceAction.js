// src/actions/types.js

export const ADD_INVOICE = 'ADD_INVOICE';
export const REMOVE_INVOICE = 'REMOVE_INVOICE';
export const FETCH_INVOICES = 'FETCH_INVOICES'

// Action to add a new invoice
export const addInvoice = (invoice) => ({
    type: ADD_INVOICE,
    payload: invoice
});

// Action to remove an invoice
export const removeInvoice = (invoiceId) => ({
    type: REMOVE_INVOICE,
    payload: invoiceId
});

// Fetch invoices (you might call an API here and use redux-thunk)
export const fetchInvoices = () => ({
    type: FETCH_INVOICES,
    payload: [] 
});
