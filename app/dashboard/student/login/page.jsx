"use client"

import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from 'next/navigation'
import Loader from '../../../../components/loader'


const studentLogin = () => {

  const session = useSession();
  const router = useRouter();
  const handleSubmit = (e) => {

    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      signIn("Credentials", { email, password , redirect:false}).then((res) =>{
        if(res.error)
          alert(res.error)
        
        if(res.ok && !res.error)
          alert("Logged in successfully!")
      }) 
    } catch (error) {
      console.log(error);
    }  
  }

  if (session.status === "loading") {
    return (
      <Loader />
    )
  }

  if (session.status === "authenticated") {
    return (
      router.push('views/student')
    )
  }


  return (
    <div className='w-100 form-wrapper d-flex justify-content-center mt-5 flex-column align-items-center'>
      <h1 className='text-center mt-5'> Student Sign In</h1>

      <div className='form-container d-flex mt-5 flex-column'>
        <form method='post' onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" className="form-control mt-1 mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
          </div>
          <div className="form-group">
            <input type="password" className="form-control mt-1 mb-3" id="exampleInputPassword1" placeholder="Password"></input>
          </div>
          <button type="submit" className="btn btn-primary w-100" >Submit</button>
          <a role="button" onClick={() => signIn("google")} className="text-center d-block w-100 mt-3">Log In with Google</a>
          <a role="button" onClick={() => {router.push('dashboard/student/register')}} className="text-center d-block w-100 mt-3">New Here? Sign up</a>

        </form>
      </div>
    </div>
  )
}

export default studentLogin