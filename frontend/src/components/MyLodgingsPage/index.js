import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getUserLodgings} from '../../store/lodgings';
import './MyLodgingsPage.css'

const MyLodgingsPage = () => {
    const dispatch = useDispatch();
    // // const lodgings = Object.values(useSelector(state => state.lodgings))
    const { userId } = useParams()
    console.log(userId)
    console.log("++++++++++here+++++++++")
    // const user = useSelector(state => state.session.user)
    const userLodgings = useSelector(state => Object.values(state.lodgings))
    console.log(userLodgings)

    useEffect(() => {
        dispatch(getUserLodgings(userId))
    }, [dispatch])

    return (
         <div className="my-lodgings-browser">
            <h2>My Lodgings</h2>
             {userLodgings?.map(lodging => (
              <NavLink key={lodging.id} to={`/lodgings/${lodging.id}`}>
                <div className="my-lodging-container">
                    {lodging.Images !== undefined && (<img className="lodging-img" src={lodging.Images[0].imgUrl}/>)}
                    <p className="my-lodging-name">{lodging.name}</p>
                    <p className="my-lodging-price">${lodging.price} / night</p>
                </div>
              </NavLink>
          ))}
      </div>
    )
}
 export default MyLodgingsPage;
