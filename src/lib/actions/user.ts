import db from "../db";

export async function getUsers() {
    try {
        const users = await db.user.findMany({ orderBy: { updatedAt: 'desc' } })
        return users
    } catch (error) {
        console.log("getUsers error");
    }
}

export async function getUser(id: string) {
    try {
        const user = await db.user.findUnique({ where: { id } })
        return user
    } catch (error) {
        console.log("getUser error");
        return null
    }
}

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
    }
}