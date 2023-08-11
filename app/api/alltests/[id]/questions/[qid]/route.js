import { NextResponse } from "next/server";
import connect from "../../../../../../utils/db";
import Test from "../../../../../../models/Test"

export const DELETE = async(request, {params}) =>{
    
    try {

        await connect();
        const {id, qid} = params;

        const test = await Test.findById(id);
        console.log(test);
        if(test)
        {
            const updatedQuestions = test.questions.filter((question) => question._id.toString() !== qid);
            test.questions = updatedQuestions;
            await test.save();
            test.questions.map((item) => console.log(item));
            return new NextResponse("Question deleted successfully.", { status: 201 });
        
        }else{
            return new NextResponse("Test not found", {status: 404});
        }
        
    } catch (e) {
        return new NextResponse(e, {status: 500});
    }
}

export const PUT = async (request, {params}) => {

    try {
        
        await connect();
        const {id, qid} = params;
        const questionData = await request.json();
        const test = await Test.findById(id); 
        const updatedQuestions = test.questions.map((item) => {

            if(item._id.toString() === qid)
                return questionData;

            return item;
        })

        test.questions = updatedQuestions;
        await test.save();
        return new NextResponse("Question updated successfully", {status: 201});
        
    } catch (e) {
        return new NextResponse(e, {status: 500});
    }
}