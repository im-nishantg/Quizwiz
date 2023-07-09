import styles from '../styles/home.module.css';

export default function Home() {
  return (
    <main>
      <div className='text-center w-100 d-flex justify-content-center flex-column align-items-center mt-5'>
        <img src='/logo.png' height="250px" width="350px"></img>
        <h1 className={`fw-bold ${styles['main-heading']}`}>Welcome to QuizWiz!</h1>
        <p className='mt-2 fs-5 text-black-50'> Asia's number one platform to conduct online tests hassle free!</p>
        <h3 className='mt-3'> Sign in now </h3>
        <div className='btn-container d-flex w-100 justify-content-center'>
        <a className='btn btn-info p-3 me-3 mt-3' href='/dashboard/admin/login'>Admin</a>
        <a className='btn btn-outline-info p-3 mt-3' href='/dashboard/student/login'> Students</a>
        </div>
      </div>
    </main>
  )
}
