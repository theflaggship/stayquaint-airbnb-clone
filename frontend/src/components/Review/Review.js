import React from 'react';

export const Review = ({review}) => {

    return (
        <div className="review-container">
            <h2>{review.comment}</h2>
            <p>{review.date}</p>
            <p>{review.rating}</p>
        </div>
    )
}

export default Review;
