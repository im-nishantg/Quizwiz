import Test from "../../../../models/Test";
import connect from "../../../../utils/db";
import { NextResponse } from "next/server";
import Question from "../../../../models/Questions";

export const GET = async (req, { params }) => {
  try {
    const id = params?.id; 
    await connect();

    const test = await Test.findById(id);
    if (test) {
      return new NextResponse(JSON.stringify(test), { status: 201 });
    } else {
      return new NextResponse("Data not found", { status: 404 });
    }
  } catch (e) {
    console.error(e);
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async(request, {params}) => {

  const questionData = await request.json();
  const id = params?.id;

  try {

    await connect();
    const test = await Test.findById(id);
    const newQuestion = new Question(questionData);
    if(test){
      await test.questions.push(newQuestion);
      await test.save();
      return new NextResponse("Question added successfully", {status: 201});
    }else{
      return new NextResponse("Not found", {status: 404});
    }

    
  } catch (e) {
      return new NextResponse(e, {status: 500});
  }
}

export const PUT = async(request, {params}) => {

    const id = params?.id;
    const index = await request.json();
    console.log(index);
    try {
      
      await connect();

      const test = await Test.findById(id);

      if(test)
      {
        test.questions.splice(index, 1);
        test.save();
        return new NextResponse("question deleted successfully", {status: 201});
      }
      else{
        return new NextResponse("Test not found", {status: 404});
      }
    } catch (e) {
        return new NextResponse("Database error", {status: 500});
    }
}

