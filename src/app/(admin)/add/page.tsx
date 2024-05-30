import Link from 'next/link'
import React from 'react'

const AddPage = () => {
  return (
    <main>
        <Link href="/anime/add" className='mr-3'>Add Anime</Link>
        <Link href="/blog/add">Add Blog</Link>
    </main>
  )
}

export default AddPage