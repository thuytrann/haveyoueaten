import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


export default function Index() {
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
 
 
 
  

  return (
    <div ref={container} id="the-arrival" className='w-screen'>
       <video className="fixed-video-bg" id="the-departure-bg" src="/video/immigrationbg.mp4" autoPlay muted loop></video>
        <div className="text-container">
        <div className="interview-gradient"></div>
                <div className="header-wrapper black-text">
                    
                <div className="eyebrow">Part two</div>
                <h2 className="script">The Arrival</h2>
                </div>
           
                
               
           
            <div className="interview-body blue-text ">
        
            <div className="body-text-container" >
             
            </div>
            </div>
            
        </div>
      
    </div>
   
  )
}
