import React, { useState } from 'react'
import { Heading } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import {
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/input'

import { login, register } from '../api/firebase/auth'

import { Modal } from './utils'

function SignIn () {
  const [error, setError] = useState('')
  const [showRegister, setShowRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const togglePassword = () => setShowPassword(!showPassword)

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
    <div>
      <Heading>{showRegister ? 'Register' : 'Log in'}</Heading>
      <p>{error && error}</p>
      <form onSubmit={handleSubmit}>
        {/* ----- EMAIL ----- */}
        <Input
          pr='4.5rem'
          type='email'
          name='email'
          placeholder='Enter email'
          onChange={handleChange}
        />
        {/* ----- PASSWORD ----- */}
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Enter password'
            onChange={handleChange}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={togglePassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        {/* ----- SUBMIT ----- */}
        <Button type='submit'>Submit</Button>
      </form>
    </div>
    // <Modal title={showRegister ? 'Register' : 'Log in'}>
    //   <section className="modal-main">
    //     <p>{error && error}</p>
    //     <form className='center-form' onSubmit={handleSubmit} >
    //       { showRegister &&          
    //       <div className='form-row'>
    //         <label htmlFor='name'>name</label>
    //         <input type='text' name='name' value={formData.name} onChange={handleChange} />
    //       </div>
    //       }
    //       <div className='form-row'>
    //         <label htmlFor='email'>email</label>
    //         <input type='text' name='email' value={formData.email} onChange={handleChange} />
    //       </div>
    //       <div className='form-row'>
    //         <label htmlFor='password'>password</label>
    //         <input type='text' name='password' value={formData.password} onChange={handleChange} />
    //       </div>
    //       <input type='submit' value={showRegister ? 'Register' : 'Log in'} />
    //     </form>
    //     <button type="button" onClick={() => setShowRegister(!showRegister)}>
    //       {showRegister ? 'Already have an account?' : 'Create new account?'}
    //     </button>
    //   </section>
    // </Modal>
  )
}

export default SignIn
