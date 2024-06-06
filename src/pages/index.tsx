import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Head>
        <title>Home Page</title>
      </Head>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link href='/posts'>Posts Page</Link>
        </li>
        <li>
          <Link href='/about'>About Page</Link>
        </li>
        <li>
          <Link href='/products'>Products Page</Link>
        </li>
      </ul>
    </main>
  )
}
