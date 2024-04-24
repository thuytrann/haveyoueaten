import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import html2canvas from "html2canvas"
import Draggable from "gsap/dist/Draggable";


export default function Index() {
  const container = useRef(null);
  const windowSlide = useRef(null);
  const byPlaneVN = useRef(null);
  const byPlane = useRef(null);
  const byPlaneUS = useRef(null);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
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
    
  })

  function clickPrint() {
    let src = document.querySelector("#src");
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
  
  // 印刷処理
  async function print(cvs) {
    let port = null;
    let writer = null;
    let reader = null;
    console.log("here")
  
  
  
    try {
      port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });
  
      writer = port.writable.getWriter();
  
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
      reader = port.readable.getReader(); 
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
      reader = null;
  
      await writer.write(new Uint8Array([ESC, 0x40, 0x02])); // reset
  
      writer.releaseLock();
      writer = null;
      await port.close();
      port = null;
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

  return (
    <div ref={container} className=' w-screen by-plane'>

      
    <h1>レシート印刷 for Phomemo M02S</h1>
    <div className="main">
        <div className="left">
        <div id="src" className="recipt">
            <div className="border">
                2023年12月15日(金) 14:23 注文番号 12345678

                <div className="list">
                <div className="item">いちご</div>
                <div className="price">1点  ¥ 300</div>
                </div>
                <div className="list">
                <div className="item">ぶどう</div>
                <div className="price">1点  ¥ 500</div>
                </div>
                <div className="list">
                <div className="item">メロン</div>
                <div className="price">1点  ¥ 2,500</div>
                </div>
                <div className="list">
                <div className="item">小計</div>
                <div className="price">¥ 3,300</div>
                </div>
                <div className="list">
                <div className="item">消費税等</div>
                <div className="price">¥ 330</div>
                </div>
                <div className="list">
                </div>
            </div>
        </div>
        </div>
        <div className="right">
        <p>
            <button onClick={clickPrint}>印刷</button>
        </p>
        <div id="print_src"></div>
        </div>
    </div>
    </div>
  );
}