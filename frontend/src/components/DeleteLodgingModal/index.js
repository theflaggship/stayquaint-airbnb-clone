import { useState } from 'react'
import DeleteLodgingConfirmation from './DeleteLodgingConfirmation'
import { Modal } from '../../context/Modal'
import './DeleteLodgingConfirmation.css'

function DeleteLodgingModal({ lodgingId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button id='delete-lodging-button' onClick={() => setShowModal(true)}>Delete</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteLodgingConfirmation lodgingId={lodgingId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>

    )
}

export default DeleteLodgingModal
