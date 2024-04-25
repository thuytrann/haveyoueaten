import React, { useRef, useContext } from 'react'
import Picture from '../../../public/images/3.jpg'
import Image from 'next/image';
import { TransitionContext } from '@/context/TransitionContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMute } from '@/context/MuteContext';

export default function Index() {

  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  const image = useRef();
  const { muted } = useMute();
  const [audio, setAudio] = useState(null);
  const danisaContainer = () => {
    
    document.querySelector('.danisa-container').classList.toggle('danisa-opening');
  };
  
  const danisaOpen = () => {
    
    document.getElementById('danisa-close').classList.toggle('danisa-closing');

  };
  
  useEffect(() => {
    //document.addEventListener('click', function() {
      const audioPlay = document.getElementById('clickAudio');
      if(audioPlay != null){
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

  const playSound = (audioSrc) => {
    
    if (typeof window !== 'undefined' && !muted) {
        const sound = new Audio(audioSrc);
    setAudio(sound);
    sound.play();
    }

  
  };

  const stopSound = () => {
    if (audio) {
      audio.pause();
      
      setAudio(null);
    }
  };
  useGSAP( () => {
    const targets = gsap.utils.toArray(["p", ".vertical-sign"])
    gsap.fromTo(targets, {scale: 0.85, opacity: 0}, {scale: 1, opacity: 1, stagger: 0.5})
    timeline.add(gsap.to(container.current, { opacity: 0 }))
  }, {scope: container})

  return (
    <div ref={container} className='fixed h-screen w-screen overflow-clip living-room'>
      <div className="h-[100vh] w-full flex flex-col justify-center items-center gap-5">
      <Link scroll={false} href="/kitchen">
          <div className="vertical-sign" id="vs-kitchen">
        
            <div className="v-s-inner-container">
              <p className="vertical-sign-content">Ki<br></br>tchen</p>

            </div>
          </div>
        </Link>
        <Link scroll={false} href="/transportation">
          <div className="vertical-sign" id="vs-journey">
        
            <div className="v-s-inner-container">
              <p className="vertical-sign-content">Journey</p>

            </div>
          </div>
        </Link>
        
      </div>
      <div onClick={danisaContainer} className="hover-item-container" id="danisa">
      <svg className="hover-item" width="7.5vw" height="auto" viewBox="0 0 144 111" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 76L3 42.5L1 38V25.5C1 17.6667 15.2 0.5 68 0.5C120.8 0.5 140.333 16.1667 143.5 24V36L140.5 42V70.5C141.333 82.8333 129.6 107.9 76 109.5C22.4 111.1 5.66667 87.8333 4 76Z" fill="none" strokeWidth="1" stroke="#FF0089"/>
</svg>

      </div>
      <Link scroll={false} href="/transportation">

      <div className="hover-item-container" id="luggages">
      <svg className="hover-item" width="26.5vw" height="auto" viewBox="0 0 520 424" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 290.501L1.5 412.501C28.3333 413.001 86.6 414 105 414C123.4 414 196.333 420 230.5 423L232.5 415.5L236 314L238 307L239.5 279L250.5 281L245.5 401.5C280.5 401 354.5 400.3 370.5 401.5C386.5 402.7 427.833 408.333 446.5 411L462.5 296.5H476.5L479.5 179H494.5C500.5 179 506.667 176.333 509 175C509.667 163 511.2 136 512 124C512.8 112 517 84.3333 519 72H496.5C494.5 68.1667 488.5 59.6 480.5 56C472.5 52.4 451.167 49.1667 441.5 48L426 20.0003L431 1.50032C426.833 1.16698 418 0.700315 416 1.50032C414 2.30032 396.5 14.167 388 20.0003L381 15.0003C372.833 13.167 355.3 9.4005 350.5 9.0005C344.5 8.5005 343 9.5005 340.5 10.5005C338.5 11.3005 334.333 15.1672 332.5 17.0005C331.333 16.8338 326.7 16.4003 317.5 16.0003C308.3 15.6003 294 17.5003 288 18.5003C285.667 18.8336 281 20.3003 281 23.5003C281 26.7003 276.667 33.5003 274.5 36.5003C270.667 37.0003 262.2 39.5003 259 45.5003C255.8 51.5003 246.667 60.667 242.5 64.5003C239.667 60.5003 232.5 52.5003 226.5 52.5003C219 52.5003 191 50.0011 181 47.0011C171 44.0011 158.5 44.5011 148 45.5011C139.6 46.3011 125.833 49.5011 120 51.0011C116.667 55.5011 109.8 64.8011 109 66.0011C108 67.5011 91.5 75.0011 88 78.0011C85.2 80.4011 83.5 85.0011 83 87.0011C83 87.0011 48.1667 89.5011 39.5 91.0011C37.3333 103.668 32.8 129.501 32 131.501C31 134.001 23 133.501 20.5 134.001C18 134.501 17 138.001 19 141.001C21 144.001 25.5 144.501 29 147.501C31.8 149.901 32.1667 155.501 32 158.001C29.8333 158.001 24.8 157.701 22 156.501C18.5 155.001 6 159.501 4.5 164.501C3 169.501 6 175.501 11.5 178.001C17 180.501 40 185.501 38.5 185.501C37 185.501 26 197.001 25.5 198.501C25.1 199.701 26.6667 206.668 27.5 210.001C25.3333 210.834 20.7 212.901 19.5 214.501C18 216.501 16 225.001 16 227.001C16 228.601 17.6667 229.668 18.5 230.001V237.001C18.5 239.001 16.8333 246.168 16 249.501C14.6667 251.501 12 256.101 12 258.501C12 260.901 13 263.168 13.5 264.001C12 264.835 8.5 266.801 6.5 268.001C4.5 269.201 2.33333 272.835 1.5 274.501V281.001L8 288.001L9 290.501Z" fill="none" strokeWidth="1" stroke="#FF0089"/>
</svg>

      </div>
      </Link>
      <Link scroll={false} href="/">

      <div onMouseEnter={() => playSound('/audio/background-sound.mp3')} onMouseLeave={stopSound} className="hover-item-container" id="outside">
      <svg className="hover-item" width="4.6vw" height="auto" viewBox="0 0 92 148" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.21228 9.6877L1.09094 9.73656L2.1987 103.173L15.2662 104.413L15.291 106.505L24.2205 106.399L24.3032 113.372L30.4852 113.298L37.3376 111.822L38.8519 123.66L47.2682 138.205L47.1277 126.351L52.6228 126.286L52.8129 142.324L59.0528 147.132L89.276 146.773L91.0902 10.0643L78.7096 8.81633L59.4188 4.16334L54.5775 1.4312L54.6271 5.61492L45.0106 5.72893L45.052 9.21537L23.088 10.8705L12.0564 7.5144L12.0399 6.11983L5.17095 6.20126L5.21228 9.6877Z" fill="none" strokeWidth="1" stroke="#FF0089"/>
</svg>


      </div>
      </Link>
      <div onMouseEnter={() => playSound('/audio/haikich.mp3')} onMouseLeave={stopSound} className="hover-item-container" id="tv">
      <svg className="hover-item" width="7vw" height="auto" viewBox="0 0 138 187" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5854 158.151L1 1H122.405C125.722 21.9976 132.489 69.1649 133.02 89.853C133.55 110.541 135.894 162.571 137 186L17.5854 158.151Z" stroke="#FF540F"/>
</svg>
      </div>
     
      <div onMouseEnter={() => playSound('/audio/fan-sound.mp3')} onMouseLeave={stopSound} className="hover-item-container" id="fan">
      <svg className="hover-item" width="5.2vw" height="auto" viewBox="0 0 101 171" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.7329 100.006C34.4973 108.088 47.3356 109.659 52.5342 109.435V139.743L41.6849 147.151C39.8767 147.151 34.226 148.229 26.089 152.539C17.9521 156.85 21.7945 162.866 24.7329 165.336C29.7055 167.581 45.6178 171.532 69.4863 169.377C99.3219 166.683 96.6096 156.58 95.9315 154.56C95.389 152.943 85.7603 148.947 81.0137 147.151C81.0137 147.151 71.7466 140.416 67.452 138.396V108.088C78.3014 101.353 100 81.2822 100 54.8806C100 21.8788 70.8425 1 44.3973 1C17.9521 1 1 29.2873 1 51.5131C1 73.7389 12.5274 89.9031 24.7329 100.006Z" stroke="#FF540F"/>
</svg>

      
    </div>
    <div onClick={danisaOpen} className="danisa-container">
    <img  id="danisa-open" src="images/danisa-open.png" alt=""></img>
      <img  id="danisa-close" src="images/danisa-close.png" alt=""></img>
      
    </div>
    <svg>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </svg>

      
      <audio id="clickAudio" src='/audio/background-sound.mp3'></audio>
      <div className="prefetch">
    <img src="images/Bango.jpeg" alt=""></img>
    <img src="images/Baninox.jpeg" alt=""></img>
    <img src="images/ca1.png" alt=""></img>
    <img src="images/ca2.png" alt=""></img>
    <img src="images/ca3.png" alt=""></img>
    <img src="images/canh-1.png" alt=""></img>
    <img src="images/canh-2.png" alt=""></img>
    <img src="images/canh-3.png" alt=""></img>
    <img src="images/rau-1.png" alt=""></img>
    <img src="images/rau-2.png" alt=""></img>
    <img src="images/rau-3.png" alt=""></img>
    <img src="images/cakhoto.png" alt=""></img>
    <img src="images/canhchua.png" alt=""></img>
    <img src="images/rauxao.png" alt=""></img>
    <img src="images/com-0.png" alt=""></img>
    <img src="images/com-1.png" alt=""></img>
    <img src="images/com-2.png" alt=""></img>
    <img src="images/com-3.png" alt=""></img>
  </div>
    </div>
    
  )
}
