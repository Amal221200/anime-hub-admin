import { AdminUser, USER_ROLE } from "@prisma/client";
import axios from "axios";

export async function fetchUsers(): Promise<AdminUser[]> {
    const users = await axios.get('/api/admin-user');
    return users.data;
}

export function onRoleChange(userId: string) {
    return async ({ role }: { role: USER_ROLE }) => {
        const response = await axios.patch(`/api/admin-user/${userId}`, { role })
        return response.data
    }
}