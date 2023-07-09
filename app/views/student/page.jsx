"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar'
import { useSession, signOut } from 'next-auth/react'
import checkAuth from '../../../utils/checkAuth'
import { useRouter } from 'next/navigation'
import useSWR,  { mutate } from 'swr';
import TestCard from "../../../components/test_card"
import CustomModal from '../../../components/modal'
import Loader from '../../../components/loader'


const fetcher = (...args) => fetch(...args).then(res => res.json());


const studentView = () => {

    const session = useSession();
    const router = useRouter();
    const [testId, setTestId] = useState("");

    const [modalShow, setModalShow] = useState(false);

    const dialogBox = () => {

        return (
            <>
                <div className='dialog-box d-flex flex-column justify-content-center'>
                    <h3 className='mb-3'> Instructions for the test</h3>
                    <p> 1. Read the instructions carefully. </p>
                    <p> 2. This is a MCQ based test where all questions are compulsory. </p>
                    <p> 3. For each question, you are given 4 choices, out of which, only one is correct. </p>
                    <p> 4. This is a time-based test and test will be auto-submitted once the timer hits zero and result will be shown instantly.</p>
                    <p> 5. To start the test, hit the button below.</p>
    
                    <button className="btn btn-info mt-3" onClick={() => {router.push(`views/student/testview/${testId}`)}} > Start</button>
                </div>
            </>
        )
    }

    const allTests = (item, index) => {
        return (
            <TestCard key={index} onClick={() => {setModalShow(true); setTestId(item._id)}}  name={item.test_name} marks={item.marks} showDelete = {false}   />
        )
    }

    const { data, error, isLoading } = useSWR('../api/alltests', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <Loader />

    checkAuth(router, session, "student")

    return (
        <>
            <Navbar  name={session.data?.user?.name} />
            <h1 className='text-center mt-5 mb-5'> All tests</h1>
            <div className='w-100 d-flex flex-wrap justify-content-center test-container ms-auto me-auto'>
                {data.map(allTests)}
            </div>

            <CustomModal 
                show = {modalShow}
                onHide={() => setModalShow(false)}
                body={dialogBox()}
                name="dialogModel"
                showHeader = {false}
                showFooter = {false}
            />
        </>
    )
}

export default studentView