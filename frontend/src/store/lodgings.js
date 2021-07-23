import { csrfFetch } from './csrf';

const LOAD = 'lodgings/LOAD'
const ADD_ONE = 'lodgings/ADD_ONE'
const DELETE_ONE = 'lodgings/DELETE_ONE'
const EDIT_ONE = 'lodgings/EDIT_ONE'

const load = list => ({
  type: LOAD,
  list,
});

const addOneLodging = lodging => ({
  type: ADD_ONE,
  lodging,
});

const deleteOneLodging = lodgingId => ({
  type: DELETE_ONE,
  lodgingId,
});

const editOneLodging = lodgingId => ({
  type: EDIT_ONE,
  lodgingId,
});

export const getLodgings = () => async dispatch => {
  const response = await csrfFetch(`/api/lodgings`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getLodging = (id) => async dispatch => {
  const response = await csrfFetch(`/api/lodgings/${id}`);
  if (response.ok) {
      const lodging = await response.json();
      dispatch(addOneLodging(lodging));
  }
};

export const getUserLodgings = (userId) => async dispatch => {
  console.log(userId)
  const response = await csrfFetch(`/api/lodgings/user/${userId}`);
  console.log(response, "response")
  if (response.ok) {
    const list = await response.json();
    console.log(list)
    dispatch(load(list));
  }
};

export const createLodging = (payload) => async dispatch => {
  const response = await csrfFetch('/api/lodgings', {
      method: 'POST',
      body: JSON.stringify(payload),
  });
  if (response.ok) {
      const lodging = await response.json();
      dispatch(addOneLodging(lodging));
      return lodging;
  }
}

const lodgingsReducer = (state = {}, action) => {
  if (!action) return state;
  switch (action.type) {
    case LOAD: {
      const newState = {}
      action.list.forEach(lodging => {
          newState[lodging.id] = lodging;
      });
      return newState;
    }
    case ADD_ONE: {
      const newState = {
        ...state,
        [action.lodging.id]: action.lodging
      }

      return newState;
    }
    default:
        return state;
  }
};

  export default lodgingsReducer;
