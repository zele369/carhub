"use server"

import { CreateMakerParams } from "@/types";
import { connectToDatabase } from "../database"
import CarMaker from "../database/models/carmaker.model"

export const createMaker = async({makerName}: CreateMakerParams) => {
    try {
        await connectToDatabase();

        const newMaker = await CarMaker.create({name: makerName})

        return JSON.parse(JSON.stringify(newMaker));
    } catch (error) {
        console.log(error)
    }
} 

export const getAllMakers = async() => {
    try {
        await connectToDatabase();

        const makers = await CarMaker.find()

        return JSON.parse(JSON.stringify(makers));
    } catch (error) {
        console.log(error)
    }
} 