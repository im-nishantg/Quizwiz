import { signOut } from 'next-auth/react';
import React from 'react'

const navbar = (props) => {

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand">Quizwiz</a>
                <form className="d-flex">
                    <p className='text-light me-4 pt-2'> {props.name} </p>
                    <button className="btn btn-outline-info" onClick={(e) => {
                        e.preventDefault();
                        signOut();
                    }}>Log out</button>
                </form>
            </div>
        </nav>
    )
}

export default navbar