import React from 'react'
import { useDispatch } from 'react-redux'

import { hideModal } from '../../actions'


function Modal({ title, children }) {
  const dispatch = useDispatch()

  const closeModal = () => dispatch(hideModal())

  return (
    <div className="modal">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-main">
        <header>
        <h2>{title}</h2>
          <button className="close-modal" onClick={closeModal}>
            X
          </button>
        </header>
        {children}
      </div>
    </div>
  )
}

export default Modal
