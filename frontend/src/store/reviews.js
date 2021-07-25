import { csrfFetch } from './csrf';
import history from '../history';

const LIST = 'reviews/LIST';
const ADD_ONE = 'reviews/ADD_ONE'
const DELETE_ONE = 'reviews/DELETE_ONE'
const EDIT_ONE = 'reviews/EDIT_ONE'

const addOneReview = review => ({
    type: ADD_ONE,
    review,
});

export const createReview = (payload) => async dispatch => {
    const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(addOneReview(review));
        return review
    }
}

const reviewsReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ONE:
            return [...state, action.review];
        default:
            return state;
    }
}

export default reviewsReducer;
