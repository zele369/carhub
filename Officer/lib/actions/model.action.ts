"use server"

import { CreateModelParams } from "@/types";
import { connectToDatabase } from "../database"
import CarModel from "../database/models/carmodel.model";

export const createModel = async({modelName}: CreateModelParams) => {
    try {
        await connectToDatabase();

        const newModel = await CarModel.create({name: modelName})

        return JSON.parse(JSON.stringify(newModel));
    } catch (error) {
        console.log(error)
    }
} 

export const getAllModels = async() => {
    try {
        await connectToDatabase();

        const models = await CarModel.find()

        return JSON.parse(JSON.stringify(models));
    } catch (error) {
        console.log(error)
    }
} 