import { useState, useContext } from "react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from 'react';
import { TransitionContext } from "@/context/TransitionContext";
gsap.registerPlugin(useGSAP);

export default function TransitionLayout({ children }) {
    const [displayChildren, setDisplayChildren] = useState(children)
    const { timeline } = useContext(TransitionContext);
    const { contextSafe } = useGSAP(); 
    const background = useRef(0);
    const foreground = useRef(0);
    const exit = contextSafe( () => {
        gsap.fromTo(background.current,{ opacity: 0 }, { opacity: 1, duration: 0, onComplete: () => {
            gsap.fromTo(foreground.current, { opacity: 0 }, { opacity: 1, duration: 1, onComplete: () => {
      
                window.scrollTo(0, 0)
            setDisplayChildren(children);
            
          
        
    }});
}});
        
    })
    
    useGSAP(() => {
        //if page is not the current page
        
                if (children.key != displayChildren.key) {
                    exit(); 
                }
                gsap.fromTo(background.current,{ opacity: 1 }, { opacity: 0, duration: 1, onComplete: () => {
                    gsap.fromTo(foreground.current, { opacity: 1 }, { opacity: 0, duration: 2, onComplete: () => {}});
                }});
        
        
    }, [children]) 

    return (
        <div className="background">
            
            {/*<div ref={background} className="spinner-foreground z-100"></div>
            <div ref={foreground} className="spinner-background z-100"></div>*/}
            {displayChildren}
        </div>
    )
}