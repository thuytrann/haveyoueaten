import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";


export default function Index() {
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
   
  

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container.current,
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });
  gsap.utils.toArray(".body-text-container").forEach(layer => {
    const depth = layer.dataset.depth;
    const movement = -(layer.offsetHeight * depth)
    tl.to(layer, {y: movement, ease: "none"}, 0)
  });

  gsap.utils.toArray(".body-text-item").forEach(layer => {
    const depth = layer.dataset.depth;
    const movement = -(layer.offsetHeight * depth)
    tl.to(layer, {y: movement, ease: "none"}, 0)
  });

  })
  
 
 
  

  return (
    <div ref={container} id="the-conversation" className='w-screen'>
       <video className="fixed-video-bg" id="the-conversation-bg" src="/video/the-conversation-background.mp4" autoPlay muted loop></video>
        <div className="text-container t-c-container  outline-text-2">
            <div className="header-container" data-depth='0.10'>
                <h3>Conversation</h3>
                <h1 className="script">C<span className="diacritics-sm">ô</span> Ho<span className="diacritics-sm">à</span>ng</h1>
                <div className="eyebrow" id="with-eyebrow">With</div>
               
            </div>
            
            <div className="body-text-container" data-depth='0.20'>
              <h4 data-depth='0.35' className="body-text-item">1:00PM</h4>
              <h2 className="text-right pt-96 w-10/12 float-right">St. Louis, MO, USA</h2>
            </div>
            <div className="body-text-container" data-depth='0.55'>
            <div className="t-c-gradient"></div>
            <video data-depth='0.15' className="body-text-item" id="outsiderestaurant-content" src="/video/outsiderestaurant-content.mp4" autoPlay muted loop></video>
            <h3 data-depth='0.95' className="body-text-item script outline-text">Tr<span className="diacritics-sm">ú</span>c L<span className="diacritics-sm">â</span>m Restaurant</h3>
            </div>
        </div>
      
    </div>
   
  )
}
