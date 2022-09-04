import Button from 'src/components/ui/Button'
import Logo from 'svg/Logo.svg'
import { useWunderGraph } from '../generated/nextjs'
import { IoMdStats } from 'react-icons/io'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Navbar = () => {
  const { user, logout } = useWunderGraph()

  const { push, asPath } = useRouter()

  return (
    <div className='flex h-20 w-full items-center justify-between text-white lg:h-28'>
      <Link href='/'>
        <a>
          <Logo className='h-full w-40 lg:w-64' />
        </a>
      </Link>
      {user && (
        <div className='flex items-center gap-x-6'>
          {asPath !== '/stats' && (
            <Button
              appearance='none'
              onClick={() => push('/stats')}
              leftIcon={<IoMdStats />}
              className='!px-3 text-lg font-semibold hover:bg-white hover:text-black'
            >
              Stats
            </Button>
          )}
          <Button appearance='outline' onClick={() => logout()}>
            Logout
          </Button>
        </div>
      )}
    </div>
  )
}

export default Navbar
