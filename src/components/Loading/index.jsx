import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useContext, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { TransitionContext } from '@/context/TransitionContext';
import gsap from "gsap";

export default function Loading() {
  const router = useRouter();
  const [initial, setInitial] = useState(true);
  const [loading, setLoading] = useState(true);
  const animation = useRef(0);
  const background = useRef(0);
  const foreground = useRef(0);
  const logo = useRef(0);
  const info = useRef(0);
  const { timeline } = useContext(TransitionContext);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const [done, setDone] = useState(true);


      


  useEffect(() => {
    
    const handleStart = () => {
      

      setLoading(true);
    };
    //between each page
    const handleComplete = () => {
      setLoading(false);
      
      setTimeout(() => {
        
        console.log('between pages 1', animation, animation.current);
        
        }, 2000);
      // setLoading(false);
      
    };

    // Router event listeners
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Check if the page is reloading
    if (router.asPath !== router.route) {
      console.log('between pages 2');

      setLoading(true);
      
    }

    // Cleanup event listeners
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  
  useEffect(() => {
    animation.current.classList.add("z-20");
    // Initial loading state when the component mounts
    setLoading(true);
    
    // Simulating a delay for initial loading (you can remove this setTimeout if not needed)
    const timeout = setTimeout(() => {
      
      setLoading(false);
      console.log('initial');
      
     
  
    }, 60);
    
    
    return () => {
      
      clearTimeout(timeout);
    };
    
  }, []);

  useEffect(() => {
    
    let counter = 1;
    const interval = setInterval(() => {
        counter++;
        setProgress(counter);
        
        if (counter === 100) {
            console.log(animation.current)
            clearInterval(interval);
            const loadInfo = document.querySelectorAll('.loading-ps');
            const loadItem = document.querySelectorAll('.load-item');
            console.log(loadItem);
            if (loadInfo) {
              loadInfo.forEach(element => {
                element.style.animation ='none';
                if(loadItem){
                  loadItem[2].innerHTML = "Click to enter"
                }
              });
            }
            
   
            
            animation.current.addEventListener('click', function() {
              gsap.to(background.current, { opacity: 0, duration: 1, onComplete: () => {
                gsap.to(foreground.current, { opacity: 0, duration: 1, onComplete: () => {
                  animation.current.classList.remove("z-20");
                  setDone(false);
                }});
              }});
              
            })
        }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  


  
  
  return (
  

    
    done && ( 
      <div ref={animation} className='spinner-wrapper'>
        <div ref={background} className='spinner-foreground'></div>
        <div ref={foreground} className='spinner-background'></div>
        
        <div className='spinner'>
        {initial ? (
            // Initially show the loading animation
            <img ref={logo} className='loading-logo' src='images/logo.svg' alt='Logo' />
          ) : (
            // After initial load, show the SVG
            <div>hiiiiii</div>
          )}

        </div>
        <div  className="loading-info">
          <div className="loading-info-content">
            <div ref={info} className='loading-ps'>
              <div className='load-item'><p>Loading {progress}%</p></div>
              <div className='load-item'><p>a web experience</p></div>
         
            
            </div>
          </div>
        
          
     

       
        <div className="loading-info-content">
          <div ref={info} className='loading-ps loading-ps-1'>
            <div className='load-item'>
              <p>Use headphone for best experience </p>
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.3056 12.6334C24.3056 12.48 24.3055 12.3332 24.2988 12.1798C24.2308 10.1254 23.6876 8.19103 22.7775 6.4968C20.6995 2.6214 16.7266 0 12.1562 0C7.58572 0 3.6061 2.6214 1.52801 6.4968C0.617995 8.19771 0.0747094 10.1254 0.00679779 12.1798C6.63214e-06 12.3332 0 12.48 0 12.6334V18.9168C0 21.6716 1.97622 23.9661 4.61798 24.5197C4.90321 24.8066 5.33786 25 5.82682 25C6.31579 25 6.75042 24.8132 7.03565 24.5197L7.05602 24.4997V13.3338H7.04922C6.77079 13.0336 6.32257 12.8335 5.82003 12.8335C5.31748 12.8335 4.86927 13.0336 4.59083 13.3338H4.58403C3.67402 13.5205 2.8455 13.9274 2.15281 14.4811C2.09848 14.5277 1.65704 14.9146 1.52121 15.0747V12.52C1.52121 12.3399 1.67062 12.1865 1.86077 12.1865H1.87437H2.01018C2.23428 6.57017 6.68929 2.08778 12.1426 2.08778C17.5959 2.08778 22.0441 6.57017 22.2682 12.1865H22.4244C22.6145 12.1865 22.7639 12.3399 22.7639 12.52V15.0747C22.6281 14.9146 22.4719 14.7612 22.309 14.6345C22.309 14.6345 22.1867 14.5277 22.1324 14.4811C21.4397 13.9274 20.6112 13.5272 19.7012 13.3338C19.4159 13.0336 18.9677 12.8335 18.4652 12.8335C17.9626 12.8335 17.528 13.0203 17.236 13.3271V24.5131C17.236 24.5131 17.2427 24.5197 17.2495 24.5197C17.5348 24.8066 17.9762 25 18.4584 25C18.9405 25 19.382 24.8132 19.6672 24.5197C22.3089 23.9661 24.2852 21.6716 24.2852 18.9168C24.2852 18.4765 24.2309 18.043 24.1358 17.6294C24.2309 18.043 24.2852 18.4699 24.2852 18.9168V12.6334H24.3056Z" fill="black"/>
          </svg>
          
            </div>
            <div className='load-item'>
            <p>a web experience</p>
            </div>
          
            
          </div>
          </div>
          
        </div>
        <div className='script outline-text loading-title'>HaVe you</div>

        <div className='script outline-text loading-title'>EaTeN?</div>
        
      </div>
    )
  );
}
