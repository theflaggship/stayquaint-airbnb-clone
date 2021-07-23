import { useState } from 'react'
import EditLodgingForm from './EditLodgingForm'
import { Modal } from '../../context/Modal'
import './EditLodgingForm.css'

function EditLodgingModal({ lodgingId }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button id='edit-lodging-button' onClick={() => setShowModal(true)}>Edit Lodging</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditLodgingForm lodgingId={lodgingId} setShowModal={setShowModal} />
                </Modal>
            )}
        </>

    )
}

export default EditLodgingModal
