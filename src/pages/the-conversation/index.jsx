import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useMute } from '@/context/MuteContext';

export default function Index() {
  const { muted } = useMute();
  const [audio, setAudio] = useState(null);
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  useEffect(() => {
    
      var audioPlay = document.getElementById('clickAudio');
      if(audioPlay){
        audioPlay.play();

      }

    return () => {
      
    };
  }, []);
  useEffect(() => {
    var audioPlay = document.getElementById('clickAudio');
    console.log('muted', muted, audioPlay);

    if (muted) {
      audioPlay.muted = true; 
      console.log('muted', muted, audioPlay);

    }
    else{
      audioPlay.muted = false; 
    }
  }, [muted, audio])

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
        <div className="text-container t-c-container">
            <div className="header-container outline-text-2" data-depth='0.10'>
                <h3>Conversation</h3>
                <h1 className="script">C<span className="diacritics-sm">ô</span> Ho<span className="diacritics-sm">à</span>ng</h1>
                <div className="eyebrow outline-text" id="with-eyebrow">With</div>
               
            </div>
            
            <div className="body-text-container " data-depth='0.20'>
              <h4 data-depth='0.35' className="body-text-item outline-text">1:00PM</h4>
              <h2 className="text-right pt-96 w-10/12 float-right outline-text-2">St. Louis, MO, USA</h2>
            </div>
            <div className="body-text-container" data-depth='0.55'>
            <div className="t-c-gradient"></div>
            <video  className="body-text-item" id="outsiderestaurant-content" src="/video/outsiderestaurant-content.mp4" autoPlay muted loop></video>
            <div className="gradient-body-text">
            <h2 className="body-text-item script outline-text-2" id="restaurant-name">Tr<span className="outline-text diacritics-sm">ú</span>c L<span className="outline-text diacritics-sm">â</span>m <br></br>Restaurant</h2>
            
            <img id="restaurant-banner" src="/images/restaurantbanner.png"  alt="Trúc Lâm Restaurant Logo"/>
            
            </div>
            <div id="google-map-container">
              <h4 className="blue-text">3737 Gravois Ave<br></br>St. Louis, MO, USA</h4>
              <Link passHref target="_blank" scroll={false} href="https://g.co/kgs/ZDT8qfE">
                
              <div className="indicator indicator-blue uppercase">Google Map</div>

              </Link>
            </div>
            </div>
            <div className="body-text-container">
              <Link scroll={false} href="/the-departure">
              <div className="neon-sign-container">
              
                <img id="neon-off" src="/images/neon-off.png" alt=""/>
                <img id="neon-on" src="/images/neon-on.png" alt=""/>
              </div>
              <div id="t-c-indi" className="indicator indicator-blue"><span className="uppercase">Click </span> neon sign to continue</div>
              <div id="t-c-footer"></div>
              </Link>
              
            </div>
        </div>
        <audio id="clickAudio" src='/audio/the-conversation-sound.mp3'></audio>

    </div>
   
  )
}
