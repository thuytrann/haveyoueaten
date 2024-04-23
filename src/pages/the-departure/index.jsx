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
    <div ref={container} id="the-departure" className='w-screen'>
       <video className="fixed-video-bg" id="the-departure-bg" src="/video/immigrationbg.mp4" autoPlay muted loop></video>
        <div className="text-container">
        <div className="interview-gradient"></div>
                <div className="header-wrapper black-text">
                    
                <div className="eyebrow">Part one</div>
                <h2 className="script">The Departure</h2>
                </div>
           
                
               
           
            <div className="interview-body blue-text ">
            <div className="body-text-container" >
             <div className="co-hoang mr-[4vw] my-[50vh]">My full name in Vietnam is<br></br> Lâm Thị Kim Hoàng</div>
             <video id="t-d-vid-intro" src="/video/intro_1.mp4" autoPlay muted loop></video>
             <div className="outline-text-2 text-right flex gap-[4vw] flex-col absolute mt-[-4vw] right-[12vw]">
             <h5>Chef and Owner</h5>
             <h2 className="mt-[-5vw] script">Ho<span className="diacritics-sm">à</span>ng L<span className="diacritics-sm">â</span>m</h2>
             </div>
             <div className="co-hoang mr-[2vw] my-[60vh]">And I've owned this restaurant for more than 30 years now.</div>
             <video className="z-10 relative w-screen" src="/video/intro_2.mp4" autoPlay muted loop></video>
            <div className="bango-wrapper">
            <img className="z-0 bango-texture" src="/images/bango.jpeg"/>

            </div>
             <div className="thuy mr-[2vw] my-[60vh]">So you lived in Mỹ Tho before you immigrated to America. When did you move here?</div>

            </div>
            <div className="body-text-container" >
             
            </div>
            </div>
            
        </div>
      
    </div>
   
  )
}
