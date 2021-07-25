import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews'
import { useHistory } from 'react-router-dom';


export const Review = ({review}) => {

    const dispatch = useDispatch();
    const history = useHistory();


    const handleDelete = (reviewId) => {
        return dispatch(deleteReview(reviewId))
        .then(() => history.push('/'))
      }


    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="review-container">
            <p className="review-username">{review?.User?.username}</p>
            <p className="review-rating">{review?.rating}</p>
            <p className="review-comment">{review?.comment}</p>
            {(review?.User?.id === sessionUser?.id) ?
                <button className="review-delete-button" onClick={() => {handleDelete(review.id)}}>Delete</button>
                : null}
            {/* <p className="review-date">{review.createdAt}</p> */}
        </div>
    )
}

export default Review;


// {(comment?.User?.id === sessionUser?.id) ?
//   <button className='episode-page-comment-delete' onClick={() => deleteOneComment(comment?.id)}>Delete</button>
//   : null}
