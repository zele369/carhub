import CarForm from "@/components/CarForm";
import Navbar from "@/components/Navbar";
import { getCarById } from "@/lib/actions/car.action";
import React from "react";

type UpdateCarProps = {
  params: Promise<{ id: string }>;
};
const UpdateCar = async ({ params }: UpdateCarProps) => {
  const resolvedParams = await Promise.resolve(params)
  const id = resolvedParams.id;
  const car = await getCarById(id)
  return (
    <>
      <Navbar />
      <section className="relative top-16 bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:p-5">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Car
        </h3>
      </section>
      <div className="wrapper my-8">
        <CarForm
            type="Update"
            car={car}
            carId={id}
          />
      </div>
    </>
  );
};

export default UpdateCar;
