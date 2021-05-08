import * as yup from "yup"
import { useFormik } from "formik"
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { useState } from "react"
import { Input } from "../Input"

const TimeBlockModal = ({ isOpen, onClose, onComplete, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Faça sua reserva</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>Cancelar</Button>
          <Button colorScheme='blue' mr={3} onClick={onComplete} >
            Reservar horário
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export const TimeBlock = ({ time }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(prevState => !prevState)

  const { values, handleSubmit, handleChange, errors, touched, handleBlur } = useFormik({
    onSubmit: () => { },
    initialValues: {
      name: '',
      phone: ''
    },
    validationSchema: yup.object().shape({
      name: yup.string().required('Preenchimento obrigatório'),
      phone: yup.string().required('Preenchimento obrigatório'),
    })
  })

  return (
    <Button p={8} bg='blue.500' color='white' onClick={toggle}>
      {time}
      <TimeBlockModal
        isOpen={isOpen}
        onClose={toggle}
        values={values}
        onComplete={handleSubmit}
      >
        <>
          <Input
            label='Nome:'
            placeholder='Digite seu nome'
            touched={touched.name}
            size='lg'
            name='name'
            error={errors.name}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Input
            label='Telefone'
            placeholder='(99) 9 9999-9999'
            touched={touched.phone}
            size='lg'
            name='phone'
            error={errors.phone}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            mt={4}
          />
        </>
      </TimeBlockModal>
    </Button>
  )

}