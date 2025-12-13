import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useContext, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { TransitionContext } from '@/context/TransitionContext';
import gsap from "gsap";


export default function Cursor() {
    
    const router = useRouter(); // Get the current route
    useEffect(() => {
       
        const customCursor = document.getElementById('cursor');
    
      
        const handleMouseMove = (e) => {
          // Set custom cursor position to match mouse position
          customCursor.style.left = e.pageX + 'px';
          customCursor.style.top = e.pageY + 'px';
      };
    
       
        document.addEventListener('mousemove', handleMouseMove);

      
            customCursor.style.backgroundImage = "url('images/cursor2.svg')";
            customCursor.style.width = "20px";
            customCursor.style.height = "20px";
            customCursor.style.transform = "translate(-10px,-10px)";
            customCursor.style.backgroundSize = '100%';
            customCursor.style.backgroundRepeat = 'no-repeat';
           
          
      
    
        // Listen for mousemove, mousedown, and mouseup events on the document
        
    
        // Clean up event listeners when component unmounts
        return () => {
            // Clean up event listeners when component unmounts
            document.removeEventListener('mousemove', handleMouseMove);
            
          };
      }, [router.pathname]);

      useEffect(() => { 
                const customCursor = document.getElementById('cursor');

        if (router.pathname === '/kitchen') {
        customCursor.style.backgroundImage = "url('images/dua2.png')";
        customCursor.style.width = "400px";
        customCursor.style.height = "600px";
        customCursor.style.transform = "translate(-350px, -20px)";
        /*const handleMouseDown = () => {
            // Change cursor background image when mouse is down
            customCursor.style.backgroundImage = "url('images/dua2.png')";
            setTimeout(() => {
                customCursor.style.backgroundImage = "url('images/dua.png')";

            }, 100);
          };
      
          const handleMouseUp = () => {
            // Change cursor background image back to normal when mouse is up
            customCursor.style.backgroundImage = "url('images/dua.png')";

            setTimeout(() => {
                customCursor.style.backgroundImage = "url('images/dua2.png')";

            }, 100);
          };
            document.addEventListener('mousedown', handleMouseDown);
             document.addEventListener('mouseup', handleMouseUp);
    */
      }else{
        customCursor.style.backgroundImage = "url('images/cursor2.svg')";
      }

      }, [router.pathname]);
    return (
        <div 
        id="cursor">
            
            </div>
);
}
