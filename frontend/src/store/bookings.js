import { csrfFetch } from './csrf';
import history from '../history';

const LIST = 'bookings/LIST';
const ADD_ONE = 'bookings/ADD_ONE'
const DELETE_ONE = 'bookings/DELETE_ONE'
const EDIT_ONE = 'bookings/EDIT_ONE'

const addOneBooking = booking => ({
    type: ADD_ONE,
    booking,
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
