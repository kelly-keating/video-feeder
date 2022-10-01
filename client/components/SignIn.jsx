import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Modal from './Modal'

import { logout } from '../api/firebase/auth'

function SignIn () {
  const auth = useSelector(redux => redux.auth)
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

export default SignIn
