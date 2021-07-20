import { csrfFetch } from './csrf';

const LOAD = 'lodgings/LOAD'

const load = list => ({
    type: LOAD,
    list,
  });

export const getLodgings = () => async dispatch => {
    const response = await csrfFetch(`/api/lodgings`);

    if (response.ok) {
      const list = await response.json();
      dispatch(load(list));
    }
  };



  const initialState = {
    list: [],
  };

  const lodgingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD:
        const allLodgings = { ...state.list, ...action.list };
        action.list.forEach(lodging => {
            allLodgings[lodging.id] = lodging;
        })
        return { ...state, list: allLodgings };
      default:
          return state;
    }
  }

  export default lodgingsReducer;
