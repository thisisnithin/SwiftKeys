import Hero from 'src/components/core/Hero'
import Navbar from 'src/components/core/Navbar'
import Test from 'src/components/core/Test'
import { useWunderGraph } from 'src/components/generated/nextjs'

const Home = () => {
  const { user } = useWunderGraph()

  return (
    <main className='flex h-screen w-full justify-center overflow-hidden'>
      <div className='container relative h-full w-full'>
        <Navbar />
        {!user && <Hero />}
        {user && <Test />}
      </div>
    </main>
  )
}

export default Home
