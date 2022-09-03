import { FaGoogle } from 'react-icons/fa'
import { AuthProvider, useWunderGraph } from 'src/components/generated/nextjs'
import Button from 'src/components/ui/Button'

const Hero = () => {
  const { login } = useWunderGraph()

  return (
    <div
      id='hero'
      className='flex h-full w-full flex-col items-center justify-center gap-y-4 '
    >
      <h1 className='text-center text-7xl font-bold text-white'>
        Think you can type fast?
      </h1>

      <Button
        size='large'
        leftIcon={<FaGoogle />}
        className='mt-4'
        onClick={() => {
          login(AuthProvider.google)
        }}
      >
        Login to start
      </Button>
    </div>
  )
}

export default Hero
