import { createCar } from "@/lib/actions/car.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newCar = await createCar(body); // Calling the backend function

    return NextResponse.json({ success: true, data: newCar });
  } catch (error : any) {
    return NextResponse.json({ success: false, error: error.message}, { status: 500 });
  }
}
