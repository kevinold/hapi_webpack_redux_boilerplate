import { JSON_REQUEST, JSON_SUCCESS, JSON_FAILURE } from '../constants/ActionTypes';

export function jsonRequest() {
  return {
    type: 'JSON_REQUEST'
  };
}

export function jsonSuccess(data) {
  return {
    type: 'JSON_SUCCESS',
    data
  };
}

export function fetchJson() {

  /*return dispatch => {
    dispatch(jsonRequest());

    return fetch(`http://localhost:3000/getJson`)
      .then(response => response.json())
      .then(json => dispatch(jsonSuccess(json)));
  }*/

}
