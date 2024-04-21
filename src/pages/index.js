import { useGSAP } from '@gsap/react';
import { TransitionContext } from '@/context/TransitionContext';
import gsap from "gsap";
import { useContext, useRef } from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMute } from '@/context/MuteContext';

export default function Home(/*{ params: { lng } }*/) {
  
  const { muted } = useMute();
  const [audio, setAudio] = useState(null);
  useEffect(() => {
    document.addEventListener('click', function() {
      var audioPlay = document.getElementById('clickAudio');
      audioPlay.play();
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
  

  

  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  const image = useRef();
  //console.log(container, container.current)
  useEffect(() => {
    const nauVau = document.getElementById('nauvau');

    const customCursor = document.getElementById('cursor');

  
    const handleMouseMove = (e) => {
      // Set custom cursor position to match mouse position
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    };

    const handleMouseDown = () => {
      // Change cursor background image when mouse is down
      customCursor.style.backgroundImage = "url('images/cursor2.svg')";
    };

    const handleMouseUp = () => {
      // Change cursor background image back to normal when mouse is up
      customCursor.style.backgroundImage = "url('images/cursor2.svg')";
    };

    // Listen for mousemove, mousedown, and mouseup events on the document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Clean up event listeners when component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  useGSAP( () => {
    const targets = gsap.utils.toArray(["p", image.current])
    gsap.fromTo(targets, {y: 30, opacity: 0}, {y: 0, opacity: 1, stagger: 0.5})
    timeline.add(gsap.to(container.current, { opacity: 0 }))
  }, {scope: container})

  return (
    
    <div ref={container} className='fixed h-screen w-screen overflow-clip alleyway'>

      <div className="h-[100vh] flex flex-col justify-center items-center gap-5">
        
        <Link scroll={false} href="/about">
          <div className="vertical-sign">
        
            <div className="v-s-inner-container">
              <p className="vertical-sign-content v-s-alley">Enter</p>
              <p className="vertical-sign-content v-s-alley">Here</p>
            </div>
          </div>
        </Link>
        
          <div className="about-sign">
            <div className="about-sign-item">
              <div className="a-s-i-outline"></div>
              <div className="a-s-i-about">About</div>
              <div className="a-s-i-bottom">
              <div className="a-s-i-this-project">This <br></br> Project</div>
              <div className="a-s-i-number">0918151854</div>
              </div>
              
            </div>
            <div className="about-sign-item">
              <div className="a-s-i-outline"></div>
              <div className="a-s-i-about">About</div>
              <div className="a-s-i-bottom">
              <div className="a-s-i-this-project">This <br></br> Project</div>
              <div className="a-s-i-number">0918151854</div>
              </div>
              
            </div>
            <div className="about-sign-item">
              <div className="a-s-i-outline"></div>
              <div className="a-s-i-about">About</div>
              <div className="a-s-i-bottom">
              <div className="a-s-i-this-project">This <br></br> Project</div>
              <div className="a-s-i-number">0918151854</div>
              </div>
              
            </div>
          </div>
       <div className="about-container">

       </div>
      </div>
      <div onMouseEnter={() => playSound('/audio/tiengreo.mp3')} onMouseLeave={stopSound} className="hover-item-container" id="nuocmia">
      <svg className="hover-item"  width="369" height="575" viewBox="0 0 369 575" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.944 372.23L19.3218 371.5H18.5C16.8382 371.5 12.732 371.4 9.56202 371.004C7.56426 370.754 6.82299 370.514 6.19509 369.991C5.86364 369.715 5.54821 369.346 5.10918 368.797C5.02197 368.688 4.9304 368.573 4.83358 368.451C4.45013 367.967 3.98422 367.38 3.37963 366.675C1.19958 364.131 0.561169 360.484 0.504292 358.75L15.2957 347.903L15.5098 347.746L15.4996 347.481L13.9997 308.482L13.9996 308.481L3.00947 3.7537L7.5 0.610328L12.0631 3.8045L14.5165 13.1272L14.6146 13.5H15H360.5H360.877L360.981 13.1374L363.877 3H368.5V57.9875L342.002 353.465L341.98 353.709L342.159 353.876L356.635 367.353C357.415 368.307 359 371.079 359 374.51C359 376.542 358.129 377.894 356.951 378.875C355.752 379.873 354.244 380.48 352.979 380.984C352.978 380.984 352.976 380.985 352.975 380.986L352.824 381.042L352.814 381.046C352.37 381.223 351.678 381.379 350.816 381.509C349.964 381.638 348.978 381.737 347.965 381.811C345.938 381.96 343.826 382.01 342.5 382.01H341.824L342.022 382.656C342.604 384.561 343.475 387.699 344.201 390.907C344.93 394.127 345.5 397.371 345.5 399.51C345.5 404.978 344.503 414.945 343.51 419.912C343.116 421.88 341.709 426.6 340.097 431.735C338.489 436.857 336.69 442.354 335.526 445.852L335.503 445.919L335.5 445.99C335.171 454.149 334.5 470.997 334.5 473.01C334.5 473.294 334.359 473.542 334.011 473.775C333.651 474.016 333.115 474.203 332.466 474.333C331.173 474.592 329.598 474.595 328.539 474.512L328.021 474.471L328 474.99L325.4 540.04C313.06 539.535 300.575 538.955 294.537 538.511C287.82 538.014 278.596 536.394 270.533 534.832C267.295 534.204 264.238 533.584 261.609 533.051C257.719 532.263 254.768 531.665 253.562 531.514C253.078 531.453 252.297 531.538 251.343 531.703C250.366 531.872 249.145 532.139 247.743 532.48C244.939 533.161 241.391 534.145 237.598 535.254C230.018 537.471 221.443 540.195 215.855 542.031C212.261 543.034 206.754 544.711 201.89 546.49C199.456 547.38 197.173 548.3 195.367 549.176C194.465 549.614 193.673 550.045 193.037 550.462C192.412 550.872 191.898 551.292 191.593 551.719L191.517 551.826L191.503 551.956L189.763 568.078L83.0006 562.981L79.497 530.946L79.4881 530.864L79.4537 530.79L69.9537 510.29L69.8832 510.138L69.7353 510.059L27.5 487.53V461V460.5H27H20.5V438C20.5 436.799 20.1686 435.333 19.6687 433.56C19.4186 432.672 19.1158 431.675 18.7822 430.575C18.4544 429.495 18.0969 428.316 17.7303 427.049C16.2359 421.88 14.4933 414.91 13.4973 405.448C11.9093 390.362 16.4805 376.989 18.944 372.23Z" fill="none" strokeWidth="1" stroke="#FF540F"/>
</svg>

      </div>
      <div onMouseEnter={() => playSound('/audio/nau-vau.m4a')} onMouseLeave={stopSound} className="hover-item-container" id="nauvau">
      <svg className="hover-item"  width="92" height="137" viewBox="0 0 141 186" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 152.999L11.5 149.499V144L10 131.999L9 123L10 116.5L8.5 112.5L6.5 107L2.5 94.5L1 82L2.5 77L3 68.5L6.5 49.5L8.5 34L11.5 28.5L13 24L11.5 22V19.5L18.5 10.5H24.5L28 7.5L36.5 6.5L45.5 7.5L51.5 7L60.5 1.5L63 1L67 5.5V12L65 17.5L69 22V25.5L60 31L49 38.5L46.5 45L49 55L55 61C58.8333 61.6667 69.7 63.1 82.5 63.5C95.3 63.9 112.167 68.3329 119 70.4994C120.333 66.6662 122.7 57.9 121.5 53.5C120 48 117.5 43.9994 113.5 42.5C109.5 41.0006 106.5 43.9994 103.5 47C101.1 49.4005 99.1667 49.3335 98.5 49C97.1667 45.8331 96.3 38.2994 103.5 33.4994C112.5 27.4994 123 33.9994 128 43.9994C132 51.9994 132.667 64.9994 132.5 70.4994L131 81.9994L132.5 86.9994L138.5 96.9994L140.5 105.999V116.999L137.5 125.999L135 131.499V141.999L138.5 150.999L137.5 154.999L135.5 165.999L131 172.999L126 173.999L123 170.999V167.499L127.5 165.499L128 158.999L127 149.499L119 133.499L113.5 145.499L119 152.999L124.5 159.499V163.499L117.5 172.499L113.5 180.499L108 184.999L102 180.499L108 172.499L110.5 165.499L108 160.999L102 157.999L94.5 149.499L87.5 143.999L85.5 129.999H75.5C70.7 129.999 59.8333 131.333 55 131.999L49 149.499L45.5 159.499H38.5L33.5 152.999L35.5 149.499L37 145.499L41.5 140.999L43.5 136.499V131.999L35.5 129.999H25L19.5 138.499V145.499V152.999L17.5 157.999L9 159.499H3.5V156.499L9 152.999Z" fill="none" strokeWidth="1" stroke="#FF540F"/>
</svg>
      </div>
      <div className="hover-item-container" id="bluestool">
      <svg className="hover-item" width="203" height="220" viewBox="0 0 203 220" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M90.5 187.503V213.503C85.6667 215.169 75.3 218.6 72.5 219C69.7 219.4 61.6667 218.167 58 217.5L49.5 208.5V177.5L47.5 172L20.5 149L19 151.5L10.5 153.5L9 162L5 164.5L0.5 160.5V156.5L5 151.5L12 68L15.5 31L29 14.5L107 1L127.5 3L172.5 27L182 47.5L195.5 171L199 173L201.5 178L200.5 183L184.5 187.503C183.167 179.17 180.2 162.103 179 160.503C177.8 158.903 173.833 159.17 172 159.503C147.833 165.67 98.6 178.503 95 180.503C91.4 182.503 90.5 186.003 90.5 187.503Z" fill="none" strokeWidth="1" stroke="#FF0089"/>
</svg>

      </div>
      <div onMouseEnter={() => playSound('/audio/tiengtrongxom.mp3')} onMouseLeave={stopSound} className="hover-item-container" id="moped">
      <svg className="hover-item" viewBox="0 0 166 343" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.9996 248C31.3996 237.2 34.6662 229.167 35.9996 226.5L28.9996 222L33 211.5V194L26 193L20 189.5L16 171L14 166V163.5L22.5 149.5L26 146L38 145L40 141.5L43 140.5V138.5L38 131.5L33 130.5L27.5 121.5H17.5L14 122L0 125V122.5L12.5 119.5L9 117.5L8.5 116L10.5 113.5L16 112.5L17.5 109L22.5 106L24 100L27.5 94.5L22.5 90H11C9.83333 89.5 7 88 5 86C3 84 1.83333 81.5 1.5 80.5L2.5 76L5 74.5C7 73.8333 12.3 73 17.5 75C22.7 77 25.3333 80.8333 26 82.5L26.5 86.5L24.5 89L30.5 94L31.5 93.5L38 87.5L40 82.5L45.5 78L50 71.5L60.5 55L69 53L75.5 47L72.5 43C68 42 58.3 39.7 55.5 38.5C52.7 37.3 50.6667 34 50 32.5L90.5 0L133 35L123.5 38.5L112.5 40V43L119.5 49L126 51L133 57L138.5 66.5L143.5 71.5V78L147 79.5L149 85L152.5 90.5L154.5 95.5V103.5L152.5 109V119L147 123L149 146.5H164L157 160H147V174H166L154.5 190H147V195V204H157L162 209L154.5 216.5H147V226.5H157L154.5 233L162 236L154.5 244H149L154.5 253L152.5 258L145 260V264H130C129.167 267.5 127.2 275.5 126 279.5C124.5 284.5 120.5 286.5 117.5 289.5C114.5 292.5 108 289 104.5 286.5C101.7 284.5 98.6667 277.667 97.5 274.5L95 279.5L91 277.5V274.5H88.5L86.5 277.5L83 282L80.5 286.5L76.5 291.5C75.5 298.333 73.1 313.6 71.5 320C69.9 326.4 64.8333 335.667 62.5 339.5C58.3333 341.5 48.3 344.7 41.5 341.5C33 337.5 28.9996 315 26.4996 301.5C23.9996 288 25.9996 261.5 28.9996 248Z" fill="none" strokeWidth="1" stroke="#FF540F"/>
      </svg>
      
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
    <img src="images/living_room2.jpg" alt=""></img>
    </div>

    </div>
  );
}