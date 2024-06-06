import { RouterButton } from '@/components'
import { envs } from '@/utils/env'
import Image from 'next/image'
import { useEffect } from 'react'

const Index: React.FC<{ time: string; data: any[]; total: number }> = ({ time, data, total }) => {
  useEffect(() => {
    console.log('挂载了')
  }, [])
  return (
    <div>
      <h2>Product List Page</h2>
      <RouterButton />
      <div>build: {time}</div>
      <div>total: {total}</div>
      <div>
        {data?.map(({ title, id, thumbnail, description }) => (
          <div key={id} className='flex rounded border-solid border-indigo-600 m-1'>
            <div>
              <Image width={100} height={100} src={thumbnail} alt={description} />
            </div>
            <div>
              <h4>{title}</h4>
            </div>
          </div>
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
  // 替换成自己的接口,接口地址是 src/pages/api
  // const response = await (await fetch(`http:${req.headers.host}/api/products`)).json()
  const response = await (await fetch(`${(envs as any)[process.env.NODE_ENV]}/api/products`)).json()
  res.setHeader('Set-Cookie', 'token=langjinjie') // 设置cookie
  return {
    props: { time, data: response.products, total: response.total },
  }
}
