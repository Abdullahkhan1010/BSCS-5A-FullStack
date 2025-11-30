// Action Types
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

// Action Creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product
});

export const removeFromCart = (productName) => ({
  type: REMOVE_FROM_CART,
  payload: productName
});

export const clearCart = () => ({
  type: CLEAR_CART
});

export const updateQuantity = (productName, quantity) => ({
  type: UPDATE_QUANTITY,
  payload: { productName, quantity }
});
