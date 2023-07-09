"use client"

import { notFound, useRouter } from 'next/navigation';
import { React, useState, useEffect } from 'react';
import CustomModal from "../../../../../components/modal";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import checkAuth from '../../../../../utils/checkAuth';
import { useSession } from 'next-auth/react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Loader from '../../../../../components/loader';


const getData = async (id) => {
  const res = await fetch(`http://localhost:3000/api/alltests/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return notFound();
  }
  return res.json();
};

const handleSubmit = async (questionData, id, setQuestion, setIsPostSuccessful) => {

  try {
    setIsPostSuccessful(false);
    const res = await fetch(`http://localhost:3000/api/alltests/${id}`, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(questionData)
    })

    if (res.status === 201) {
      Swal.fire({
        icon: 'success',
        title: 'New question added successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
    setQuestion({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: ""
    })
    setIsPostSuccessful(true);

  } catch (e) {
    console.log(e);
  }
}

const modalBody = (questionData, setQuestion) => {

  const handleInputChange = (e) => {

    const { id, value } = e.target;
    setQuestion((prevData) => ({
      ...prevData,
      [id]: value,
    }))

  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="question">
        <Form.Label>Question</Form.Label>
        <Form.Control type="text" value={questionData.question} onChange={handleInputChange} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="option1">
        <Form.Label>Option 1</Form.Label>
        <Form.Control type="text" value={questionData.option1} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="option2">
        <Form.Label>Option 2</Form.Label>
        <Form.Control type="text" value={questionData.option2} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="option3">
        <Form.Label>Option 3</Form.Label>
        <Form.Control type="text" value={questionData.option3} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="option4">
        <Form.Label>Option 4</Form.Label>
        <Form.Control type="text" value={questionData.option4} onChange={handleInputChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="answer">
        <Form.Label>Correct option</Form.Label>
        <Form.Control type="number" value={questionData.answer} onChange={handleInputChange} required />
      </Form.Group>
    </Form>
  )
}



const fillTable = (item, index, id, setIsPostSuccessful) => {

  const handleDelete = async (index) => {

    const deleteQuestion = async() => {

      try {
        setIsPostSuccessful(false);
        const res = await fetch(`http://localhost:3000/api/alltests/${id}`, {
          method: 'delete',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({index})
        })
        
        if(res.status === 201)
        {
            Swal.fire('Question deleted successfully!', '', 'success')
            setIsPostSuccessful(true);
        }
      } catch (e) {
        console.log(e);
      }
    }

    Swal.fire({
      title: 'Do you want to delete this question?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteQuestion();
      } else if (result.isDenied) {
        Swal.fire('Question is not deleted!', '', 'info')
      }
    })
  }

  return (
    <tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{item.question}</td>
      <td><Button className='btn btn-danger p-1' onClick={() => {handleDelete(index)}}> <DeleteOutlineOutlinedIcon fontSize="small" /> </Button></td>
    </tr>
  )

}

const TestView = ({ params }) => {

  const session = useSession();
  const router = useRouter();
  checkAuth(router, session, "admin");

  const [loading, isLoading] = useState(true);
  const [questionData, setQuestion] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: ""
  })
  const [isPostSuccessful, setIsPostSuccessful] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState(null);
  const id = params ? params.id : null;


  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const result = await getData(id);
        setData(result);
        isLoading(false);
      }
    };

    fetchData();
  }, [id, isPostSuccessful]);

  if(loading) return <Loader />
 
  return (
    <div className='w-100 d-flex justify-content-center align-item-center flex-column'>
      <h1 className='text-center mt-5 '> {data?.test_name}</h1>
      <table className='table w-75 mt-5 ms-auto me-auto'>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Questions</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {data?.questions.map((item, index) => fillTable(item, index, id, setIsPostSuccessful))}
        </tbody>
      </table>

      <Button variant="info" onClick={() => setModalShow(true)}
        className='w-25 ms-auto me-auto mt-5'>
        Add new question
      </Button>

      <CustomModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        name="addQuestionModel"
        body={modalBody(questionData, setQuestion)}
        heading="Add new question"
        handleSubmit={() => handleSubmit(questionData, id, setQuestion, setIsPostSuccessful)}
        showHeader = {true}
        showFooter = {true}
      />

    </div>
  );
};

export default TestView;
