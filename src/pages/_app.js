import "@/styles/globals.css";
import Header from '@/components/Header';
import { TransitionProvider } from '@/context/TransitionContext'
import Transition from '@/components/Transition';
import Loading from '@/components/Loading';


export default function App({ Component, pageProps, router}) {
  return (
    <TransitionProvider>
      <Loading />
      
      <Header /> 
      <Transition>
        
        <Component key={router.route} {...pageProps} />
      </Transition>
    </TransitionProvider>
  )
}
