import { RouterButton } from '@/components'
import Link from 'next/link'

const Index: React.FC<{ time: string; data: { title: string; id: string }[] }> = ({ time, data }) => {
  return (
    <div>
      <h2>Posts List Page</h2>
      <RouterButton />
      <div>build: {time}</div>
      <div>
        {data?.map(({ title, id }) => (
          <li key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
          </li>
        ))}
      </div>
    </div>
  )
}
export default Index

// 获取异步数据
export async function getStaticProps() {
  const time = new Date().toLocaleString()
  const response = await (await fetch('https://dummyjson.com/posts')).json()

  return {
    props: { time, data: response.posts },
  }
}
