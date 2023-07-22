import React from 'react'
import { useDispatch } from 'react-redux'

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import { hideModal } from '../../actions'

function Modal({ title, children }) {
  const dispatch = useDispatch()

  const closeModal = () => dispatch(hideModal())

  return (
    <ChakraModal isOpen={true} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent top='25px'>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
