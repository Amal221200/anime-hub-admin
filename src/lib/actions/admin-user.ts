"use server"
import { USER_ROLE } from "@prisma/client";
import db from "../db";

export async function getAdminUsers() {
    try {
        const users = await db.adminUser.findMany({ where: { role: { not: "SUPER_ADMIN" } }, orderBy: { updatedAt: 'desc' } })
        return users
    } catch (error) {
        console.log("getUsers error");
        return null
    }
}

export async function getAdminUser(id: string) {
    try {
        const user = await db.adminUser.findUnique({ where: { id } })
        return user
    } catch (error) {
        console.log("getUser error");
        return null
    }
}

export async function updateAdminUserRole(id: string, role: USER_ROLE) {
    try {
        const updatedUser = await db.adminUser.update({
            where: { id }, data: {
                role
            }
        })
        
        return updatedUser
    } catch (error) {
        console.log("updateUserRole error");
        return null
    }
}