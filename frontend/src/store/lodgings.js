import { csrfFetch } from './csrf';

const LOAD = 'lodgings/LOAD'

const load = list => ({
    type: LOAD,
    list,
  });

export const getLodgings = () => async dispatch => {
    const response = await fetch(`/api/lodgings`);

    if (response.ok) {
      const list = await response.json();
      dispatch(load(list));
    }
  };



  const initialState = {
    list: [],
    types: []
  };

  const lodgingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD:
        const allLodgings = {};
        action.list.forEach(lodging => {
            allLodgings[lodging.id] = lodging;
        });
        return {
            ...allLodgings,
            ...state
        }
      default:
          return state;
    }
  }

  export default lodgingsReducer;
