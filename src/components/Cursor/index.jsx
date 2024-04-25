import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useContext, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { TransitionContext } from '@/context/TransitionContext';
import gsap from "gsap";
import { set } from 'react-hook-form';

export default function Cursor() {
    const router = useRouter(); // Get the current route
    useEffect(() => {
    
        const customCursor = document.getElementById('cursor');
    
      
        const handleMouseMove = (e) => {
          // Set custom cursor position to match mouse position
          customCursor.style.left = e.clientX + 'px';
          customCursor.style.top = e.clientY + 'px';
        };
    
       

        if (router.pathname === '/kitchen') {
            customCursor.style.backgroundImage = "url('images/dua2.png')";
            customCursor.style.width = "400px";
            customCursor.style.height = "600px";
            customCursor.style.transform = "translate(-350px, -20px)";
            const handleMouseDown = () => {
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
              document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
          };
          }
      
    
        // Listen for mousemove, mousedown, and mouseup events on the document
        
    
        // Clean up event listeners when component unmounts
        
      }, []);
    return (
        <div style={{ 
            width:  '20px',
            height:  '20px',
         
          transform:  'translate(-30px,-25px)',
          
          backgroundSize: '100%',
          backgroundRepeat: 'no-repeat',
                backgroundImage:  'url(images/cursor2.svg)' ,       
      
      
            }}
        id="cursor">
            
            </div>
);
}
