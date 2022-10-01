import React, { useState } from 'react'

function ConfirmationButton({ mainText, confirmText, successFunc }) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const toggleConfirm = () => setShowConfirmation(!showConfirmation)

  return (
    <div>
      {showConfirmation ? (
        <>
          <button onClick={successFunc}>{confirmText}</button>
          <button onClick={toggleConfirm}>Cancel</button>
        </>
      ) : (
        <button onClick={toggleConfirm}>{mainText}</button>
      )}
    </div>
  )
}

export default ConfirmationButton
