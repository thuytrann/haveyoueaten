import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { useMute } from '@/context/MuteContext';
gsap.registerPlugin(ScrollTrigger);


export default function Index() {
  ScrollTrigger.refresh()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty depe
  const { muted } = useMute();
  const [audio, setAudio] = useState(null);
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  useEffect(() => {
    document.addEventListener('click', function() {
      var audioPlay = document.getElementById('clickAudio');
      if(audioPlay){
        audioPlay.play();

      }
    });
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

 let triggerElement = document.querySelector('.intro-vid-2');
 let triggerElement2 = document.querySelector('.interview-gradient-2');
  let targetElement = document.querySelector('.bg-img-wooden');

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top top",
      end: "bottom bottom",
 
      scrub: 1
    }
  });

  tl.fromTo(targetElement, {
      opacity: "0",
      
      duration: .1
    },
    {
      opacity: "1",
      
      duration: .1
    }
  );

  tl.fromTo(targetElement, {
        opacity: "0",
        duration: .2
      },
      {
        opacity: "1",
        duration: .2,
        scrollTrigger: {
          trigger: triggerElement2,
          start: "top top",
          end: "bottom 50%",
          scrub: 1
        }
      }
    );
  }, []);

 

 
 
  

  return (
    <div ref={container} id="the-departure" className='w-screen'>
        <div className="fixed top-0 z-[1] w-screen h-screen bg-img-wooden"></div>
       <video className="fixed-video-bg" id="the-departure-bg" src="/video/immigrationbg.mp4" autoPlay muted loop></video>
        <div className="text-container">
        <div className="interview-gradient"></div>
                <div className="header-wrapper black-text">
                    
                <div className="eyebrow">Part one</div>
                <h2 className="script">The Departure</h2>
                </div>
           
                
               
           
            <div className="interview-body blue-text ">
            <div className="body-text-container" >
             <h4 className="co-hoang mr-[4vw] my-[50vh]">My full name in Vietnam is<br></br> Lâm Thị Kim Hoàng</h4>
             <video id="t-d-vid-intro" src="/video/intro_1.mp4" autoPlay muted loop></video>
             <div className="outline-text-2 text-right flex gap-[4vw] flex-col absolute mt-[-4vw] right-[12vw]">
             <h5>Chef and Owner</h5>
             <h2 className="mt-[-5vw] script">Ho<span className="diacritics-sm">à</span>ng L<span className="diacritics-sm">â</span>m</h2>
             </div>
             <h4 className="co-hoang mr-[2vw] my-[60vh]">And I've owned this restaurant for more than 30 years now.</h4>
             <video className="z-10 relative w-screen intro-vid-2" src="/video/intro_2.mp4" autoPlay muted loop></video>
            <div className="bango-wrapper">
            

            </div>
             <h4 className="thuy ml-[2vw] my-[60vh]">So you lived in Mỹ Tho before you immigrated to America. When did you move here?</h4>
             <img className="mx-auto top-[10vh] rotate-[7deg] w-[30vw] sticky z-0" src="/images/hinh2.png"></img>
             <h4 className="co-hoang mr-[2vw] my-[60vh]">I immigrated in 1980</h4>
             <h4 className="thuy ml-[2vw] my-[60vh]">How old were you when you first immigrated?</h4>
              <img className="mx-auto top-[10vh] rotate-[-7deg] w-[30vw] sticky z-0" src="/images/hinh3.png"></img>

             <h2 className="co-hoang mr-[2vw] my-[60vh]">I was about <br />23-24 years old</h2>
             <h4 className="thuy ml-[2vw] my-[60vh]">Oh gosh... you were just about 3 years older than me now!</h4>
             <h4 className="co-hoang mr-[2vw] my-[60vh]">I went to school, but then I had to help <br />out the family so I stopped</h4>
              <img className="mx-auto top-[25vh] rotate-[-7deg] w-[30vw] sticky z-0" src="/images/hinh1.png"></img>
             <h4 className="co-hoang mr-[2vw] my-[60vh]">I dropped out</h4>
             <h4 className="thuy ml-[2vw] my-[60vh]">Did you flee to America at 24 years old by yourself?</h4>
              <img className="mx-auto top-[25vh] rotate-[-7deg] w-[30vw] sticky z-0" src="/images/hinh4.png"></img>


            </div>
            <div className="body-text-container" >
                     <div className="interview-gradient-2 mb-[10vh]"></div>
             <h4 className="co-hoang-2 mr-[2vw] mt-[30vh] py-[60vh]">I went with my husband's family, <br />I had a husband in Vietnam</h4>
             <h5 className="co-hoang-2 mr-[2vw] my-[60vh]">However, when we got to an island by boat, he got sick and passed away</h5>
            <h4 className="co-hoang-2 mr-[2vw] mt-[60vh]">So I just went on with his family. All of his family are here</h4>
            <h4 className="co-hoang-2 mr-[2vw] my-[5vh]">So I just fled with them</h4>
            <h5 className="co-hoang-2 mr-[2vw] my-[5vh]">I basically went by myself</h5>
            <img className="ml-[5vw] top-[10vh] rotate-[7deg] w-[30vw] sticky z-0" src="/images/hinh6.png"></img>
            <h4 className="co-hoang-2 mr-[2vw] mt-[60vh]">Therefore, the church saw that I was by myself</h4>
            <img className="ml-[5vw] top-[10vh] rotate-[-7deg] w-[40vw] sticky z-0" src="/images/hinh5.png"></img>
            <h5 className="co-hoang-2 mr-[2vw] mt-[60vh] pb-[60vh]">So they adopted me <br /> as one of their own</h5>





            </div>

            <div className="body-text-container" >
              <h4 className="thuy ml-[2vw] my-[60vh]">You were so brave then! <br /> I cannot imagine...</h4>
             <video className="w-[60vw] mx-auto" src="/video/vuotbien-story.mp4" autoPlay muted loop></video>

            </div>

            <div className="body-text-container" >
              <h4 className="thuy ml-[2vw] mt-[60vh]">So I cannot fathom</h4>
              <h4 className="thuy ml-[8vw] my-[5vh]">At 24 years old, you had to seek refuge by boat, and survive in America</h4>
              <h4 className="thuy ml-[14vw] my-[5vh]">Not knowing any English</h4>
             <img className="mx-auto top-[10vh] rotate-[-7deg] w-[60vw] sticky z-0" src="/images/hinh7.png"></img>
            <h5 className="co-hoang mr-[2vw] mt-[60vh]">I had no choice <br />but to try to survive</h5>
            <h4 className="co-hoang mr-[2vw] mt-[5vh] pb-[60vh]">Living here, I couldn't understand anything around me</h4>

            </div>
            <div className="body-text-container t-d-footer" >
              <div className="eyebrow outline-text">Part two</div>
                <h2 className="script outline-text-2">The Arrival</h2>
        <Link scroll={false} href="/the-arrival">
        <div className="btn px-6 py-4 indicator-orange">Continue<svg className="inline ml-3" xmlns="http://www.w3.org/2000/svg" width="12" height="21" viewBox="0 0 12 21" fill="none">
  <path d="M1 1L10 10.5L1 20" stroke="#FF540F" stroke-width="2"/>
</svg>
        </div>
        </Link>
            </div>

            </div>
            
        </div>
        <audio id="clickAudio" src='/audio/the-departure-sound.mp3'></audio>

    </div>
   
  )
}
