import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Draggable from "gsap/dist/Draggable";


export default function Index() {

  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  useGSAP( () => {
    const targets = gsap.utils.toArray(["#byboat p", "#byplane p"])
    gsap.fromTo(targets, {scale: 0.85, opacity: 0}, {scale: 1, opacity: 1, stagger: 0.5})
    timeline.add(gsap.to(container.current, { opacity: 0 }))
  }, {scope: container})


  return (
    <div ref={container} className='fixed h-screen w-screen overflow-clip'>
          <div className="transportation-question outline-text"><span class="script">H</span>ow would you like to travel?</div>

        <Link scroll={false} href="/byboat">
        <div className="transportation-container" id="byboat">
            
            <div className=""><p className='travel-option outline-text'>By Boat</p></div>
        
        </div>
        </Link>
        <Link scroll={false} href="/byplane">
        <div className="transportation-container" id="byplane">
            
            <div className=""><p  className='travel-option outline-text'>By Plane</p></div>
       
        </div>
        </Link>
      </div>
   
  )
}
