import { useState } from 'react'
import EditLodgingForm from './EditLodgingForm'
import { Modal } from '../../context/Modal'
import './EditLodgingForm.css'

function EditLodgingModal({ lodgingId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button id='update-lodging-button' onClick={() => setShowModal(true)}>Update</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditLodgingForm lodgingId={lodgingId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>

    )
}

export default EditLodgingModal
