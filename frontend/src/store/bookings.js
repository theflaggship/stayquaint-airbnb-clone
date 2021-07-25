import { csrfFetch } from './csrf';
import history from '../history';

const LOAD = 'bookings/LIST';
const ADD_ONE = 'bookings/ADD_ONE'
const DELETE_ONE = 'bookings/DELETE_ONE'
const EDIT_ONE = 'bookings/EDIT_ONE'

const addOneBooking = booking => ({
    type: ADD_ONE,
    booking,
});

const load = list => ({
    type: LOAD,
    list,
  });


export const createBooking = (payload) => async dispatch => {
    const response = await csrfFetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const booking = await response.json();
        dispatch(addOneBooking(booking));
        history.push(`/bookings`);
        return booking
    }
}

export const getUserBookings = (userId) => async dispatch => {
    const response = await csrfFetch(`api/bookings/users/${userId}`, {
        method: 'GET',
    });
    if (response.ok) {
        const bookings = await response.json();
        console.log(bookings,"+++++++++++++++++++")
        dispatch(load(bookings));
    }
}

const bookingsReducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD: {
            const newState = {}
            action.list.forEach(booking => {
                newState[booking.id] = booking;
            });
            return newState;
        }
        case ADD_ONE:
            return [...state, action.booking];

        default:
            return state;
    }
}

export default bookingsReducer
