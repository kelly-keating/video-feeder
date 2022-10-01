import React, { useState } from 'react'

import { login, register } from '../api/firebase/auth'

import { Modal } from './utils'

function SignIn () {
  const [error, setError] = useState('')
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
    if(error) setError('')
    const fn = showRegister ? register : login
    fn(formData.email, formData.password, setError)
  }

  return (
    <Modal title={showRegister ? 'Register' : 'Log in'}>
      <section className="modal-main">
        <p>{error && error}</p>
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
      </section>
    </Modal>
  )
}

export default SignIn
