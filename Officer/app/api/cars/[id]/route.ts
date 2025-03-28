import { deleteCar, updateCar } from "@/lib/actions/car.action";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function PATCH(req: Request, { params }: Params) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;
    const body = await req.json();

    const updatedCar = await updateCar({
      id,
      car: body.car,
    });

    return NextResponse.json({ success: true, data: updatedCar });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const id = resolvedParams.id;
    await deleteCar(id);
    
    return NextResponse.json({ success: true, message: "Car deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
