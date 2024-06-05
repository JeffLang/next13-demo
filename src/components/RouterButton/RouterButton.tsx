import { useRouter } from 'next/router'

const RouterButton: React.FC = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  const handleHome = () => {
    router.push('/')
  }
  return (
    <div className={`mb-4`}>
      <button className={`mr-2`} onClick={handleHome}>
        home
      </button>
      <button onClick={handleBack}>back</button>
    </div>
  )
}
export default RouterButton
