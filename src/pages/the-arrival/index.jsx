import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from 'next/router';
import { useMute } from '@/context/MuteContext';
gsap.registerPlugin(ScrollTrigger);

export default function Index() {
  const routerPath = useRouter();
  useEffect(() => {
    
    window.onscroll = function(ev) {
      if(document.querySelector('.text-container')){
        if ((window.innerHeight + window.scrollY) >= document.querySelector('.text-container').offsetHeight) {
          // You're at the bottom of the page
          routerPath.push('/kitchen');
      }
  };
      }
      
  })
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // Empty depe
  const { muted } = useMute();
  const [audio, setAudio] = useState(null);
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  const router = useRouter();
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
  /*useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled to the bottom
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Navigate to a different page
        router.push('/kitchen');
      }
    };

    // Add the event listener when component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);*/
  useEffect(() => {
    ScrollTrigger.refresh()
    let triggerElement = document.getElementById("supermarket-end");
    let triggerElement2 = document.getElementById("cooking-end");
     let targetElement = document.getElementById("stove-bg");
     let targetElement2 = document.getElementById("the-arrival-bg");
   
     let tl = gsap.timeline({
       scrollTrigger: {
         trigger: triggerElement,
         // trigger element - viewport
         start: "top top",
         end: "bottom 50%",
         scrub: 1
       }
     });
   
     tl.fromTo(targetElement, {
         opacity: "0",
         
         duration: .2
       },
       {
         opacity: "1",
         
         duration: .2
       }
     );
   
    tl.fromTo(targetElement, {
           opacity: "1",
           duration: .2
         },
         {
           opacity: "0",
           duration: .2,
           scrollTrigger: {
             trigger: triggerElement2,
             start: "top top",
             end: "bottom 50%",
             scrub: 1
           }
         }
       );
       tl.fromTo(targetElement2, {
        opacity: "1",
        duration: .2
      },
      {
        opacity: "0",
        duration: .2,
        scrollTrigger: {
          trigger: triggerElement,
          start: "top top",
          end: "bottom 50%",
          scrub: 1
        }
      }
    );
     }, []);
   
    
   
 
 
  

  return (
    <div ref={container} id="the-arrival" className='w-screen'>
       
       <video className="fixed-video-bg" id="stove-bg" src="/video/stove-background.mp4" autoPlay muted loop></video>
       <video className="fixed-video-bg" id="the-arrival-bg" src="/video/dragonfruit-background.mp4" autoPlay muted loop></video>
        <div className="text-container">
        <div className="interview-gradient-3"></div>
                <div className="header-wrapper black-text">
                    
                <div className="eyebrow">Part two</div>
                <h2 className="script">The Arrival</h2>
                </div>
           
                
               
           
            <div className="interview-body orange-text ">
        
            <div className="body-text-container my-[60vh]" >
            <div id="google-map-container">
              <h4>Pan-Asia Supermarket <br />14246 Manchester Rd, <br />Manchester, MO 63011</h4>
              <Link passHref target="_blank" scroll={false} href="https://g.co/kgs/ZDT8qfE">
                
              <div className="indicator indicator-orange uppercase">Google Map</div>

              </Link>
            </div>
            </div>
                        <div className="interview-gradient-2 my-[10vh]"></div>

            <div className="body-text-container my-[40vh]">
            <div className="w-screen h-[70vh]"></div>
            <video className="w-[35vw] sticky translate-y-[35vh] top-[0] ml-[10vw]" src="/video/supermarket-walkthrough.mp4" autoPlay muted loop></video>

            <h5 className="co-hoang mr-[2vw] py-[60vh]">To be exact, back then<br /> I had 2-3 jobs when I <br />first got here</h5>
            <video className="w-[35vw] sticky translate-y-[35vh] top-[0] ml-[55vw]" src="/video/supermarket-walkthrough2.mp4" autoPlay muted loop></video>

            <h4 className="thuy ml-[2vw] mt-[40vh] pb-[80vh]">What were your first jobs?</h4>

            </div>

            <div className="body-text-container my-[80vh]">
            <video className="sticky top-[10vh] w-[80vw] pb-[10vh] mx-auto" src="/video/cohoang_walking.mp4" autoPlay muted loop></video>
            <div className="sticky top-[10vh] w-screen h-[90vh] z-[5] interview-gradient-4"></div>
              <div className="quote-sticky top-[10vh] z-10">
              <h4 className="co-hoang my-[2vh] mr-[25vw]">First, i worked as a seamstress, sewing ties</h4>
              <h4 className="co-hoang my-[2vh] mr-[15vw]">And then I worked for a hospital</h4>
              <h4 className="co-hoang my-[2vh] mr-[5vw]">Then I worked in a lab with mice</h4>
              </div>
              <video className="z-10 sticky top-[40vh] w-[20vw] left-[75vw]" src="/video/cohoang_walking2.mp4" autoPlay muted loop></video>

              <div className="quote-sticky top-[60vh] z-10">
              <h4 className="co-hoang my-[2vh] mr-[5vw]">But I got too scared, so I quit</h4>
              <h4 className="co-hoang my-[2vh] mr-[15vw]">I thought it didn't suit me so I quit</h4>
              <h4 className="co-hoang my-[2vh] mr-[25vw]">Then I worked by sewing these bags at home, <br />since I was working 2 jobs</h4>
              </div>
              
              
              

            </div>
            <div id="supermarket-end" className="body-text-container">
            <video className="w-[40vw] ml-[2vw]" src="/video/cohoang_getinggrocery.mp4" autoPlay muted loop></video>
            <h4 className="co-hoang mr-[2vw] my-[60vh]">I worked on Saturday and Sunday. So only on the weekend</h4>
            <h4 className="co-hoang mr-[2vw] my-[60vh]">Waiting tables at the Chinese restaurant on Olive Blvd.</h4>
            <video className="w-[90vw] mx-auto" src="/video/closeup-cohoang.mp4" autoPlay muted loop></video>

            </div>
            
            </div>
            <div className="body-text-container top-[50vh] my-[50vh]">
            <video className="w-[90vw] my-[50vh] mx-auto" src="/video/kitchen-1.mp4" autoPlay muted loop></video>
              </div>
              <img src="/images/baninox.jpeg" className="table-bg w-screen h-[110vh]" alt=""/>
              <div className="body-text-container top-[50vh] mt-[-100vh]">
                
                <h4 className="co-hoang mr-[2vw] my-[20vh]">Also, I had the help of my parents after I got them to move here</h4>
                <video className="z-10 sticky top-[30vh] w-[30vw] my-[50vh] ml-[4vw]" src="/video/kitchen-preparingtakeout.mp4" autoPlay muted loop></video>
                <h4 className="co-hoang mr-[2vw] my-[30vh]">Started out cooking in the house</h4>
                <h4 className="co-hoang mr-[2vw] my-[30vh]">So I thought if I can cook at home,</h4>
                <h3 className="co-hoang mr-[2vw] my-[30vh]">why don't I cook<br /> for other people?</h3>

              </div>
              <div className="body-text-container my-[50vh]" id="cooking-end">
              <video className="w-[70vw] my-[50vh] sticky top-[10vh] mx-auto" src="/video/kitchen-platingcanhchua.mp4" autoPlay muted loop></video>
              <h4 className="co-hoang mr-[2vw] my-[30vh]">So I got to work</h4>
              <h5 className="co-hoang mr-[2vw] my-[30vh]">Once I tried I fell <br />immediately in love with it</h5>

              </div>
              <div className="body-text-container mt-[10vh]">
              <h4 className="co-hoang mr-[2vw] my-[10vh]">I got rid of the other jobs</h4>
              <div className="sticky-pics top-[0] left-[0]">
                <img src="/images/sticky-pics-1.JPG" className="" alt=""/>
              </div>
              <h4 className="thuy ml-[2vw] mt-[40vh] pb-[80vh]">That's incredible! That's great!</h4>


              <div className="sticky-pics top-[0] left-[25vw]">
                <img src="/images/sticky-pics-2.JPG" className="" alt=""/>
              </div>
              <h4 className="co-hoang mr-[2vw] my-[10vh]">I wanted to make money</h4>

              <div className="sticky-pics top-[0] left-[50vw]">
                <img src="/images/sticky-pics-3.JPG" className="" alt=""/>
              </div>

              <h5 className="co-hoang mr-[2vw] my-[10vh]">Everyone who moved here all just <br />wanted to make money to send <br />back to their families</h5>

              <div className="sticky-pics top-[0] left-[75vw]">
                <img src="/images/sticky-pics-4.JPG" className="" alt=""/>
              </div>

              <h4 className="co-hoang mr-[2vw] my-[10vh]">helping their family as such</h4>

              <div className="sticky-pics top-[50vh] left-[0]">
                <img src="/images/sticky-pics-5.JPG" className="" alt=""/>
              </div>
              <h4 className="co-hoang mr-[2vw] my-[10vh]">And then I opened up this restaurant</h4>


              <div className="sticky-pics top-[50vh] left-[25vw]">
                <img src="/images/sticky-pics-6.JPG" className="" alt=""/>
              </div>

              <h4 className="co-hoang mr-[2vw] my-[10vh]">And sponsored my entire family to move here</h4>

              <div className="sticky-pics top-[50vh] left-[50vw]">
                <img src="/images/sticky-pics-7.JPG" className="" alt=""/>
              </div>
              <h5 className="co-hoang mr-[2vw] my-[10vh]">So I just live my life. <br />Ignore everything else...</h5>


              <div className="sticky-pics top-[50vh] left-[75vw]">
                <img src="/images/sticky-pics-8.JPG" className="" alt=""/>
              </div>

              <h4 className="co-hoang mr-[2vw] my-[10vh]">I have my son</h4>
              <video className="w-screen sticky top-[0] z-20" src="/video/cohoangandson.mp4" autoPlay muted loop></video>

              </div>
              <div className="body-text-container mt-[10vh]">
              
              <img src="/images/bango.jpeg" className="z-30 table-bg w-screen mt-[-20vh] h-[110vh]" alt=""/>
              <video className="z-40 relative w-[80vw] mx-auto" src="/video/interview--thankyou.mp4" autoPlay muted loop></video>
              <video className="z-40 relative w-[50vw] mt-[20vh] mb-[100vh] mx-auto" src="/video/puttingthetraydown.mp4" autoPlay muted loop></video>

              </div>
              
        </div>
        <audio id="clickAudio" src='/audio/the-arrival.mp3'></audio>

    </div>
   
  )
}