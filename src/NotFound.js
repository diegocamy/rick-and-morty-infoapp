import React from 'react'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>OOPS! SOMETHING WENT WRONG!</h1>
      <Button variant="contained" color="primary" to="/" component={Link}>HOME</Button>
    </div>
  )
}
