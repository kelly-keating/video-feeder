import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Modal from './Modal'

import { logout } from './firebase/auth'

function SignIn ({ auth }) {
  const [showModal, setModal] = useState(false)

  useEffect(() => {
    if(auth) setModal(false)
  }, [ auth ])

  return (
    <>
      {auth ? 
        <button className="button" onClick={logout}>Log Out</button>
        :
        <button className="button" onClick={() => setModal(true)}>Log In</button>
      }
      {showModal && <Modal close={() => setModal(false)} />}
    </>
  )
}

function mapStateToProps ({ auth }) {
  return {
    auth
  }
}

export default connect(mapStateToProps)(SignIn)
