import { RouterButton } from '@/components'
import { useRouter } from 'next/router'

const Index: React.FC<{ time: string; data: { title: string; body: string; id: string } }> = ({ time, data }) => {
  const routes = useRouter()

  return (
    <div>
      <h2>PostId {routes.query.postId}</h2>
      <RouterButton />
      <div>time: {time}</div>
      <h3>{data?.title}</h3>
      <div>{data?.body}</div>
    </div>
  )
}
export default Index

export async function getStaticPaths() {
  const response = await (await fetch('https://dummyjson.com/posts')).json()
  console.log(
    'response',
    response.posts.map(({ id }: { id: string }) => ({ params: { postId: id } })),
  )
  return {
    // paths: [{ params: { postId: '1' } }, { params: { postId: '2' } }],
    paths: response.posts.map(({ id }: { id: string }) => ({ params: { postId: id.toString() } })), // 动态生成
    // fallback: true, // 不做限制
    fallback: false, // 不做限制
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
