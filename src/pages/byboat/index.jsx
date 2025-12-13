import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Draggable from "gsap/dist/Draggable";
import { useMute } from '@/context/MuteContext';

export default function Index() {
  const { muted } = useMute();
  const [audio, setAudio] = useState(null);
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  useEffect(() => {
    //document.addEventListener('click', function() {
      var audioPlay = document.getElementById('clickAudio');
      if(audioPlay){
        audioPlay.play();

      }
    //});
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

  return (
    <div ref={container} className='w-screen by-boat'>
      <video className="fixed-video-bg" id="by-boat-bg" src="/video/by-boat-background.mp4" autoPlay muted loop></video>
      <div className="boat-gradient"></div>
      <div className="by-boat-text">
        <div className='poem-title-container'>
            <div className='poem-title'>Diary of</div>
            <div className='poem-title'>crossing sea</div>
        </div>
        <div className='poem-title-container'>
            <div className='poem-title'>By Ngô Thiên Tú</div>

        </div>
        <div className="text-container poem-line-container">
          <div className="poem-line-wrapper relative">
            <div className="poem-line">I rewrite here the verses that transcend waves</div>
            <div className="poem-line">Once crossing borders, oh the bitter pain</div>
          </div>
          <div className="poem-line-wrapper relative">
            <div className="poem-line">Homeland is the open sea, vast and obscure</div>
            <div className="poem-line">With no shore in sight, each moment awaits</div>
          </div>
          <div className="poem-line-wrapper relative">
            <div className="poem-line">Sun scorching hearts, storms killing prayers</div>
            <div className="poem-line">Thirsty lips, yet the sea remains briny</div>
          </div>
          <div className="poem-line-wrapper relative">
            <div className="poem-line">Boats rocking violently, robbed and wounded</div>
            <div className="poem-line">Closing eyes, waiting amidst wild waves and burning sun</div>
          </div>
          <div className="poem-line-wrapper poem-line-last pll1">
            <div className="poem-line">Seeking freedom in life's wandering</div>
            <div className="poem-line">Drifting to wherever, amidst the boundless waters</div>
          </div>
          <div className="poem-line-wrapper poem-line-last pll2">
            <div className="poem-line">Hour by hour, searching for land or deserted isle</div>
            <div className="poem-line">Lulling fate, oh <span className="italic">Việt Nam</span>, mother and child</div>
          </div>
          
        </div>
        <div className="poem-footer">
        <div className="eyebrow">diary of</div>
        <div className="poem-bottom-title script">Crossing Sea</div>
        <Link scroll={false} href="/the-conversation">
        <div className="btn px-6 py-4 absolute bottom-12 right-12">Continue<svg className="inline ml-3" xmlns="http://www.w3.org/2000/svg" width="12" height="21" viewBox="0 0 12 21" fill="none">
  <path d="M1 1L10 10.5L1 20" stroke="#FF540F" stroke-width="2"/>
</svg>
        </div>
        </Link>
        
        </div>
        
        </div>
        <audio id="clickAudio" src='/audio/by-boat-sound.mp3'></audio>

      </div>
   
  )
}