import { User } from "@prisma/client";
import axios from "axios";

export async function fetchUsers(): Promise<User[]> {
    const users = await axios.get('/api/user');
    return users.data;
}