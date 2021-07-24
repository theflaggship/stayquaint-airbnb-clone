import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getLodging} from '../../store/lodgings';
import './LodgingPage.css'

const LodgingPage = () => {
  const dispatch = useDispatch();
  const { lodgingId } = useParams()
  const lodging = useSelector(state => state.lodgings[lodgingId]);

  useEffect(() => {
      dispatch(getLodging(lodgingId))
  }, [dispatch])

  return (
    <div className="lodging-page">
      <h1 className="ind-lodging-name">{lodging?.name}</h1>
      <h4>{lodging?.Address.city}, {lodging?.Address.state}, {lodging?.Address.country}</h4>
      <div className="image-container">
        {lodging?.Images.map(image => (
          <img className="lodging-image"src={image.imgUrl}/>
        ))}
      </div>
      <div className="description">
        <h2>About {lodging?.name}</h2>
        <p className="lodging-description">{lodging?.description}</p>
      </div>
    </div>
  )
}

export default LodgingPage;
