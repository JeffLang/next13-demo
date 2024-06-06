import mock from './mock.json'

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  time: string
  products: any[]
  total: number
}

let productsList = mock.products

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const time = new Date().toLocaleString()
  // const response = await (await fetch('https://dummyjson.com/products')).json()
  res.setHeader('Set-Cookie', 'token=langjinjie') // 设置cookie
  console.log('server side: ', time)
  console.log('req', req.method, req.query)

  // 处理CRUD
  switch (req.method) {
    case 'POST': // 新增
      productsList.push(req.body)
      break
    case 'PUT': // 替换
      const index = productsList.findIndex((item: any) => item.id === req.body.id)
      if (index >= 0) productsList.splice(index, 1, req.body)
      break
    case 'DELETE': // 删除
      productsList = productsList.filter(item => item.id !== req.body.id)
      break
    default:
      break
  }
  // res.status(200).json({ name: '[[...params]]', time, products: response.products })
  res.status(200).json({ time, products: productsList, total: productsList.length })
}
