import "@/styles/globals.css";
import Header from '@/components/Header';
import { TransitionProvider } from '@/context/TransitionContext'
import Transition from '@/components/Transition';
import Loading from '@/components/Loading';
import Cursor from '@/components/Cursor';
import { MuteProvider } from '@/context/MuteContext';




export default function App({ Component, pageProps, router}) {
  //const location = useLocation(); 
  
  
  return (
    
<MuteProvider>
<TransitionProvider>
      <Cursor />
      <Loading />
  
      <Header location={router.pathname} {...pageProps}/> 
      <Transition>
        
        <Component key={router.route} {...pageProps} exact/>
      </Transition>
    </TransitionProvider>
    </MuteProvider>
    
    
    
  )
}
