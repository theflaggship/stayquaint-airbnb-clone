import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm'
import './SignUpForm.css'

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div id="menu-signup-button" onClick={() => setShowModal(true)}>Sign Up</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>MODAL</h1>
          <SignUpForm />
        </Modal>
      )}
    </>
  )
}

export default SignUpFormModal;
