import { User } from "@prisma/client";
import axios from "axios";

export async function fetchCurrentUser(): Promise<User> {
    const response = await axios.get('/api/user/currentUser');

    return response.data
}