import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { FETCH_CITY_REQUESTED, FETCH_CITY_FAILED, FETCH_CITY_SUCCESS } from './constants';
import epics from './epics';
import { fetchCity } from "./actions";
import XMLHttpRequest from 'xhr2';
global.XMLHttpRequest = XMLHttpRequest;

const epicMiddleware  = createEpicMiddleware(epics);
const mockStore = configureMockStore([epicMiddleware]);

var originalTimeout;

beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
});

describe('fetchCity', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  })

  afterEach(() => {
    nock.cleanAll();
    epicMiddleware.replaceEpic(epics);
  })

  it('returns user from github', done => {
    const payload = { username: 'user' };
    nock('https://restcountries.eu/rest/v2')
      .get('/capital/paris')
      .reply(200, payload);

    const expectedActions = [
      { type: FETCH_CITY_REQUESTED, payload },
      { type: FETCH_CITY_SUCCESS, "payload": {"user": {"username": "user"} } }
    ];

    store.subscribe(() => {
      const actions = store.getActions();
      console.log('hmmmm', actions);
      
      if (actions.length === expectedActions.length) {
        expect(actions).toEqual(expectedActions);
        done();
      }
    });

    store.dispatch(fetchCity('user'));
  });

  it('handles error', done => {
    const payload = { username: 'user' };
    nock('https://restcountries.eu/rest/v2')
      .get('/capital/parsssss')
      .reply(404);

    const expectedActions = [
      { type: FETCH_CITY_REQUESTED, payload },
      { type: FETCH_CITY_FAILED }
    ];

    store.subscribe(() => {
      const actions = store.getActions();
      if (actions.length === expectedActions.length){
        expect(actions).toEqual(expectedActions);
        done();
      }
    });

    store.dispatch(fetchCity('user'));
  });
});

afterEach(function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
