import db from "@/lib/db";
import { Shell, User } from "lucide-react";

export default async function Home() {
  const animeCount = await db.anime.count()
  const userCount = await db.user.count({ where: { role: { not: 'SUPER_ADMIN' } } })
  return (
    <main>
      <div className="grid grid-cols-[repeat(1,200px)] justify-center gap-3 sm:grid-cols-[repeat(5,300px)] sm:justify-start">
        <article className="space-y-3 rounded border p-2">
          <h3>
            <Shell /> Animes
          </h3>
          <div>
            <p>Count - {animeCount}</p>
          </div>
        </article>
        <article className="space-y-3 rounded border p-2">
          <h3>
            <User /> Users
          </h3>
          <div>
            <p>Count - {userCount}</p>
          </div>
        </article>
      </div>
    </main>
  );
}
