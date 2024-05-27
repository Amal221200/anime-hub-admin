import { AdminUser } from "@prisma/client";
import axios from "axios";

export async function fetchCurrentUser(): Promise<AdminUser> {
    const response = await axios.get('/api/admin-user/currentUser');

    return response.data
}