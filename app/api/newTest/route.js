import connect from "../../../utils/db";
import { NextResponse } from "next/server";
import Test from "../../../models/Test"
export const POST = async(request) => {

    const {testName, marks} = await request.json();
    await connect();

    const newTest = new Test({test_name: testName, marks} );

    try {
        await newTest.save();
        return new NextResponse("Test created Successfully", {status: 201});
    } catch (e) {
        return new NextResponse(e.message, {status: 500});
    }
}