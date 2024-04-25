import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import html2canvas from "html2canvas"
import Draggable from "gsap/dist/Draggable";



export default function Index() {
  const [userName, setUsername] = useState('');
  const container = useRef(null);
  const windowSlide = useRef(null);
  const byPlaneVN = useRef(null);
  const byPlane = useRef(null);
  const byPlaneUS = useRef(null);
  const [inUS, setInUS] = useState(false);
 
  const [progressPlane, setProgressPlane] = useState(0);
  const handleChange = (event) => {
    setUsername(event.target.value);
};

 
  const videoRef = useRef();
  const canvasRef = useRef();

  function clickPrint() {
    let src = document.querySelector("#print-img-container");
    console.log("done2");
    html2canvas(src, {
      width: src.width,
      height: src.height,
      scale: 1
    }).then(canvas => {
      document.querySelector("#print_src").appendChild(canvas);
      print(document.querySelector("canvas"));
    });
    console.log("done");
  };

  // 画像をグレイスケール化
function toGrayscale(array, width, height) {
    let outputArray = new Uint8Array(width * height);
    for (let y = 0; y < height; y += 4) {
      for (let x = 0; x < width; x += 4) {
        for (let dy = 0; dy < 4; ++dy) {
          for (let dx = 0; dx < 4; ++dx) {
            const r = array[((y + dy) * width + (x + dx)) * 4 + 0];
            const g = array[((y + dy) * width + (x + dx)) * 4 + 1];
            const b = array[((y + dy) * width + (x + dx)) * 4 + 2];
            const gray = (r + g + b) / 3 | 0;
            outputArray[(y + dy) * width + (x + dx)] = gray;
          }
        }
      }
    }
    return outputArray;
  }
  
  // 画像を誤差拡散で2値化
  function errorDiffusion1CH(u8array, width, height) {
    let errorDiffusionBuffer = new Int16Array(width * height); // 誤差拡散法で元画像+処理誤差を一旦保持するバッファ Uint8だとオーバーフローする
    let outputData = new Uint8Array(width * height);
    for (let i = 0; i < width * height; ++i) errorDiffusionBuffer[i] = u8array[i];
  
    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        let outputValue;
        let errorValue;
        const currentPositionValue = errorDiffusionBuffer[y * width + x];
        if (currentPositionValue >= 128) {
          outputValue = 255;
          errorValue = currentPositionValue - 255;
        } else {
          outputValue = 0;
          errorValue = currentPositionValue;
        }
  
        if (x < width - 1) {
          errorDiffusionBuffer[y * width + x + 1] += 5 * errorValue / 16 | 0;
        }
        if (0 < x && y < height - 1) {
          errorDiffusionBuffer[(y + 1) * width + x - 1] += 3 * errorValue / 16 | 0;
        }
        if (y < height - 1) {
          errorDiffusionBuffer[(y + 1) * width + x] += 5 * errorValue / 16 | 0;
        }
        if (x < width - 1 && y < height - 1) {
          errorDiffusionBuffer[(y + 1) * width + x + 1] += 3 * errorValue / 16 | 0;
        }
        outputData[y * width + x] = outputValue;
      }
    }
    return outputData;
  }
  
  const FF = 0x0C;
  const NAK = 0x15;
  const CAN = 0x18;
  const ESC = 0x1B;
  const GS = 0x1D;
  const US = 0x1F;
  
  // canvas画像をグレイスケール→誤差拡散で2値化
  function getErrorDiffusionImage(cvs) {
    const ctx = cvs.getContext('2d');
    ctx.fillStyle = "white";
ctx.fillRect(0, 0, 400, 300);
    ctx.font = "50px DFVN36Daysoftype";
    ctx.fillStyle = "black";
ctx.fillText("Travel Visa",10,80);
ctx.font = "30px Arial";
ctx.fillText("For " + userName,10,120);
ctx.fillText("Issue Date: Apr 25, 2024",10,150);
ctx.font = "20px Arial";
ctx.fillText("You may travel around Steinberg Hall",10,180);
ctx.fillText("during your 2-hour travel visa.",10,220);

ctx.fillText("Contact Thuy Tran or Sam Fox for a Visa extension",10,250);

    const inputData = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
  
    const output = ctx.createImageData(cvs.width, cvs.height);
    let outputData = output.data;
  
    const grayArray = toGrayscale(inputData, cvs.width, cvs.height);
    const funcOutput = errorDiffusion1CH(grayArray, cvs.width, cvs.height)
    for (let y = 0; y < cvs.height; y += 1) {
      for (let x = 0; x < cvs.width; x += 1) {
        const value = funcOutput[y * cvs.width + x];
  
        outputData[(y * cvs.width + x) * 4 + 0] = value;
        outputData[(y * cvs.width + x) * 4 + 1] = value;
        outputData[(y * cvs.width + x) * 4 + 2] = value;
        outputData[(y * cvs.width + x) * 4 + 3] = 0xff;
      }
    }
    return outputData;
  }
  
  // canvasの画像データからラスターイメージデータ取得
  function getPrintImage(cvs, start_y) {
    const inputData = getErrorDiffusionImage(cvs);
  
    if (start_y > cvs.height) return null;
  
    let height = (start_y + 255 < cvs.height) ? start_y + 255 : cvs.height;
    let outputArray = new Uint8Array(cvs.width * (height - start_y) / 8);
    let bytes = 0;
    for (let y = start_y; y < height; y++) {
      for (let x = 0; x < cvs.width; x += 8) {
        let bit8 = 0;
        for (let i = 0; i < 8; i++) {
          let r = inputData[((x + i) + y * cvs.width) * 4];
          bit8 |= (r & 0x01) << (7-i);
        }
        outputArray[bytes] = ~bit8;
        bytes++;
      }
    }
  
    return outputArray;
  }
  let port = null;
    let writer = null;
    let reader = null;
    console.log("here")
  // 印刷処理
  async function print(cvs) {
    
  
  
  
    try {
      console.log(port);
    if (port == null) {
      console.log(port)
      
      port = await navigator.serial.requestPort();
      console.log(port);
      await port.open({ baudRate: 115200 });
      console.log(port)
      writer = port.writable.getWriter();
    }
      await writer.write(new Uint8Array([ESC, 0x40, 0x02])); // reset
      await writer.write(new Uint8Array([ESC, 0x40]).buffer); // initialize
      await writer.write(new Uint8Array([ESC, 0x61,0x01]).buffer); // align center
  
      // 画像出力
      let start_y = 0;
      while(true) {
        console.log("here2")
        let bit_image = getPrintImage(cvs, start_y); // 255ラインのラスターデータを取得
        if (!bit_image) break; 
        
        let width = cvs.width / 8;
        await writer.write(new Uint8Array([GS, 0x76, 0x30, 0x00])); // image
        await writer.write(new Uint8Array([width & 0x00FF, (width >> 8) & 0x00FF])); // width
        let height = bit_image.length / width;
        await writer.write(new Uint8Array([height & 0x00FF, (height >> 8) & 0x00FF])); // height
        await writer.write(bit_image); // raster bit image
        
        start_y += (height + 1);
      }
  
      await writer.write(new Uint8Array([ESC, 0x64, 0x03]).buffer); // feed line
  
      // 印字完了まで待つ
      await writer.write(new Uint8Array([US, 0x11, 0x0E]).buffer); // get device timer
      
      if (reader == null){
      reader = port.readable.getReader(); 
      }
      console.log("here5")
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        console.log("device timer:" + value[2]);
        if (value[2] == 0) break;
      }
      reader.releaseLock();
      
      //reader = null;
  
      await writer.write(new Uint8Array([ESC, 0x40, 0x02])); // reset
  
      writer.releaseLock();
      //writer = null;
    port.forget();
    await port.close();
    //port = null;
      console.log("done4");
  
      alert("印刷が完了しました！")
  } catch (error) {
      alert("Error:" + error);
      if (writer) {
        writer.releaseLock();
      }
      if (reader) {
        reader.releaseLock();
      }
      if (port) {
        await port.close();
      }
    }
  }

  
    const onTakeAPhoto = () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.height = video.videoHeight+300;
    canvas.width = 576;
    
      canvas.getContext('2d').drawImage(video, 0, 300);
      console.log(video.videoWidth, video.videoHeight, canvas.height, canvas.width);
      const img    = canvas.toDataURL('image/png');
      document.querySelector('.existing-image-container').style.visibility = 'visible';
      document.getElementById('print-img').src = img;

      document.getElementById('existing-image-id').src = img;
      document.querySelector('.enter-america').classList.add('entered');

      clickPrint();
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
 
<div ref={byPlaneUS} className="by-plane-stage b-y-s-us">
<div id="camera-wrapper">
        <h5 className="mt-[5vh] mb-[2vh] text-center script">Welcome to <br /> the United States</h5>
        <label className="mx-auto mb-[2vh] relative " id="camera-button" >1. State your full government name: <input type="text" value={userName} onChange={handleChange} /></label>

        <div className="camera-container">
        <video id="camera" ref={videoRef} autoPlay></video>
      <canvas ref={canvasRef}></canvas>
      <div className="existing-image-container">
      <img id="existing-image-id" src=""/>
      </div>
      

        </div>
      
        <button className="mx-auto mt-[2vh] relative " id="camera-button" onClick={onTakeAPhoto}>2. Take A Photo For Your Global Entry</button>

    </div>
    <Link scroll={false} href="/the-conversation">
    <div className="vertical-sign enter-america">
        
        <div  className="v-s-inner-container ">
          <p className="vertical-sign-content v-s-alley">Where</p>
          <p className="vertical-sign-content v-s-alley">Next?</p>
        </div>
      </div>
        </Link>
    
      </div>
      <div ref={byPlane} className="by-plane-stage b-y-s-plane">
      <div className="kitchen-guide">
    <div className="loading-ps">
    <div className="dragging-guide ">Please fasten your seatbelt</div>
  <div className="dragging-guide">Thank you for choosing Have You Eaten Airlines.</div>
    </div>
  
  </div>
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
        
        <div onClick={() => slideDissapear(byPlaneVN)} className="v-s-inner-container by-plane-vn">
          <p className="vertical-sign-content v-s-alley">We<br></br>l<br></br>come</p>
          <p className="vertical-sign-content v-s-alley">Aboa<br />r<br></br>d</p>
        </div>
      </div>
      </div>
      <div id="print-img-container" class="recipt">

     
  <img id="print-img" src="" />
 </div>
 <div id="print_src">

 </div>
    </div>
  );
}