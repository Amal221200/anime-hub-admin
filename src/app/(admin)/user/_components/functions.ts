import { User, USER_ROLE } from "@prisma/client";
import axios from "axios";

export async function fetchUsers(): Promise<User[]> {
    const users = await axios.get('/api/user');
    return users.data;
}

export function onRoleChange(userId: string) {
    return async ({ role }: { role: USER_ROLE }) => {
        const response = await axios.patch(`/api/user/${userId}`, { role })
        return response.data
    }
}