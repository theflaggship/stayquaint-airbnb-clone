import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getUserLodgings, deleteLodging} from '../../store/lodgings';
import './MyLodgingsPage.css'
import EditLodgingModal from '../EditLodgingModal';
import DeleteLodgingModal from '../DeleteLodgingModal';

const MyLodgingsPage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams()
    const userLodgings = useSelector(state => Object.values(state.lodgings))

    useEffect(() => {
        dispatch(getUserLodgings(userId))
    }, [dispatch])


    return (
         <div className="my-lodgings-browser">
            <h2>My Lodgings</h2>
             {userLodgings?.map(lodging => (
              <div className="my-lodging-container">
                <NavLink key={lodging?.id} to={`/lodgings/${lodging?.id}`}>
                      {lodging?.Images !== undefined && (<img className="lodging-img" src={lodging?.Images[0].imgUrl}/>)}
                  <div className="lodging-name-price">
                      <p className="my-lodging-name">{lodging?.name}</p>
                      <p className="my-lodging-price">${lodging?.price} / night</p>
                  </div>
                </NavLink>
                <EditLodgingModal lodgingId={lodging?.id}/>
                <DeleteLodgingModal lodgingId={lodging?.id}/>
              </div>
          ))}
      </div>
    )
}
 export default MyLodgingsPage;
