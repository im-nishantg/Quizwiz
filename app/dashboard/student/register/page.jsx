"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import Loader from '../../../../components/loader'

const studentRegister = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (<Loader />)
  }

  if (status === "authenticated") {
    return (
      router.push('views/student')
    )
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {

      const res = await fetch("../../../api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name, email, password
        })
      });

      if (res.status === 201) {
        Swal.fire({
          title: 'Your account has been created succesfully.',
          confirmButtonText: 'Log in',
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            router.push("/dashboard/student/login")
          }
        })
      }

    } catch (e) {
      console.log(e);
    }
  }


  return (
    <div className='w-100 form-wrapper d-flex justify-content-center flex-column align-items-center'>
      <h1 className='text-center mt-5'> Student Sign Up</h1>

      <div className='form-container d-flex mt-5 flex-column'>

        <form method='post' onSubmit={handleSubmit}>
          <div className="form-group">
            <input className="form-control mt-1 mb-3" id="exampleInputName" placeholder="Enter name" ></input>
          </div>
          <div className="form-group">
            <input type="email" className="form-control mt-1 mb-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
          </div>
          <div className="form-group">
            <input type="password" className="form-control mt-1 mb-3" id="exampleInputPassword1" placeholder="Password"></input>
          </div>
          <button type="submit" className="btn btn-primary w-100" >Submit</button>
          <a role="button" onClick={() => signIn("google")} className="text-center d-block w-100 mt-3">Log In with Google</a>


        </form>
      </div>
    </div>


  )
}



export default studentRegister;