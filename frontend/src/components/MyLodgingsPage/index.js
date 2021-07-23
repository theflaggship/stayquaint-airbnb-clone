import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getUserLodgings} from '../../store/lodgings';
import './MyLodgingsPage.css'
import EditLodgingModal from '../EditLodgingModal';

const MyLodgingsPage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams()
    const userLodgings = useSelector(state => Object.values(state.lodgings))

    useEffect(() => {
        dispatch(getUserLodgings(userId))
    }, [dispatch])

    const handleDelete = lodgingId => {
        dispatch(deleteLodging(lodging.Id))
    }


    return (
         <div className="my-lodgings-browser">
            <h2>My Lodgings</h2>
             {userLodgings?.map(lodging => (
              <>
                <NavLink key={lodging.id} to={`/lodgings/${lodging.id}`}>
                  <div className="my-lodging-container">
                      {lodging.Images !== undefined && (<img className="lodging-img" src={lodging.Images[0].imgUrl}/>)}
                      <p className="my-lodging-name">{lodging.name}</p>
                      <p className="my-lodging-price">${lodging.price} / night</p>
                  </div>
                </NavLink>
                <EditLodgingModal lodgingId={lodging.id}/>
                <button onClick={handleDelete}>Delete</button>
              </>
          ))}
      </div>
    )
}
 export default MyLodgingsPage;
