import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {deleteLodging} from '../../store/lodgings'
import './DeleteLodgingConfirmation.css'

function DeleteLodgingConfirmation({lodgingId, setShowModal}) {
  const user = useSelector(state => state.session.user)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleDelete = (e) => {
    e.preventDefault()
    return dispatch(deleteLodging(lodgingId)).then(() => setShowModal(false))
    .then(() => history.push('/'))
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setShowModal(false)
  }

  return (
    <div className="delete-confirmation-container">
      <div className="delete-confirmation-message">
        <p>Are you sure you want to delete this lodging?</p>
      </div>
      <div className="delete-confirmation-buttons">
        <button className="delete-confirmation-button" onClick={handleDelete}>Delete Lodging</button>
        <button className="cancel-confirmation-button" onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteLodgingConfirmation;
