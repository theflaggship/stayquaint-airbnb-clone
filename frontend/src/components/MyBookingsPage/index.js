import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getUserBookings} from '../../store/bookings';
import './MyBookingsPage.css'

const MyBookingsPage = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const userBookings = useSelector(state => state.list);
    console.log("==========", userBookings)
    const userLodgings = useSelector(state => Object.values(state.lodgings));

    useEffect(() => {
        dispatch(getUserBookings(userId))
    }, [dispatch])

    return (
        <div className="my-bookings-page">
                <h2 className="my-booking">My Bookings</h2>
                <h2 className="my-booking">My Bookings</h2>
                <h2 className="my-booking">My Bookings</h2>
                <h2 className="my-booking">My Bookings</h2>
                <h2 className="my-booking">My Bookings</h2>
                {userBookings?.map(booking => (
                    <div className="my-bookings-container">
                        <h2>{booking?.dateStart}</h2>
                        <h2>{booking?.dateStart}</h2>
                        <h2>{booking?.dateStart}</h2>
                        <h2>{booking?.dateStart}</h2>
                        <h2>{booking?.dateStart}</h2>
                    </div>
                     ))}
        </div>
    )
}

export default MyBookingsPage;
