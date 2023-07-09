"use client"
import React, { useState } from 'react'
import useSWR from 'swr';
import Timer from '../../../../../components/timer'
import Loader from '../../../../../components/loader';

const fetcher = (...args) => fetch(...args).then(res => res.json());

const testViewStudent = ({ params }) => {

    let [currQues, setCurrQues] = useState(0);
    let [score, setScore] = useState(0);
    let [showResult, setShowRes] = useState(false);
    let allowNext = false;

    const { data, error, isLoading } = useSWR(`../../../api/alltests/${params?.id}`, fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <Loader />
    const questions = data.questions;

    const checkAnswer = () => {

        let rad = document.querySelectorAll(".options");

        rad.forEach((item) => {

            if (item.checked) {
                if (item.id == questions[currQues].answer)
                    setScore(score + 1);
                allowNext = true;
                item.checked = false;
            }
        });
    }

    const handleClick = () => {

        checkAnswer();
        if (allowNext) {
            if (currQues < questions.length - 1)
                setCurrQues(currQues + 1);
            else
                setShowRes(true);
            allowNext = false;
        }
    }

    const quiz = () => {

        return (
            <div className="quiz">
                <Timer handleTimer = {() => {setShowRes(true)}}/> 
                <div className='d-flex flex-row justify-content-between w-100'>
                    <h5 className='mb-5'> Total questions: {questions.length}</h5>
                    <h5 className='mb-5'> Total Marks: {data.marks}</h5>
                </div>

                <div className="container">
                    <h4 className='mb-4'>Q.{currQues + 1} {questions[currQues].question}</h4>
                    <ul>
                        <li><input type="radio" name="ans" id="1" className="options" /> {questions[currQues].option1}</li>
                        <li><input type="radio" name="ans" id="2" className="options" /> {questions[currQues].option2}</li>
                        <li><input type="radio" name="ans" id="3" className="options" /> {questions[currQues].option3}</li>
                        <li><input type="radio" name="ans" id="4" className="options" /> {questions[currQues].option4}</li>
                    </ul>
                </div>

                <div className="btnc">
                    <button className="sbtn" onClick={handleClick}> Submit </button>
                </div>
            </div>
        )
    }

    const result = () => {
        
        const marksPerQuestion = data.marks / questions.length;
        const finalScore = score*marksPerQuestion;
        return (
            <div className="result ">
                <img src="https://i.pinimg.com/564x/7d/11/63/7d1163968102e1e00d2a4cb1abbce50b.jpg" height="300px" />
                <h2 className='mt-3'>Test Completed!</h2>
                <h5 className='mt-3'> Your score is {" " + finalScore + `/${data.marks}`}</h5>
                <button className="pinkBtn" onClick={() => (window.location.reload())}> Try Again</button>
            </div>
        )
    }

    return (
        <div className='w-100 form-wrapper d-flex justify-content-center mt-5 flex-column align-items-center'>
            {showResult ? result() : quiz()}
        </div>
    )


}

export default testViewStudent