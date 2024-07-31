import Link from 'next/link'

const AddPage = () => {
  return (
    <main>
        <Link href="/anime/add" className='mr-3'>Add Anime</Link>
        <Link href="/blog/add">Add Blog</Link>
    </main>
  )
}

export default AddPage