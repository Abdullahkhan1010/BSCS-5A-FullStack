import { createStore, combineReducers } from 'redux';
import cartReducer from './reducers/cartReducer';
import filterReducer from './reducers/filterReducer';

// Combine all reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  filter: filterReducer
});

// Create Redux store
const store = createStore(
  rootReducer,
  // Enable Redux DevTools Extension if available
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
