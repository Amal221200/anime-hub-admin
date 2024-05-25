import db from "@/lib/db"
import animes from "./backup/test.animes.json"
import users from "./backup/test.users.json"
import admin from "./backup/test.admin-users.json"

let done = false;

export async function addAnime() {
    const queries = []

    if (done) {
        return console.log("Done");
    }

    for (let anime of animes) {
        const date = new Date()
        date.setFullYear(anime.release, 0, 1)
        queries.push(db.anime.create({
            data: {
                title: anime.title,
                description: anime.description,
                studio: anime.studio,
                artist: anime.artist,
                status: anime.status === "ongoing" ? "ONGOING" : "COMPLETED",
                episodes: anime.episodes,
                episodeDuration: anime.episodeDuration,
                imageLink: anime.imageLink,
                release: date,
                genre: anime.genre,
                createdAt: new Date(anime.createdAt),
                updatedAt: new Date(anime.updatedAt),
                watchLink: anime.watchLink,
            }
        }))
    }

    await db.$transaction(queries);

    done = true;
    console.log("Success");

}

export async function addAdminUsers() {
    const queries = []

    if (done) {
        return console.log("Done");
    }

    for (let user of admin) {
        queries.push(db.adminUser.create({
            data: {
                username: user.username,
                email: user.email,
                externalUserId: user.externalUserId,
                imageUrl: user.imageUrl,
                createdAt: new Date(user.createdAt),
                updatedAt: new Date(user.updatedAt),
            }
        }))
    }

    await db.$transaction(queries);

    done = true;
    console.log("Success");

} 

export async function addUsers() {
    const queries = []

    if (done) {
        return console.log("Done");
    }

    for (let user of users) {
        queries.push(db.user.create({
            data: {
                username: user.username,
                email: user.email,
                externalUserId: user.externalUserId,
                imageUrl: user.imageUrl,
                createdAt: new Date(user.createdAt),
                updatedAt: new Date(user.updatedAt),
            }
        }))
    }

    await db.$transaction(queries);

    done = true;
    console.log("Success");

} 