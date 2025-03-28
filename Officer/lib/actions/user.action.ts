"use server"

import { connectToDatabase } from "../database"
import User from "../database/models/user.model";

export const getAllUsers = async () => {
    try {
        await connectToDatabase();
        const users = await User.find();
        return JSON.parse(JSON.stringify(users));
    } catch (error) {
        console.log(error)
    }
}