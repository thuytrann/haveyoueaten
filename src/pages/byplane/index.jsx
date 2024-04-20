import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Draggable from "gsap/dist/Draggable";


export default function Index() {
    const FF = 0x0C;
    const NAK = 0x15;
    const CAN = 0x18;
    const ESC = 0x1B;
    const GS = 0x1D;
    const US = 0x1F;
    
    const [port, setPort] = useState(null);
    const [writer, setWriter] = useState(null);
    const [reader, setReader] = useState(null);
  
    useEffect(() => {
      async function print() {
        const cvs = document.querySelector('canvas');
        try {
          if (port == null) {
            const newPort = await navigator.serial.requestPort();
            setPort(newPort);
            await newPort.open({ baudRate: 115200 });
            setWriter(newPort.writable.getWriter());
          }
          await writer.write(new Uint8Array([ESC, 0x40, 0x02])); // reset
          await writer.write(new Uint8Array([ESC, 0x40]).buffer); // initialize
          await writer.write(new Uint8Array([ESC, 0x61,0x01]).buffer); // align center
          await writer.write(new Uint8Array([US, 0x11, 0x37, 0x96]).buffer); // concentration coefficiennt
          await writer.write(new Uint8Array([US, 0x11, 0x02, 0x01]).buffer); // concentration
          
          let start_y = 0;
          while(true) {
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
  
          await writer.write(new Uint8Array([US, 0x11, 0x0E]).buffer); // get device timer
          if (reader == null){
            setReader(port.readable.getReader());
          }
          while (true) {
            const { value, done } = await reader.read();
            if (done) {
              break;
            }
            console.log("device timer:" + value[2]);
            if (value[2] == 0) break;
          }
          reader.releaseLock();
  
          await writer.write(new Uint8Array([ESC, 0x40, 0x02])); // reset
          writer.releaseLock();
          port.forget();
          await port.close();
          alert("Printing completed!");
        } catch (error) {
          alert("Error: " + error);
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
  
      print();
  
      // Cleanup function
      return () => {
        if (writer) {
          writer.releaseLock();
        }
        if (reader) {
          reader.releaseLock();
        }
        if (port) {
          port.close();
        }
      };
    }, [port, writer, reader]);
  
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
  
    return (
      <div>
        <h1>Print Web Serial API for Phomemo M02S</h1>
        <input type="file" accept="image/*" id="img_file" onChange={loadImage} />
        <button onClick={print}>印刷</button>
        <p>
          <canvas></canvas>
        </p>
      </div>
    );
  }