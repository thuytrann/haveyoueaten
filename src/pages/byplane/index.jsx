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
  const [inUS, setInUS] = useState(false);
 
  const [progressPlane, setProgressPlane] = useState(0);
 
  const videoRef = useRef();
  const canvasRef = useRef();
  
    const onTakeAPhoto = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.height = video.videoHeight;
    canvas.width = video.videoWidth;
      canvas.getContext('2d').drawImage(video, 0, 0);
      console.log(video.videoWidth, video.videoHeight, canvas.height, canvas.width);
      const img    = canvas.toDataURL('image/png');
      document.getElementById('existing-image-id').style.visibility = 'visible';
      document.getElementById('print-img').src = img;

      document.getElementById('existing-image-id').src = img;
      document.querySelector('.enter-america').classList.add('entered');
    };
  
  
  
    useEffect(() => {
      
    }, []);
  


  function slideDissapear(ref) {
    console.log("1", inUS, ref.current === byPlane.current);
    gsap.to(ref.current, {opacity: 0, duration: 1})
    ref.current.style.pointerEvents = 'none';
    if (ref.current === byPlaneVN.current) {
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
    
      const timer = setInterval(() => {
        setProgressPlane((oldProgress) => {
          if (oldProgress == 100) {
        
            // Stop the interval
      

      // Start the GSAP animation
   
          clearInterval(timer);
            
          document.querySelector('.unboard').classList.add('unboarded');
          }
          
          return Math.min(oldProgress + 1, 100);
        });
      
      }, 100); // Increase progress every 100ms
      
      
      
    }else if(ref.current === byPlane.current) {
      console.log("hiii");
      const video = videoRef.current;

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            if ('srcObject' in video) {
              video.srcObject = stream;
            } else {
              video.src = window.URL.createObjectURL(stream);
            }
            video.play();
          })
          .catch((err) => {
            console.error(err.name + ': ' + err.message);
          });
      }
    }
   
  }

 
  
  return (
    <div ref={container} className='fixed h-screen w-screen overflow-clip by-plane'>
 <div className="print-img-container">
  <img id="print-img" src="" />
 </div>
<div ref={byPlaneUS} className="by-plane-stage b-y-s-us">
<div id="camera-wrapper">
        <h5 className="my-[5vh] text-center script">Welcome to <br /> the United States</h5>
        <div className="camera-container">
        <video id="camera" ref={videoRef} autoPlay></video>
      <canvas ref={canvasRef}></canvas>
      <img id="existing-image-id" src=""/>

        </div>
      
        <button className="mx-auto mt-[2vh] relative " id="camera-button" onClick={onTakeAPhoto}>Take A Photo For Your Global Entry</button>

    </div>
    <div className="v-s-inner-container">
          <p className="vertical-sign-content v-s-alley enter-america">Enter</p>
        </div>
      </div>
      <div ref={byPlane} className="by-plane-stage b-y-s-plane">
        <div id="window">
          <div className="window-wrapper">
          <div ref={windowSlide} id="window-slide">
            <div className="window-line"></div>
          </div>
            
          </div>
          <video id="by-plane-window" src="/video/by-plane.mp4" autoPlay muted loop></video>

        </div>
        <div className="progress-bar">
        <div style={{ width: '100%', backgroundColor: '#ddd' }}>
      <div style={{ height: '2vh', width: `${progressPlane}%`, backgroundColor: '#43C2A3' }} />
        </div>
        
      
    </div>
    <div className="vertical-sign unboard">
        
        <div onClick={() => slideDissapear(byPlane)} className="v-s-inner-container">
          <p className="vertical-sign-content v-s-alley">Unboard</p>
        </div>
      </div>
      </div>
      <div ref={byPlaneVN} className="by-plane-stage b-y-s-vn">
      <div className="vertical-sign">
        
        <div onClick={() => slideDissapear(byPlaneVN)} className="v-s-inner-container">
          <p className="vertical-sign-content v-s-alley">We<br></br>l<br></br>come</p>
          <p className="vertical-sign-content v-s-alley">Aboa<br />r<br></br>d</p>
        </div>
      </div>
      </div>
      
    </div>
  );
}
