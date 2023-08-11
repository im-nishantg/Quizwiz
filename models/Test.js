import mongoose from "mongoose";
import Question from "./Questions";

const testSchema = mongoose.Schema({

    test_name: {
        type: String
    },
    marks:{
        type: String
    },
    questions: []
})

const Test = mongoose.model("Test", testSchema);
export default Test;