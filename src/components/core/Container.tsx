import Head from 'next/head'
import { useRouter } from 'next/router'

const Container = props => {
  const { children, ...customMeta } = props
  const router = useRouter()
  const meta = {
    title: 'Incredible | Developer videos made easy.',
    description:
      'A collaborative developer video content creation platform that enables you to become the best dev video creator.',
    type: 'website',
    ...customMeta,
  }

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name='robots' content='follow, index' />
        <meta name='description' content={meta.description} />
        <meta name='image' content={meta.image} />
      </Head>
      {children}
    </>
  )
}

export default Container
