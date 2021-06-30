import React, { useState } from 'react'

import { login, register } from './firebase/auth'

// ----------
// TODO: temp modal, AddFeed contains styled modal

function SignInModal ({ close }) {

  const [showRegister, setShowRegister] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const fn = showRegister ? register : login
    console.log(formData)
    fn(formData.email, formData.password)
  }

  return (
    <div className="modal">
      <section className="modal-main">
        <h2>{showRegister ? 'Register' : 'Log in'}</h2>
        <form className='center-form' onSubmit={handleSubmit} >
          { showRegister &&          
          <div className='form-row'>
            <label htmlFor='name'>name</label>
            <input type='text' name='name' value={formData.name} onChange={handleChange} />
          </div>
          }
          <div className='form-row'>
            <label htmlFor='email'>email</label>
            <input type='text' name='email' value={formData.email} onChange={handleChange} />
          </div>
          <div className='form-row'>
            <label htmlFor='password'>password</label>
            <input type='text' name='password' value={formData.password} onChange={handleChange} />
          </div>
          <input type='submit' value={showRegister ? 'Register' : 'Log in'} />
        </form>
        <button type="button" onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Already have an account?' : 'Create new account?'}
        </button>
        <button type="button" onClick={close}>
          Close
        </button>
      </section>
    </div>
  )
}

export default SignInModal
