"use client"

import { useSession, signOut } from 'next-auth/react'
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import useSWR, { mutate } from 'swr';
import TestCard from "../../../components/test_card"
import checkAuth from '../../../utils/checkAuth.js'
import Navbar from '../../../components/navbar'
import CustomModal from '../../../components/modal'
import { useRouter } from 'next/navigation';
import Loader from '../../../components/loader';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const modalBody = (setName, setMarks) => {

    return (
        <form method='post'>
            <div className="form-group">
                <label>Test Name</label>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} required ></input>
            </div>
            <div className="form-group">
                <label>Marks</label>
                <input type="text" className="form-control" onChange={(e) => setMarks(e.target.value)} required ></input>
            </div>
        </form>
    )
}

const handleDelete = (id) => {

    const deleteTest = async () => {

        try {
            const res = await fetch('../api/alltests', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ id })
            })

            if (res.status === 201) {
                Swal.fire('Test deleted successfully!', '', 'success');
                mutate("../api/alltests")
            }

        } catch (e) {
            console.log(e);
        }
    }

    Swal.fire({
        title: 'Do you really want to delete this test?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't delete`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            deleteTest();
        } else if (result.isDenied) {
            Swal.fire('Test is not deleted!', '', 'info')
        }
    })

}

const handleSubmit = async (testName, marks) => {

    try {

        const res = await fetch("../api/newTest", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ testName, marks })
        });

        if (res.status === 201) {
            
            Swal.fire({
                icon: 'success',
                title: 'New test created Successfully',
                showConfirmButton: false,
                timer: 1500
            })
            mutate("../api/alltests")
        }
    } catch (e) {
        console.log(e);
    }
}

const allTests = (item, index) => {
    return (
        <TestCard key={index} href={`/views/admin/testview/${item._id}`} name={item.test_name} marks={item.marks} handleDelete={() => handleDelete(item._id)} showDelete={true} />
    )
}


const adminView = () => {

    const session = useSession();
    const router = useRouter();

    const [modalShow, setModalShow] = useState(false);

    const [testName, setName] = useState("");
    const [marks, setMarks] = useState("");

    const { data, error, isLoading } = useSWR('../api/alltests', fetcher)

    if (error) return <div>failed to load</div>
    if (isLoading) return <Loader />

    checkAuth(router, session, "admin");

    return (

        <>
            <Navbar name={session.data?.user?.name} />
            <h1 className='text-center mt-5 mb-5'> All tests</h1>
            <div className='w-100 d-flex flex-wrap justify-content-center test-container ms-auto me-auto'>
                {data.map(allTests)}
            </div>

            <div className='button-container w-100 d-flex justify-content-center'>
                <Button variant="info" onClick={() => setModalShow(true)} className='px-3 mr'>
                    Create new test
                </Button>
            </div>

            <CustomModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                name="addTestModel"
                body={modalBody(setName, setMarks)}
                heading="Create new test"
                handleSubmit={() => handleSubmit(testName, marks)}
                showHeader={true}
                showFooter={true}
            />
        </>
    )
}

export default adminView