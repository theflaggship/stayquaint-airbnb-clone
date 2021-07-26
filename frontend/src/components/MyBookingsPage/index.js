import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams, useHistory } from 'react-router-dom';
import {getUserBookings, deleteBooking} from '../../store/bookings';
import './MyBookingsPage.css'

const MyBookingsPage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const bookings = useSelector(state => state.bookings);
    const history = useHistory();

    useEffect(() => {
        dispatch(getUserBookings(userId))
    }, [dispatch])

    const handleDelete = (bookingId) => {
        return dispatch(deleteBooking(bookingId))
    }

    return (
        <div className="my-bookings-page">
                <h2 className="my-bookings">My Bookings</h2>
                <div className="my-bookings-container">
                {bookings?.map(booking => (
                    <div key={`booking-${booking.id}`} className="ind-booking-container">
                      <p className="booking-lodging-name">{booking?.Lodging?.name}</p>
                      <p className="booking-lodging-datestart">{booking?.dateStart?.slice(5)} - {booking?.dateEnd?.slice(5)}</p>
                      <button className="booking-delete-button" onClick={() => handleDelete(booking?.id)}>Delete</button>
                    </div>
                ))}
                </div>
        </div>
    )
}

export default MyBookingsPage;


{/* <NavLink key={booking?.Lodging.id} to={`/lodgings/${booking?.Lodging.id}`}>
                          {booking?.Lodging.Images !== undefined && (<img className="lodging-img" src={booking?.Lodging.Images[0].imgUrl}/>)}
                      </NavLink> */}
