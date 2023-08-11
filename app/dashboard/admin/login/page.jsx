"use client"

import React, {useState} from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import Loader from '../../../../components/loader';


const adminLogin = () => {

  const session = useSession();
  const router = useRouter();
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signIn("adminCrendentials", { email, password, redirect: false }).then((res) =>{
        if(res.error)
          alert(res.error)
        
        else if(res.ok && !res.error)
          alert("Logged in successfully!")

      })

    } catch (e) {
      // setErr(e.message);
      console.log(e);
      // throw new Error(e);
    }
  }

  if (session.status === "loading") {
    return <Loader />
  }

  if (session.status === "authenticated") {
    router.push("views/admin");
  }


  return (
    <div className='w-100 form-wrapper d-flex justify-content-center flex-column align-items-center'>
      <h1 className='text-center mt-5'> Admin Sign In</h1>
      <div className='form-container d-flex mt-5 flex-column'>
        <form method='post' onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" className="form-control mt-1 mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
          </div>
          <div className="form-group">
            <input type="password" className="form-control mt-1" id="exampleInputPassword1" placeholder="Password"></input>
          </div>
          <button type="submit" className="btn btn-primary mt-4 w-100" >Submit</button>
        </form>
      </div>
    </div>
  )
}

export default adminLogin