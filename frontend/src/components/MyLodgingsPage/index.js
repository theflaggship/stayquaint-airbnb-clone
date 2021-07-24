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
                  <div className="my-lodging-address">
                      <p className="address-title">Address:</p>
                      <p className="address-line-one">{lodging.Address.addressLineOne}</p>
                      <p className="address-line-two">{lodging.Address.addressLineTwo}</p>
                      <p className="address-location">{lodging.Address.city}, {lodging.Address.state} {lodging.Address.zip}</p>
                      <div className="edit-delete-container">
                          <div className="my-lodging-edit-modal">
                           <EditLodgingModal lodgingId={lodging?.id}/>
                          </div>
                          <div className="my-lodging-delete-modal">
                              <DeleteLodgingModal lodgingId={lodging?.id}/>
                          </div>
                      </div>
                  </div>
                </div>
          ))}
        </div>
    )
}
 export default MyLodgingsPage;
