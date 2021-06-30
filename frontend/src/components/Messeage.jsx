import React from 'react'
import { Alert } from 'react-bootstrap'
const Messeage = ({variant,text}) => {
  return (
    <Alert variant={variant}>
      {text}
    </Alert>
  )
}

Messeage.defultProps={
  variant:"info"
}
export default Messeage
