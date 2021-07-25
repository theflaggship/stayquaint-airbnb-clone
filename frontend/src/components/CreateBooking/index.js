import React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {createBooking} from '../../store/bookings';


const CreateBooking = () => {

    const [dateStart, setDateStart] = useState(0);
    const [dateEnd, setDateEnd] = useState('');
    const user = useSelector(state => state.session.user)
    const { lodgingId } = useParams()
    const dispatch = useDispatch();

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
              window.location.href = '/bookings'
          })
      }


    return (
        <div className="create-booking-container">
            <form
              className="create-booking-form"
              onSubmit={handleSubmit}
            >
              <input
              type="date"
              className="date-start"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
              />
              <input
              type="date"
              className="date-end"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
              />
              <button
                type="submit"
                className="create-booking-button"
              >
                Book Now
              </button>
            </form>
        </div>
    )
}

export default CreateBooking;
