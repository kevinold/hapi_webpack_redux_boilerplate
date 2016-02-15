import * as ActionTypes from '../constants/ActionTypes';
import Immutable from 'immutable';

let defaultState = Immutable.Map({});

export default function(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.JSON_SUCCESS:
      return state.merge(action.data);
    default:
      return state;
  }
}
