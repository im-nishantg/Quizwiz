"use client"
import React from 'react'

const error = ({error, reset}) => {
  return (
    <div>{error.message}</div>
  )
}

export default error