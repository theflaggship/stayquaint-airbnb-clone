import React from 'react';
import {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {createBooking} from '../../store/bookings';
import './CreateBooking.css';


const CreateBooking = () => {

    const [dateStart, setDateStart] = useState(0);
    const [dateEnd, setDateEnd] = useState('');
    const user = useSelector(state => state.session.user)
    const { lodgingId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const lodging = useSelector(state => state.lodgings[lodgingId]);

    const errors = []
      if (dateStart > dateEnd) {
        errors.push('Start date must be before end date')
      }
      if (dateStart < new Date()) {
          errors.push('Start date must be in the future')
      }
      if (dateEnd < new Date()) {
          errors.push('End date must be in the future')
      }
      if (dateStart === null) {
          errors.push('Start date is required')
      }
      if (dateEnd === null) {
          errors.push('End date is required')
      }

      const handleSubmit = (e) => {
          e.preventDefault();

          const payload = {
              dateStart,
              dateEnd,
              lodgingId: parseInt(lodgingId),
              userId: user.id
          }
          dispatch(createBooking(payload))
          .then(() => {
            history.push(`/bookings/users/${user.id}`)
          })
      }


    return (
        <div className="create-booking-container">
            <p className="create-booking-price">${lodging?.price} / night</p>
            <form
              className="create-booking-form"
              onSubmit={handleSubmit}
            >
              <input
              placeHolder="Start"
              type="date"
              id="date-start"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              />
              <input
              type="date"
              id="date-end"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              />
              <button
                type="submit"
                className="create-booking-button"
                disabled={errors.length > 0}
              >
                Book Now
              </button>
            </form>
        </div>
    )
}

export default CreateBooking;
