"use server"
import { CreateCarParams } from "@/types";
import { connectToDatabase } from "../database";
import Car from "@/lib/database/models/car.model";
import { UpdateCarparams } from "@/types";
import { revalidatePath } from "next/cache";
import Book from "../database/models/booking.model";

export const createCar = async ({ car }: CreateCarParams) => {
  try {
    await connectToDatabase();
    const newCar = await Car.create({ ...car });
    revalidatePath("/");
    return JSON.parse(JSON.stringify(newCar));
  } catch (error) {
    console.log(error);
  }
};

export const getAllCars = async () => {
  try {
    await connectToDatabase();
    const cars = await Car.find();
    return JSON.parse(JSON.stringify(cars));
  } catch (error) {
    console.log(error)
  }
};

export const getCarById = async (id: string) => {
  try {
    await connectToDatabase();
    const car = await Car.findById(id);
    return JSON.parse(JSON.stringify(car));
  } catch (error) {
    console.log(error);
  }
};

export const updateCar = async ({ id, car }: UpdateCarparams) => {
  try {
    await connectToDatabase();
    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { ...car },
      { new: true }
    );
    revalidatePath("/");
    return JSON.parse(JSON.stringify(updatedCar));
  } catch (error) {}
};

export const deleteCar = async (id: string) =>{
    try {
        await connectToDatabase();
        // First delete all bookings associated with this car
        await Book.deleteMany({ car: id });
        // Then delete the car
        await Car.findByIdAndDelete(id);
        // Revalidate the paths to update the UI
        revalidatePath("/");
        revalidatePath("/my-cars");
    } catch (error) {
        console.error("Error deleting car and associated bookings:", error);
        throw error;
    }
}
