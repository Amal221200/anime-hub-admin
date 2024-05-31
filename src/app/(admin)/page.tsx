import db from "@/lib/db";
import { GraduationCap, Newspaper, Shell, User } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const animeCount = await db.anime.count()
  const blogCount = await db.blog.count()
  const userCount = await db.user.count()
  const adminUserCount = await db.adminUser.count({ where: { role: { not: 'SUPER_ADMIN' } } })
 
  return (
    <main>
      <div className="grid grid-cols-[repeat(1,200px)] justify-center gap-3 sm:grid-cols-[repeat(5,300px)] sm:justify-start">
        <Link href="/anime" className="inline-block space-y-3 rounded border p-2">
          <h3>
            <Shell /> Animes
          </h3>
          <div>
            <p>Count - {animeCount}</p>
          </div>
        </Link>
        <Link href="/user" className="space-y-3 rounded border p-2">
          <h3>
            <User /> Users
          </h3>
          <div>
            <p>Count - {userCount}</p>
          </div>
        </Link>
        <Link href="/blog" className="space-y-3 rounded border p-2">
          <h3>
            <Newspaper /> Blogs
          </h3>
          <div>
            <p>Count - {blogCount}</p>
          </div>
        </Link>
        <Link href="/admin-user" className="space-y-3 rounded border p-2">
          <h3>
            <GraduationCap /> Admin Users
          </h3>
          <div>
            <p>Count - {adminUserCount}</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
