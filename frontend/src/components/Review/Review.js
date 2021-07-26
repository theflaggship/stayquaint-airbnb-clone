import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview, editReview } from '../../store/reviews'
import { useHistory } from 'react-router-dom';
import {useState} from 'react';
import './Review.css'


export const Review = ({review}) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [editMode, setEditMode] = useState(false);
    const [comment, setComment] = useState(review.comment);

    const toggleEdit = () => {
        setEditMode(!editMode);
    }

    const handleSave = () => {
        setEditMode(false);
        dispatch(editReview(review.id, {comment}))
    }


    const handleDelete = (reviewId) => {
        return dispatch(deleteReview(reviewId))
    }


    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className="review-container">
            <div className="username-date-container">
              <p className="review-username">{review?.User?.username}</p>
              <p className="review-create-date">Date: {review?.createdAt.slice(5,10)}</p>
            </div>
            <p className="review-rating">Rating: {review?.rating}</p>
            {
                editMode ? <textarea value={comment} onChange={(e) => setComment(e.target.value)}/> : <p className="review-comment">{comment}</p>
            }
            {(review?.User?.id === sessionUser?.id) ?
                <div className="delete-edit-buttons-container">
                  <button className="review-edit-button" onClick={() => {toggleEdit()}}>{editMode ? "Cancel": "Edit"}</button>
                  {
                      editMode ? <button className="save-edit-button" onClick={handleSave}>Save</button> : <button className="review-delete-button" onClick={() => {handleDelete(review.id)}}>Delete</button>
                  }
                </div>
                : null}
            {/* <p className="review-date">{review.createdAt}</p> */}
        </div>
    )
}

export default Review;


// {(comment?.User?.id === sessionUser?.id) ?
//   <button className='episode-page-comment-delete' onClick={() => deleteOneComment(comment?.id)}>Delete</button>
//   : null}
