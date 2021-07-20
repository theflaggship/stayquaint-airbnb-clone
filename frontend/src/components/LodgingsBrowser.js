import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import {getLodgings} from '../store/lodgings';

const LodgingsBrowser = () => {
    const dispatch = useDispatch();
    const { lodgingId } = useParams();
    const lodgings = useSelector(state => {
        return state.lodgings.map(lodgingId => state.lodgings[lodgingId])
    });

    useEffect(() => {
        dispatch(getLodgings())
    }, [])
}
