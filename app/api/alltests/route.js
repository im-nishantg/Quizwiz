import Test from "../../../models/Test"
import connect from "../../../utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {

    await connect();
    try {
        const all_tests = await Test.find();
        return new NextResponse(JSON.stringify(all_tests), { status: 200 });
    } catch (e) {
        return new NextResponse("Data not found", { status: 500 });
    }
}

export const POST = async (req) => {        // its actually a delete method

    const{ id } = await req.json();

    try {
        await connect();

        const result = await Test.findByIdAndDelete(id);

        if (result === null) {
            return new NextResponse("Test not found", { status: 404 });
        } else {
            return new NextResponse("Test Deleted Successfully", { status: 201 });
        }

    } catch (e) {
        return new NextResponse(e, { status: 500 })
    }
}