import { csrfFetch } from './csrf';

const LOAD = 'lodgings/LOAD'
const ADD_ONE = 'lodgings/ADD_ONE'

const load = list => ({
  type: LOAD,
  list,
});

const addLodging = lodging => ({
  type: ADD_ONE,
  lodging,
});

export const getLodgings = () => async dispatch => {
  const response = await csrfFetch(`/api/lodgings`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getLodging = (id) => async dispatch => {
  console.log(id);
  const response = await csrfFetch(`/api/lodgings/${id}`);
  if (response.ok) {
      const lodging = await response.json();
      dispatch(addLodging(lodging));
  }
};

export const createLodging = (payload) => async dispatch => {
  const response = await csrfFetch('/api/lodgings', {
      method: 'POST',
      body: JSON.stringify(payload),
  });
  console.log(response);
  if (response.ok) {
      const lodging = await response.json();
      dispatch(addLodging(lodging));
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
