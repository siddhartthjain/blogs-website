import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '../../components/Footer'
import { toast } from 'react-toastify';
import { api, getAuthorizationToken } from '../../http';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import store from '@/store/store';
// import Navbar from '../../components/Navbar';


const Navbar= dynamic(()=> import('../../components/Navbar') ,{ssr:false});    // type of Lazy loading not loading the navbar at server it sloading at client

export default function App({ Component, pageProps }: AppProps) {
  

  return  <>
  < Provider store={store}>
  <div className='container mx-auto font-sans'>
    <Navbar/>
  <Component {...pageProps} />  
  {/* this page is entry point and and it renders the Componenets */}
  <Footer/>
  </div>
  </Provider>
  </>
}


