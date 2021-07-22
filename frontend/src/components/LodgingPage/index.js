import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getLodging} from '../../store/lodgings';
import './LodgingPage.css'

const LodgingPage = () => {
  const dispatch = useDispatch();
  console.log("==============lodginpage=============")
  const lodging = useSelector(state => state.lodging);
  console.log(lodging)
  useEffect(() => {
      dispatch(getLodging(lodging.id))
  }, [dispatch])
  return (
  <div className="lodging-page">
    <div>
      <h1 className="lodging-name">{lodging.name}</h1>
      <p className="lodging-description">{lodging.description}</p>
    </div>
  </div>
  )
}

export default LodgingPage;
