import { withWunderGraph } from 'src/components/generated/nextjs'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default withWunderGraph(MyApp)
