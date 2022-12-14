import Container from 'src/components/core/Container'
import Hero from 'src/components/core/Hero'
import Navbar from 'src/components/core/Navbar'
import Test from 'src/components/core/Test'
import { useWunderGraph } from 'src/components/generated/nextjs'

const Home = () => {
  const { user } = useWunderGraph()

  return (
    <Container title='Home | SwiftKeys'>
      <main className='container relative mx-auto flex h-screen flex-col overflow-hidden px-4'>
        <Navbar />
        {!user && <Hero />}
        {user && <Test />}
      </main>
    </Container>
  )
}

export default Home
