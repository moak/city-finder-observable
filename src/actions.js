import { FETCH_CITY_REQUESTED, FETCH_CITY_SUCCESS, FETCH_CITY_FAILED } from './constants';

export const fetchCity = (city) => ({
  type: FETCH_CITY_REQUESTED,
  payload: { city }
});

export const fetchCitySuccess = (data) => {
  return {
    type: FETCH_CITY_SUCCESS,
    payload: data[0]
  }
};

export const fetchCityFailed = () => ({
  type: FETCH_CITY_FAILED
});
