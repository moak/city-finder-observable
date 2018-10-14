import { FETCH_CITY_REQUESTED, FETCH_CITY_SUCCESS, FETCH_CITY_FAILED } from './constants';

export const fetchCity = (username) => ({
  type: FETCH_CITY_REQUESTED,
  payload: { username }
});

export const fetchUserSuccess = (data) => {
  return {
    type: FETCH_CITY_SUCCESS,
    payload: data[0]
  }
};

export const fetchUserFailed = () => ({
  type: FETCH_CITY_FAILED
});
