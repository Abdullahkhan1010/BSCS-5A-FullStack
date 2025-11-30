import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART, UPDATE_QUANTITY } from '../actions/cartActions';

const initialState = {
  items: [], // Array of cart items with product info and quantity
  totalItems: 0,
  totalPrice: 0
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      
      if (existingItem) {
        // If item already exists, increase quantity
        const updatedItems = state.items.map(item =>
          item.name === action.payload.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + parseFloat(action.payload.price)
        };
      } else {
        // Add new item to cart
        const newItem = {
          ...action.payload,
          quantity: 1
        };
        
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + parseFloat(action.payload.price)
        };
      }
    }
    
    case REMOVE_FROM_CART: {
      const itemToRemove = state.items.find(item => item.name === action.payload);
      
      if (!itemToRemove) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.name !== action.payload),
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (parseFloat(itemToRemove.price) * itemToRemove.quantity)
      };
    }
    
    case UPDATE_QUANTITY: {
      const { productName, quantity } = action.payload;
      const item = state.items.find(item => item.name === productName);
      
      if (!item || quantity < 1) return state;
      
      const quantityDiff = quantity - item.quantity;
      const updatedItems = state.items.map(item =>
        item.name === productName
          ? { ...item, quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (parseFloat(item.price) * quantityDiff)
      };
    }
    
    case CLEAR_CART:
      return initialState;
    
    default:
      return state;
  }
};

export default cartReducer;
