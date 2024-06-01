import { AdminUser } from "@prisma/client";
import axios from "axios";

export async function fetchCurrentUser(): Promise<AdminUser> {
    const response = await axios.get('/api/current-user');
    return response.data
}