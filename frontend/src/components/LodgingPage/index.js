import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getLodging} from '../../store/lodgings';
import { createReview } from '../../store/reviews';
import Review from '../Review/Review';
import CreateReview from '../CreateReview';
import CreateBooking from '../CreateBooking'
import './LodgingPage.css'

const LodgingPage = () => {
  const dispatch = useDispatch();
  const { lodgingId } = useParams()
  const lodging = useSelector(state => state.lodgings[lodgingId]);
  const reviews = useSelector(state => state.reviews);

  useEffect(() => {
      dispatch(getLodging(lodgingId))
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
        <h1 className="ind-lodging-name">{lodging?.name}</h1>
        <h4>{lodging?.Address.city}, {lodging?.Address.state}, {lodging?.Address.country}</h4>
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
      <div className="description">
        <h2>About {lodging?.name}</h2>
        <p className="lodging-description">{lodging?.description}</p>
      </div>
      <div className="reviews">
        <CreateReview />
        {reviews.map(review => (
        <Review review= {review}/>
        ))}
      </div>
    </div>
  )
}

export default LodgingPage;
