import React, { useEffect, useRef } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useMute } from '@/context/MuteContext';

export default function Index({ location }) {
  //console.log(location);
  
  const { toggleMute, muted } = useMute();
  //const [activeAudio, setActiveAudio] = useState(null);
  useEffect(() => {
    const siteLinks = document.querySelectorAll('.site-link');
      const currentURL = window.location.href; // Get the current URL
      const siteItems = document.querySelectorAll('.site-item');

    siteItems.forEach((siteItem) => {
      siteItem.classList.remove('site-item-selected');
    })
      siteLinks.forEach((siteItem) => {
        console.log(siteItem);
        
        
        const siteLink = siteItem.href; // Get the href of the siteItem
        console.log(siteLink === currentURL);

      // If the href of the siteItem matches the current URL, add the "site-item-selected" class to it
      if(siteLink === currentURL){
        siteItem.firstChild.classList.add('site-item-selected');
      }
      else{
        
      }
      })
  })
  function openNav(event) {
    
    
   
    
    //event.currentTarget.children[0].style.color = '#E1EAD7';
    document.querySelector('.site-map').classList.toggle('site-map-open');
  
  }

 /* useEffect(() => {
    
    const customCursor = document.getElementById('cursor');

  
    const handleMouseMove = (e) => {
      // Set custom cursor position to match mouse position
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    };

    const handleMouseDown = () => {
      // Change cursor background image when mouse is down
      customCursor.style.backgroundImage = "url('images/cursor2.svg')";
    };

    const handleMouseUp = () => {
      // Change cursor background image back to normal when mouse is up
      customCursor.style.backgroundImage = "url('images/cursor2.svg')";
    };

    // Listen for mousemove, mousedown, and mouseup events on the document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Clean up event listeners when component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);*/
 


  return (
    <div className='mx-8 my-6 fixed w-full z-10'>
      {/*<div style={{ 
      width: location === '/kitchen' ? '400px' : '20px',
      height: location === '/kitchen' ? '600px' : '20px',
   
    transform: location === '/kitchen' ? 'translate(-350px, -20px)' : 'translate(-30px,-25px)',
    
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
          backgroundImage: location === '/kitchen' ? 'url(images/dua2.png)' : 'url(images/cursor2.svg)' ,       


      }}
  id="cursor">
      
    </div>*/}
      
        <div className="absolute flex gap-5 global-nav">
          
          <img className="w-[5vw]" onClick={openNav} src='images/logo.svg' alt=""></img>
          
          
        </div>
        
        <div onClick={toggleMute} className="absolute right-16" id='audio-toggle'>
          
          <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.3056 12.6334C24.3056 12.48 24.3055 12.3332 24.2988 12.1798C24.2308 10.1254 23.6876 8.19103 22.7775 6.4968C20.6995 2.6214 16.7266 0 12.1562 0C7.58572 0 3.6061 2.6214 1.52801 6.4968C0.617995 8.19771 0.0747094 10.1254 0.00679779 12.1798C6.63214e-06 12.3332 0 12.48 0 12.6334V18.9168C0 21.6716 1.97622 23.9661 4.61798 24.5197C4.90321 24.8066 5.33786 25 5.82682 25C6.31579 25 6.75042 24.8132 7.03565 24.5197L7.05602 24.4997V13.3338H7.04922C6.77079 13.0336 6.32257 12.8335 5.82003 12.8335C5.31748 12.8335 4.86927 13.0336 4.59083 13.3338H4.58403C3.67402 13.5205 2.8455 13.9274 2.15281 14.4811C2.09848 14.5277 1.65704 14.9146 1.52121 15.0747V12.52C1.52121 12.3399 1.67062 12.1865 1.86077 12.1865H1.87437H2.01018C2.23428 6.57017 6.68929 2.08778 12.1426 2.08778C17.5959 2.08778 22.0441 6.57017 22.2682 12.1865H22.4244C22.6145 12.1865 22.7639 12.3399 22.7639 12.52V15.0747C22.6281 14.9146 22.4719 14.7612 22.309 14.6345C22.309 14.6345 22.1867 14.5277 22.1324 14.4811C21.4397 13.9274 20.6112 13.5272 19.7012 13.3338C19.4159 13.0336 18.9677 12.8335 18.4652 12.8335C17.9626 12.8335 17.528 13.0203 17.236 13.3271V24.5131C17.236 24.5131 17.2427 24.5197 17.2495 24.5197C17.5348 24.8066 17.9762 25 18.4584 25C18.9405 25 19.382 24.8132 19.6672 24.5197C22.3089 23.9661 24.2852 21.6716 24.2852 18.9168C24.2852 18.4765 24.2309 18.043 24.1358 17.6294C24.2309 18.043 24.2852 18.4699 24.2852 18.9168V12.6334H24.3056Z" fill="#DBFF00" stroke="black"/>
          </svg>
        </div>

        <div className="site-map">

          <div className="logo-text script outline-text">Have you <br></br>eaTen?</div>
          <div className="site-map-container">
          <Link className="site-link" onClick={openNav} scroll={false} href="/">
          <div className="site-item" id="s-m-alleyway">Alleyway</div>
          </Link>
          <Link className="site-link" onClick={openNav} scroll={false} href="/livingroom" exact>
          <div className="site-item" id="s-m-livingroom">Living room</div>
          </Link>
          <Link className="site-link" onClick={openNav} scroll={false} href="/kitchen">
          <div className="site-item" id="s-m-kitchen">Kitchen</div>
          </Link>
          <Link className="site-link" onClick={openNav} scroll={false} href="/transportation">
          <div className="site-item" id="s-m-the-journey">The Journey</div>
          </Link>
          <Link className="site-link" onClick={openNav} scroll={false} href="/byboat">
          <div className="site-item" id="s-m-by-boat">By Boat</div>
          </Link>
          <Link className="site-link" onClick={openNav} scroll={false} href="/byplane">
          <div className="site-item" id="s-m-by-plane">By Plane</div>
          </Link>
          <Link className="site-link" onClick={openNav} scroll={false} href="/the-conversation">

          <div className="site-item" id="s-m-the-conversation">The Conversation</div>
          </Link>
          <Link className="site-link" onClick={openNav} scroll={false} href="/the-departure">

          <div className="site-item" id="s-m-the-departure">The Departure</div>
          </Link>
          <Link className="site-link" onClick={openNav} scroll={false} href="/the-arrival">

          <div className="site-item" id="s-m-the-arrival">The Arrival</div>
          </Link>
          
        <svg id="site-frame" width="45vw" height="auto" viewBox="0 0 621 429" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M89.5 288H467.5" stroke="#FF540F"/>
<path d="M460.57 281L467.64 288.07L460.57 295.14" stroke="#FF540F"/>
<path d="M235.45 0.53125C185.85 9.33125 140 26.8313 101.57 52.0013H103.39C141.47 27.3413 186.75 10.1713 235.7 1.50125C235.61 1.18125 235.53 0.85125 235.46 0.53125H235.45Z" fill="#FF540F"/>
<path d="M588.289 119C596.959 131.68 603.899 144.93 609.009 158.6L609.159 158.65C609.529 158.78 609.889 158.93 610.259 159.08C605.169 145.24 598.219 131.83 589.509 119H588.299H588.289Z" fill="#FF540F"/>
<path d="M516.342 50.0014C478.802 26.0614 434.432 9.30141 386.512 0.691406C386.432 1.02141 386.352 1.34141 386.262 1.66141C433.512 10.1414 477.312 26.5714 514.482 50.0014H516.342Z" fill="#FF540F"/>
<path d="M615.422 252.001H616.452C619.122 240.211 620.502 228.181 620.502 216.001C620.502 212.391 620.382 208.791 620.142 205.211C619.832 205.531 619.512 205.851 619.192 206.161C619.392 209.431 619.502 212.711 619.502 216.001C619.502 228.181 618.112 240.211 615.422 252.001Z" fill="#FF540F"/>
<path d="M563.859 344C571.179 336.6 577.839 328.92 583.789 321H582.529C576.529 328.93 569.819 336.6 562.449 344H563.859Z" fill="#FF540F"/>
<path d="M398.319 428.981C417.539 424.931 436.139 419.581 453.889 412.931C453.119 412.881 452.359 412.811 451.609 412.711C434.519 419.001 416.649 424.101 398.199 427.991C398.239 428.321 398.289 428.651 398.329 428.981H398.319Z" fill="#FF540F"/>
<path d="M91.8805 372.16C70.8105 357.07 53.1905 340.19 39.2405 322H37.9805C52.0605 340.5 69.9105 357.66 91.3005 372.98C128.52 399.64 173.55 418.66 222.68 429C222.71 428.67 222.76 428.34 222.81 428.01C173.84 417.7 128.98 398.73 91.8905 372.17L91.8805 372.16Z" fill="#FF540F"/>
<path d="M5.8 253C2.96 240.89 1.5 228.53 1.5 216C1.5 182.59 11.82 150.3 31.35 121H30.14C10.74 150.32 0.5 182.59 0.5 216C0.5 228.52 1.96 240.89 4.78 253H5.81H5.8Z" fill="#FF540F"/>
<path d="M36.6406 331.512L38.4406 321.672L48.2806 323.472" stroke="#FF540F"/>
</svg>
            
          </div>
          

        </div>
    </div>
    
  )
}
