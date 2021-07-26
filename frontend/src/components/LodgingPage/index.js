import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getLodging} from '../../store/lodgings';
import { createReview, getLodgingReviews } from '../../store/reviews';
import Review from '../Review/Review';
import CreateReview from '../CreateReview';
import CreateBooking from '../CreateBooking'
import './LodgingPage.css'

const LodgingPage = () => {
  const dispatch = useDispatch();
  const { lodgingId } = useParams()
  const lodging = useSelector(state => state.lodgings[lodgingId]);
  const reviews = useSelector(state => state.reviews);
  console.log("========",reviews)
  const reviewsCopy = []
  reviews?.forEach(review => reviewsCopy.push(review))

  const orderedReviews = reviewsCopy?.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)

  useEffect(() => {
      dispatch(getLodging(lodgingId))
      dispatch(getLodgingReviews(lodgingId))
  }, [dispatch])

  let breakfast
  if (lodging?.breakfast) {
    breakfast = <div className="breakfast">{`•  Free Breakfast`}</div>
  }

  let wifi
  if (lodging?.wifi) {
    wifi = <div className="wifi">{`•   Free Wifi`}</div>
  }

  let pool
  if (lodging?.pool) {
    pool = <div className="pool">{`•   Pool`}</div>
  }

  return (
    <div className="lodging-page">
      <div className="lodging-page-header">
        <div className="lodging-name-address">
          <h1 className="ind-lodging-name">{lodging?.name}</h1>
          <h4>{lodging?.Address.city}, {lodging?.Address.state}, {lodging?.Address.country}</h4>
        </div>
        <CreateBooking />
      </div>
      <div className="image-container">
        {lodging?.Images.map(image => (
          <img className="lodging-image"src={image.imgUrl}/>
        ))}
      </div>
      <div className="lodging-amenities">
          {breakfast}
          {wifi}
          {pool}
      </div>
      <div className="description-review-container">
        <div className="description">
          <h2>About {lodging?.name}</h2>
          <p className="lodging-description">{lodging?.description}</p>
        </div>
        <div className="page-create-review-container">
          <p className="create-review-header">Leave a Review</p>
          <CreateReview />
        </div>
      </div>
      <div className="review-section">
        <h2 className="reviews-title">Reviews</h2>
        <div className="reviews-container">
          {orderedReviews.map(review => (
          <Review review= {review}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LodgingPage;


// {(comment?.User?.id === sessionUser?.id) ?
//   <button className='episode-page-comment-delete' onClick={() => deleteOneComment(comment?.id)}>Delete</button>
//   : null}
