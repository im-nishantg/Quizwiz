import React from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const testCard = (props) => {
  return (
    <div className='test-card position-relative' onClick={props.onClick}>
        <a href={props.href}> <h5>{props.name}</h5> </a>
        <p>Marks : <p className='d-inline'> {props.marks} </p></p>
        {props.showDelete && (<a role = "button" onClick={props.handleDelete} className='delete-button position-absolute'> <DeleteOutlineOutlinedIcon fontSize="small" /></a>)}
    </div>
  )
}

export default testCard