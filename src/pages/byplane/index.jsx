import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Draggable from "gsap/dist/Draggable";


export default function Index() {
  const container = useRef(null);
  const windowSlide = useRef(null);
  const byPlaneVN = useRef(null);
  const byPlane = useRef(null);
  const byPlaneUS = useRef(null);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    gsap.registerPlugin(Draggable);

     Draggable.create("#window-slide", {
      type: "y",
      bound: document.getElementById("window"),
      inertia: true,
      cursor: "none",
      onClick: function () {
        console.log("clicked");
      },
      onDrag: function () {
        const style = window.getComputedStyle(windowSlide.current);
    const transform = style.transform;

    // The transform property is a string that looks like this: "translate3d(xpx, ypx, zpx)"
    // We can use a regular expression to extract the y-coordinate
    const match = /translate3d\(.+px, (.+)px, .+px\)/.exec(transform);
    const y = match ? match[1] : 0; // If the regex matched, match[1] is the y-coordinate

    console.log(y); // This will log the y-coordinate
      },
    })[0];
    
  })

  function slideDissapear(ref) {
    gsap.to(ref.current, {opacity: 0, duration: 1})
    ref.current.style.pointerEvents = 'none';
    if (ref.current === byPlaneVN.current) {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            gsap.to(ref.current, {opacity: 0, duration: 1})
            clearInterval(timer);
            return 100;
          }
          return Math.min(oldProgress + 1, 100);
        });
      }, 100); // Increase progress every 100ms
  
      return () => {
        clearInterval(timer);
      };
    }
  }
  return (
    <div ref={container} className='fixed h-screen w-screen overflow-clip by-plane'>

      
      <div ref={byPlane} className="by-plane-stage b-y-s-plane">
        <div id="window">
          <div className="window-wrapper">
          <div ref={windowSlide} id="window-slide">
            <div className="window-line"></div>
          </div>
            
          </div>
          <video id="by-plane-window" src="/video/by-plane.mp4" autoPlay muted loop></video>

        </div>
        <div style={{ width: '100%', backgroundColor: '#ddd' }}>
      <div style={{ height: '20px', width: `${progress}%`, backgroundColor: 'green' }} />
      <div className="site-item">Unboard</div>
    </div>
      </div>
      <div ref={byPlaneVN} className="by-plane-stage b-y-s-vn">
      <div className="vertical-sign">
        
        <div onClick={() => slideDissapear(byPlaneVN)} className="v-s-inner-container">
          <p className="vertical-sign-content v-s-alley">We<br></br>l<br></br>come</p>
          <p className="vertical-sign-content v-s-alley">Aboa<br></br>r<br></br>d</p>
        </div>
      </div>
      </div>
    </div>
  );
}
