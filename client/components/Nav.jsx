import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger
} from '@chakra-ui/popover'
import { Button } from '@chakra-ui/react'

import { openModal } from '../actions'
import { logout } from '../api/firebase/auth'

function Nav() {
  const dispatch = useDispatch()
  const auth = useSelector(redux => redux.auth)
  
  const showModal = (type) => dispatch(openModal(type))

  const renderLogout = () => (
    <Popover>
      <PopoverTrigger>
        <Button>Logout</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Are you sure?</PopoverHeader>
        <PopoverBody>
          <Button onClick={logout}>Yes</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )

  return (
    <nav className="navbar">
      <img src="/icon-white.png" className="navbar-logo" />

      {auth && (
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Home
            </Link>

            <Link to="/subs" className="navbar-item">
              Subscriptions
            </Link>

            <Link to="/search" className="navbar-item">
              Search
            </Link>
          </div>

          <div className="navbar-end">
            <Button onClick={() => showModal('add')}>
              Add new
            </Button>

            <div className="navbar-item">
              <div className="buttons">{renderLogout()}</div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
