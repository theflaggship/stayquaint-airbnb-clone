import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getLodgings} from '../../store/lodgings';

const LodgingsBrowser = () => {
    const dispatch = useDispatch();
    const { lodgingId } = useParams();
    const lodgings = Object.values(useSelector(state => state.lodgings.list))

    useEffect(() => {
        dispatch(getLodgings())
    }, [dispatch])

    return (
      <div className="lodgings-browser">
          {lodgings?.map(lodging => (
                <div>
                    <h2>{lodging.name}</h2>
                    <img src={lodging.Images[0].imgUrl}/>
                </div>
          ))}
      </div>
    )
}
 export default LodgingsBrowser;
