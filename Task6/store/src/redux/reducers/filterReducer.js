import { SET_SEARCH_QUERY, SET_PRICE_FILTER, CLEAR_FILTERS } from '../actions/filterActions';

const initialState = {
  searchQuery: '',
  maxPrice: null
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload
      };
    
    case SET_PRICE_FILTER:
      return {
        ...state,
        maxPrice: action.payload
      };
    
    case CLEAR_FILTERS:
      return initialState;
    
    default:
      return state;
  }
};

export default filterReducer;
