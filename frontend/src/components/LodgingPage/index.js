import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getLodging} from '../../store/lodgings';
import './LodgingPage.css'

const LodgingPage = () => {
  const dispatch = useDispatch();
  console.log("==============lodginpage=============")
  const { lodgingId } = useParams()
  const lodging = useSelector(state => state.lodgings[lodgingId]);
  console.log(lodgingId)

  useEffect(() => {
      dispatch(getLodging(lodgingId))
  }, [dispatch])

  return (
  <div className="lodging-page">
    <div>
      <img src={lodging?.Images[0].imgUrl}/>
      <p className="lodging-description">{lodging?.description}</p>
      <h1 className="lodging-name">{lodging?.name}</h1>
    </div>
  </div>
  )
}

export default LodgingPage;
