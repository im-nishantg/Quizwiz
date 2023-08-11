import React from 'react'

const loader = () => {
    return (
        <div className='loader w-100 d-flex justify-content-center align-item-center'>
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}

export default loader