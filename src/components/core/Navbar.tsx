import Button from 'src/components/ui/Button'
import Logo from 'svg/Logo.svg'
import { useWunderGraph } from '../generated/nextjs'

const Navbar = () => {
  const { user, logout } = useWunderGraph()

  return (
    <div className=' absolute top-0 left-0 flex h-28 w-full items-center justify-between text-white'>
      <Logo className='h-full w-64' />
      {user && (
        <div className='flex items-center gap-x-4'>
          <p className='text-lg font-semibold'>Hey, {user.name} !</p>
          <Button appearance='outline' onClick={() => logout()}>
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}

export default Navbar
