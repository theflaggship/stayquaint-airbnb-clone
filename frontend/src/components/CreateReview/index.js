import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {createReview} from '../../store/reviews';
import './CreateReview.css';

const RATINGS = [1, 2, 3, 4, 5];



const CreateReview = () => {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const user = useSelector(state => state.session.user)
  const { lodgingId } = useParams()
  const dispatch = useDispatch();


  const errors = [];
    if (rating === null) errors.push('Rating is required');
    if (comment.length === 0) errors.push('Review is required');

  const handleSubmit = (e) => {
      e.preventDefault();

      const payload = {
          rating: parseInt(rating),
          comment,
          lodgingId: parseInt(lodgingId),
          userId: user.id
      }
      dispatch(createReview(payload))
      .then(() => {
          setComment('');
          setRating(0);
      })
    }

  return (
    <div className="create-review-container">
      <form
        className="create-review-form"
        onSubmit={handleSubmit}
      >

        <textarea
          className="write-comment-textarea"
          placeholder="Write a comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <select
          placeHolder="Rating"
          className="review-rating-select"
           value={rating}
           onChange={(event) => setRating(event.target.value)}
        >
          <option disabled>Rating</option>
          {RATINGS.map((rating) => (
              <option
                key={rating}
            >
                {rating}
            </option>
          ))}
        </select>
        <button
          className="create-review-button"
          type="submit"
          disabled={errors.length > 0}
          >
          Submit Review
          </button>
      </form>
    </div>
   )
}


export default CreateReview;
