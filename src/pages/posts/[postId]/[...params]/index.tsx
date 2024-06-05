import { useRouter } from 'next/router'

const Index: React.FC = () => {
  const { query } = useRouter()
  console.log()
  return (
    <div>
      <h2>PostId {query.params ?? [].join('/')}</h2>
    </div>
  )
}
export default Index
