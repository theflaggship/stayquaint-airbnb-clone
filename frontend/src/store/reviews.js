import { csrfFetch } from './csrf';
import history from '../history';

const LOAD = 'reviews/LOAD';
const ADD_ONE = 'reviews/ADD_ONE'
const DELETE_ONE = 'reviews/DELETE_ONE'
const EDIT_ONE = 'reviews/EDIT_ONE'

const load = reviews => ({
    type: LOAD,
    reviews,
  });

const addOneReview = review => ({
    type: ADD_ONE,
    review,
});

const deleteOneReview = review => ({
    type: DELETE_ONE,
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

export const getLodgingReviews = (lodgingId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/lodgings/${lodgingId}`);
    if (response.ok) {
      const reviews = await response.json();
      dispatch(load(reviews));
    }
};

export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(deleteOneReview(review.id));
    }
};

const reviewsReducer = (state = [], action) => {
    switch (action.type) {
        case LOAD:
            return [...state, ...action.reviews]
        case ADD_ONE:
            return [...state, action.review];
        default:
            return state;
    }
}

export default reviewsReducer;
