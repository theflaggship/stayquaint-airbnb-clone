import { csrfFetch } from './csrf';
import history from '../history';

const LOAD = 'bookings/LOAD';
const ADD_ONE = 'bookings/ADD_ONE'
const DELETE_ONE = 'bookings/DELETE_ONE'
const EDIT_ONE = 'bookings/EDIT_ONE'

const addOneBooking = booking => ({
    type: ADD_ONE,
    booking,
});

const load = bookings => ({
    type: LOAD,
    bookings,
});

const deleteOneBooking = bookingId => ({
    type: DELETE_ONE,
    bookingId,
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
    const response = await csrfFetch(`/api/bookings/users/${userId}`);
    if (response.ok) {
        const bookings = await response.json();
        dispatch(load(bookings));
    }
}

export const deleteBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteOneBooking(bookingId));
    }
}

const bookingsReducer = (state = [], action) => {
    let newState
    switch (action.type) {
        case LOAD:
            return [...state, ...action.bookings];
        case ADD_ONE:
            return [...state, action.booking];
        case DELETE_ONE:
            newState = [...state]
            const newBookings = newState.filter(booking => booking.id !== action.bookingId)
            return newBookings;
        default:
            return state;
    }
}

export default bookingsReducer
