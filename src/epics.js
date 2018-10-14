import 'rxjs';
import { combineEpics } from 'redux-observable';
import { FETCH_CITY_REQUESTED } from './constants';
import { fetchCitySuccess, fetchCityFailed } from './actions';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable'
import { mergeMap, switchMap } from 'rxjs/operators'

 export const fetchCity = (actions$) => {
   return actions$.pipe(
    ofType(FETCH_CITY_REQUESTED),
    switchMap(action => {
      if (!action.payload.city) {
        return Observable.of(fetchCityFailed());
      }
      return ajax.getJSON(`https://restcountries.eu/rest/v2/capital/${action.payload.city}`)
        .map(city => fetchCitySuccess(city))
        .takeUntil(actions$.ofType(FETCH_CITY_REQUESTED))
        .catch(error => Observable.of(fetchCityFailed()))
      }
    )
  );
 }
  
export default combineEpics(
  fetchCity
);