import 'rxjs';
import { combineEpics } from 'redux-observable';
import { FETCH_CITY_REQUESTED } from './constants';
import { fetchUserSuccess, fetchUserFailed } from './actions';
import { ajax } from 'rxjs/observable/dom/ajax';
import { Observable } from 'rxjs';
import { ofType } from 'redux-observable'
import { switchMap } from 'rxjs/operators'

export const fetchCity = (actions$) =>
  actions$.pipe(
    ofType(FETCH_CITY_REQUESTED),
    switchMap(action => { 
      console.log('action', action);
           
      return fetch(`https://restcountries.eu/rest/v2/capital/${action.payload.username}`)
        .then((response) => {          
          return response.ok ? response.json() : fetchUserFailed()
        })
        .then(result => {          
          return result.type === 'FETCH_CITY_FAILED'? fetchUserFailed() : fetchUserSuccess(result)
        })
        .catch(() => fetchUserFailed()
      )
    })
  );


export default combineEpics(
  fetchCity
);



// export const fetchCity = (actions$) =>
//   actions$
//     .ofType(FETCH_CITY_REQUESTED)
//     .switchMap(action => {      
//       return fetch(`https://restcountries.eu/rest/v2/capital/${action.payload.username}`)
//         .then((response) => {          
//           return response.ok ? response.json() : fetchUserFailed()
//         })
//         .then(result => {          
//           return result.type === 'FETCH_CITY_FAILED'? fetchUserFailed() : fetchUserSuccess(result)
//         })
//         .catch(() => fetchUserFailed())

//       // return ajax.getJSON(`https://restcountries.eu/rest/v2/capital/${action.payload.username}`)
//       //   .debounceTime(2000)
//       //   .map(user => fetchUserSuccess(user))
//       //   // .takeUntil(actions$.ofType(FETCH_CITY_REQUESTED))
//       //   // .retry(2)
//       //   .catch(error => {
//       //     console.log('error', error);
          
//       //     return Observable.of(fetchUserFailed())
//       //   })
//     }
//   );