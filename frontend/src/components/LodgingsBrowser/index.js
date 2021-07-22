import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getLodgings} from '../../store/lodgings';
import './LodgingsBrowser.css'

const LodgingsBrowser = () => {
    const dispatch = useDispatch();
    const lodgings = Object.values(useSelector(state => state.lodgings.list))

    useEffect(() => {
        dispatch(getLodgings())
    }, [dispatch])

    return (
      <div className="lodgings-browser">
          {lodgings?.map(lodging => (
                <div className="lodging-container">
                    <img className="lodging-img" src={lodging.Images[0].imgUrl}/>
                    <p className="lodging-name">{lodging.name}</p>
                    <p className="lodging-price">${lodging.price} / night</p>
                </div>
          ))}
      </div>
    )
}
 export default LodgingsBrowser;
