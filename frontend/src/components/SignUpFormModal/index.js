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
          <div className="signup-title-container">
            <h3 className="signup-title">Sign Up for stayQuaint</h3>
          </div>
          <SignUpForm />
        </Modal>
      )}
    </>
  )
}

export default SignUpFormModal;
