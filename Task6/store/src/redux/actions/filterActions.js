// Action Types
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_PRICE_FILTER = 'SET_PRICE_FILTER';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';

// Action Creators
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query
});

export const setPriceFilter = (maxPrice) => ({
  type: SET_PRICE_FILTER,
  payload: maxPrice
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS
});
