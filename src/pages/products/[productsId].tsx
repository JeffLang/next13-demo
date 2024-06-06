import { RouterButton } from '@/components'
import Link from 'next/link'

const About: React.FC<{ time: string; data: any[] }> = ({ time, data }) => {
  return (
    <div>
      <h2>Product Id List Page</h2>
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
export default About

// 服务端渲染 不需要构造动态路由 context 中可以拿到参数
export async function getServerSideProps(context: any) {
  const { req, res, params, query, ...reset } = context
  // params 路由参数
  // query 参数+params 参数
  console.log(req, res, params, query, reset)
  const time = new Date().toLocaleString()
  const response = await (await fetch(`https://dummyjson.com/products${query.productsId}`)).json()
  res.setHeader('Set-Cookie', 'token=langjinjie') // 设置cookie
  return {
    props: { time, data: response.products },
  }
}
