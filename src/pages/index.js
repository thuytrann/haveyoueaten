import { useGSAP } from '@gsap/react';
import { TransitionContext } from '@/context/TransitionContext';
import gsap from "gsap";
import { useContext, useRef } from 'react';
import Link from 'next/link';

export default function Home(/*{ params: { lng } }*/) {
  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  const image = useRef();
  console.log(container, container.current)
  useGSAP( () => {
    const targets = gsap.utils.toArray(["p", image.current])
    gsap.fromTo(targets, {y: 30, opacity: 0}, {y: 0, opacity: 1, stagger: 0.5})
    timeline.add(gsap.to(container.current, { opacity: 0 }))
  }, {scope: container})

  return (
    <div ref={container} className='h-screen w-screen overflow-clip alleyway'>
      <div className="h-[100vh] flex flex-col justify-center items-center gap-5">
        
        <Link scroll={false} href="/about">
          <div className="vertical-sign">
        
            <div className="v-s-inner-container">
              <p className="vertical-sign-content v-s-alley">Enter</p>
              <p className="vertical-sign-content v-s-alley">Here</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="hover-item-container" id="moped">
      <svg className="hover-item" viewBox="0 0 166 343" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.9996 248C31.3996 237.2 34.6662 229.167 35.9996 226.5L28.9996 222L33 211.5V194L26 193L20 189.5L16 171L14 166V163.5L22.5 149.5L26 146L38 145L40 141.5L43 140.5V138.5L38 131.5L33 130.5L27.5 121.5H17.5L14 122L0 125V122.5L12.5 119.5L9 117.5L8.5 116L10.5 113.5L16 112.5L17.5 109L22.5 106L24 100L27.5 94.5L22.5 90H11C9.83333 89.5 7 88 5 86C3 84 1.83333 81.5 1.5 80.5L2.5 76L5 74.5C7 73.8333 12.3 73 17.5 75C22.7 77 25.3333 80.8333 26 82.5L26.5 86.5L24.5 89L30.5 94L31.5 93.5L38 87.5L40 82.5L45.5 78L50 71.5L60.5 55L69 53L75.5 47L72.5 43C68 42 58.3 39.7 55.5 38.5C52.7 37.3 50.6667 34 50 32.5L90.5 0L133 35L123.5 38.5L112.5 40V43L119.5 49L126 51L133 57L138.5 66.5L143.5 71.5V78L147 79.5L149 85L152.5 90.5L154.5 95.5V103.5L152.5 109V119L147 123L149 146.5H164L157 160H147V174H166L154.5 190H147V195V204H157L162 209L154.5 216.5H147V226.5H157L154.5 233L162 236L154.5 244H149L154.5 253L152.5 258L145 260V264H130C129.167 267.5 127.2 275.5 126 279.5C124.5 284.5 120.5 286.5 117.5 289.5C114.5 292.5 108 289 104.5 286.5C101.7 284.5 98.6667 277.667 97.5 274.5L95 279.5L91 277.5V274.5H88.5L86.5 277.5L83 282L80.5 286.5L76.5 291.5C75.5 298.333 73.1 313.6 71.5 320C69.9 326.4 64.8333 335.667 62.5 339.5C58.3333 341.5 48.3 344.7 41.5 341.5C33 337.5 28.9996 315 26.4996 301.5C23.9996 288 25.9996 261.5 28.9996 248Z" fill="none" strokeWidth="1" stroke="#FF540F"/>
      </svg>
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
    </div>
    <div className="prefetch">
    <img src="images/living_room2.jpg" alt=""></img>
    </div>

    </div>
  );
}