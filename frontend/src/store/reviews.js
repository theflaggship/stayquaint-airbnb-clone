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

const deleteOneReview = reviewId => ({
    type: DELETE_ONE,
    reviewId,
});

const editOneReview = review => ({
    type: EDIT_ONE,
    review,
});

export const createReview = (payload) => async dispatch => {
    const response = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const review = await response.json();
        console.log(review)
        dispatch(addOneReview(review));
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
        dispatch(deleteOneReview(reviewId));
    }
};

export const editReview = (reviewId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(editOneReview(review));
        return review
    }
};

const reviewsReducer = (state = [], action) => {
    let newState;
    switch (action.type) {
        case LOAD:
            return [...action.reviews]
        case ADD_ONE:
            return [...state, action.review];
        case DELETE_ONE:
            newState = [...state]
            const newReviews = newState.filter(review => {
               return review.id !== action.reviewId
            })
            return newReviews
        case EDIT_ONE:
            newState = [...state]
            const reviewToEdit = newState.findIndex(review => review.id === action.review.id)
            return [...newState.slice(0, reviewToEdit), action.review, ...newState.slice(reviewToEdit + 1)]

        default:
            return state;
    }
}

export default reviewsReducer;
