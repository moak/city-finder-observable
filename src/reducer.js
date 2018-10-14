import { FETCH_CITY_REQUESTED, FETCH_CITY_SUCCESS, FETCH_CITY_FAILED } from './constants';
import { combineReducers } from 'redux';

const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const city = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITY_REQUESTED:
      return { ...state, isLoading: true }
    case FETCH_CITY_SUCCESS:
      return { ...state, data: action.payload, error: null, isLoading: false }
    case FETCH_CITY_FAILED:
      return { ...state, error: 'not_found', data: null, isLoading: false }
    default:
      return state;
  }
};

export default combineReducers({
  city
});
