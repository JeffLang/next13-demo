import { RouterButton } from '@/components'
import Link from 'next/link'
import { useRouter } from 'next/router'

// [[...params]] 相当于 index + [...params]
const Index: React.FC<{ time: string; data: any[] }> = ({ time, data }) => {
  const { query } = useRouter()
  console.log()
  return (
    <div>
      <h2>Products params List {query.params ?? [].join('/')}</h2>
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

// 服务端渲染 不需要构造动态路由
export async function getServerSideProps(context: any) {
  const { req, res, params, query, ...reset } = context
  // console.log(req, res, params, query, reset)
  const time = new Date().toLocaleString()
  // const response = await (await fetch('https://dummyjson.com/products')).json()
  // 替换成自己的接口
  const response = await (await fetch('http://localhost:3000/api/products')).json()
  res.setHeader('Set-Cookie', 'token=langjinjie') // 设置cookie
  return {
    props: { time, data: response.products },
  }
}
