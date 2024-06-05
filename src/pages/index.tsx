import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link href='/posts'>Posts Page</Link>
        </li>
        <li>
          <Link href='/about'>About Page</Link>
        </li>
      </ul>
    </main>
  )
}
