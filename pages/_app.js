import '../styles/globals.css';
import { Provider, createClient } from 'urql';
//Nav component/ render on every page
import Nav from '../components/Nav'
//import state from context
import { StateContext } from '../lib/context';
//wrapping for check user 
import { UserProvider } from '@auth0/nextjs-auth0';
//hot-toast
import { Toaster } from 'react-hot-toast';

const beAPI = process.env.NEXT_PUBLIC_BE_API;
const client = createClient({ url: beAPI });

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </StateContext>
    </UserProvider>
    )
}

export default MyApp
