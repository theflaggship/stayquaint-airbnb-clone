import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {deleteLodging} from '../../store/lodgings'
import './DeleteLodgingConfirmation.css'

function DeleteLodgingConfirmation({lodgingId, setShowModal}) {
  const user = useSelector(state => state.user)
  const history = useHistory()

  const handleDelete = (e) => {

    e.preventDefault()

    const payload = {
      addressLineOne,
      addressLineTwo,
      city,
      state,
      postalCode,
      country,
      name,
      id: user.id,
      description,
      categoryId,
      wifi,
      price,
      breakfast,
      pool,
      imgUrl,
    }

    return dispatch(deleteLodging(lodgingId)).then(() => setShowModal(false))
      .then(() => history.push(`users/lodgings/${user.id}`))

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

export default DeleteLodgingForm;
