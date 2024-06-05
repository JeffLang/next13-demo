import { RouterButton } from '@/components'
import { useRouter } from 'next/router'

const Index: React.FC<{ time: string; data: { user: { id: number; username: string; fullName: string }; body: string; id: string }[] }> = ({
  time,
  data,
}) => {
  const routes = useRouter()

  if (routes.isFallback) {
    // 当fallback为true时,可以设置一个动画
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <h2>Post Detail Comments Page postId: {routes.query.postId}</h2>
      <RouterButton />
      <div>time: {time}</div>
      <ul>
        {data?.map(({ body, id, user }) => (
          <li className='flex ' key={id}>
            <div className='mr-10'>{user.username}:</div>
            <div>{body}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Index

export async function getStaticPaths() {
  const response = await (await fetch('https://dummyjson.com/posts')).json()

  return {
    paths: [{ params: { postId: '1' } }, { params: { postId: '2' } }, { params: { postId: '47' } }],
    // paths: response.posts.map(({ id }: { id: string }) => ({ params: { postId: id.toString() } })), // 动态生成
    fallback: false,
    // fallback: 'blocking', // 没有预生成的页面会在请求的时候生成(SSG-服务端生成)
    // fallback: true, // 不做限制,并且设置为true之后可以设置一个动画
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
  const response = await (await fetch(`https://dummyjson.com/posts/${context.params.postId}/comments`)).json()
  return {
    props: { time, data: response.comments },
    revalidate: 10, // fallback必须是false 本次请求的资源构建超过10s则重新构建,控制构建的周期
  }
}
