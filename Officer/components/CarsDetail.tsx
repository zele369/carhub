import React from "react";
import Search from "./Search";
import CarCard from "./CarCard";
import { getAllCars } from "@/lib/actions/car.action";

const CarsDetail = async() => {
  const cars = await getAllCars();
  return (
    <section className=" flex flex-col gap-4">
      <Search placeholder="Search cars..." />

      <div className="flex flex-wrap gap-4">
        {cars?.map((car:any) => (
          <CarCard key={car._id} id={car._id} car={car}/>
        ))}
      </div>
    </section>
  );
};

export default CarsDetail;
