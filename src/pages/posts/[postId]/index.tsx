import { RouterButton } from '@/components'
import { useRouter } from 'next/router'

const Index: React.FC<{ time: string; data: { title: string; body: string; id: string } }> = ({ time, data }) => {
  const routes = useRouter()

  if (routes.isFallback) {
    // 当fallback为true时,可以设置一个动画
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <h2>Post Detail Page postId: {routes.query.postId}</h2>
      <RouterButton />
      <div>build: {time}</div>
      <h3>{data?.title}</h3>
      <div>{data?.body}</div>
    </div>
  )
}
export default Index

export async function getStaticPaths() {
  const response = await (await fetch('https://dummyjson.com/posts')).json()

  return {
    paths: [{ params: { postId: '1' } }, { params: { postId: '2' } }],
    // paths: response.posts.map(({ id }: { id: string }) => ({ params: { postId: id.toString() } })), // 动态生成
    // fallback: false,
    // fallback: 'blocking', // 没有预生成的页面会在请求的时候生成(SSG-服务端生成)
    fallback: true, // 不做限制,并且设置为true之后可以设置一个动画
  }
}

// 构建的时候执行 context是从getStaticPaths上接受的
/*
{
  params: { postId: '4' },
  locales: undefined,
  locale: undefined,
  defaultLocale: undefined
}
*/
export async function getStaticProps(context: any) {
  const time = new Date().toLocaleString()
  const response = await (await fetch(`https://dummyjson.com/posts/${context.params.postId}`)).json()

  return {
    props: { time, data: response },
  }
}
