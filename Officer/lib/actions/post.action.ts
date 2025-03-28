"use server"
import { connectToDatabase } from "../database"
import Post from "../database/models/post.model";


export const getAllPosts = async () => {
    try {
        await connectToDatabase();
        const posts = await Post.find()
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.log(error)
    }
}