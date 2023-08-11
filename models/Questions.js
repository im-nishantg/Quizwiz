import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({

    question : String, 
    option1 : String,
    option2 : String,
    option3 : String,
    option4 : String,
    answer   : String
});

const Question = new mongoose.model("Question", QuestionSchema);
export default Question;