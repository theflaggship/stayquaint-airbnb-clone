import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getLodgings} from '../../store/lodgings';
import './LodgingsBrowser.css'

const LodgingsBrowser = () => {
    const dispatch = useDispatch();
    const lodgings = Object.values(useSelector(state => state.lodgings))

    useEffect(() => {
        dispatch(getLodgings())
    }, [dispatch])

    return (
      <div className="lodgings-browser">
          {lodgings?.map(lodging => (
              <NavLink key={lodging?.id} to={`/lodgings/${lodging?.id}`}>
                <div className="lodging-container">
                    {lodging?.Images !== undefined && (<img className="lodging-img" src={lodging?.Images[0].imgUrl}/>)}
                    <p className="lodging-name">{lodging?.name}</p>
                    <p className="lodging-price">${lodging?.price} / night</p>
                </div>
              </NavLink>
          ))}
      </div>
    )
}
 export default LodgingsBrowser;
