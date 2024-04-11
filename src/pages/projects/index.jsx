import React,{ useRef, useContext } from 'react'

import { TransitionContext } from '@/context/TransitionContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Draggable from "gsap/dist/Draggable";

export default function Index() {

  const { timeline } = useContext(TransitionContext);
  const container = useRef(null);
  const dragContainer = useRef(null);
  const tocom = useRef(null);



  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [cakhoCounter, setCakhoCounter] = useState(0);
  const [rauxaoCounter, setRauxaoCounter] = useState(0);
  const [canhchuaCounter, setCanhchuaCounter] = useState(0);
  const [ricebowl, setRiceBowl] = useState([]);
  const [cursorImage, setCursorImage] = useState(false);
  const quizEnter = () => {
    setCursorImage(true);
  };

  const quizLeave = () => {
    setCursorImage(false);
  };

  useEffect(() => {
    const customCursor = document.getElementById('cursor');

  
    const handleMouseMove = (e) => {
      // Set custom cursor position to match mouse position
      customCursor.style.left = e.clientX + 'px';
      customCursor.style.top = e.clientY + 'px';
    };

    const handleMouseDown = () => {
      // Change cursor background image when mouse is down
      customCursor.style.backgroundImage = "url('images/dua.png')";
    };

    const handleMouseUp = () => {
      // Change cursor background image back to normal when mouse is up
      customCursor.style.backgroundImage = "url('images/dua2.png')";
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

  const bowlStages = [
    'images/com-0.png',
    'images/com-1.png',
    'images/com-3.png',
    'images/com-4.png'
  ];

  const cakhoStages = ['images/ca1.png', 'images/ca2.png', 'images/ca3.png'];
  const rauxaoStages = ['images/rau-1.png', 'images/rau-2.png', 'images/rau-3.png'];
  const canhchuaStages = [
    'images/canh-1.png',
    'images/canh-2.png',
    'images/canh-3.png'
  ];
  
  const ancom = tocom.current ? tocom.current.children : [];

  const getFood = (foodCutout, counter, setCounter) => {
    const customCursor = document.getElementById('cursor');

    if (counter < 3) {

      
      // Assuming guides and dragmode are defined elsewhere
      
      const newChild = (
        <img
          className="food-cutout"
          src={foodCutout[counter]}
          style={{
            width: foodCutout == canhchuaStages ? '100%' : '70%', 
            transform: `translate(-50%,-50%) rotate(${Math.floor(
              Math.random() * 360
            )}deg)`
          }}
        />
      );
      
      // Assuming ricebowl is a state variable
      customCursor.style.backgroundImage = "url('images/dua.png')";

      setRiceBowl(prevState => [...prevState, newChild]);
      setCounter(prevCount => prevCount + 1);
    }
    else{
      setCounter(0);
    }
    return () => {
      customCursor.style.backgroundImage = "url('images/dua2.png')";
    };
  };

  const eating = (counter) =>{
    

        if (ancom.length > 1) {
         
          if (ancom[ancom.length - 1].classList.contains("ca-stages")) {
            setCakhoCounter(prevCounter => prevCounter - 1);
          } else if (ancom[ancom.length - 1].classList.contains("rau-stages")) {
            setRauxaoCounter(prevCounter => prevCounter - 1);
          } else if (ancom[ancom.length - 1].classList.contains("canh-stages")) {
            setCanhchuaCounter(prevCounter => prevCounter - 1);
          }
          ancom[ancom.length - 1].remove();
 
        }
        if (ancom.length === 1) {
          console.log("boi com");
          setTimeout(() => {
            for (let i = 1; i < 3; i++) {
              const newChild = (
                <img
                  key={i}
                  className="drag-food-img"
                  src={bowlStages[i]}
                />
              );
              setRiceBowl(prevState => [...prevState, newChild]);
            }
          }, 3000);
        }
      
  

      return () => {
    
      };

  };

  const closeQuiz = () => {
    const path = document.querySelector('#arrow path');
    const quizContainer = document.querySelector('.quiz-container');

    if (path.getAttribute('d') === "M1 1L92 14L183 1") {
      quizContainer.style.transform = "translate(-50%, 71vh)";
      path.setAttribute('d', 'M0 1H91H182');
      path.setAttribute('stroke', '#AAB14F');
    } else if (path.getAttribute('d') === "M0 1H91H182") {
      path.setAttribute('d', "M1 1L92 14L183 1");
      quizContainer.style.transform = "translate(-50%,51vh)";
    }
  }
  
  const checkAnswer = (event) => {
    let correctAnswer;
    let selectedAnswer = event.currentTarget;
    const quizOptions = document.querySelectorAll(".btn-option");
    const quizQuestions = document.querySelectorAll(".quiz-content");
    const wrongPopup = document.getElementById('wrong-popup');
    const correctPopup = document.querySelectorAll(".correct-popup");

    if (currentQuestion === 0) {
      correctAnswer = quizOptions[1];
    } else if (currentQuestion === 1) {
      correctAnswer = quizOptions[5];
    } else if (currentQuestion === 2) {
      correctAnswer = quizOptions[10];
    }

    if (selectedAnswer === correctAnswer) {
      selectedAnswer.classList.add('btn-correct');
      correctPopup[score].style.visibility = 'visible';
      setScore(score + 1);
    } else {
      selectedAnswer.classList.add('btn-wrong');
      wrongPopup.style.opacity = '100%';
      if (score - 1 >= 0) {
        correctPopup[score - 1].style.visibility = 'hidden';
      }
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length-1) {
        quizQuestions[currentQuestion].classList.remove('question-active');
        wrongPopup.style.opacity = '0%';
        setCurrentQuestion(currentQuestion + 1);
        quizQuestions[currentQuestion + 1].classList.add('question-active');
      }/* else {
        showResult();
      }*/
    }, 3000);
  }
  /*
  const showResult = () => {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = "<h2>Quiz Result</h2><p>You scored " + score + " out of " + totalQuestions + " questions.</p>";
  }*/
  
  useEffect(() => {
    gsap.registerPlugin(Draggable);

    const draggable = Draggable.create(".drag-food-item", {
      bound: '#food-container',
      inertia: true,
      cursor: "none",
      onThrowComplete: () => {
        console.log('onThrowComplete');
        // TODO: animation that injects selected card title
      },
    })[0];
  })
  
  useEffect(() => {
    
    
    const handleTouchStart = () =>{
      dragContainer.current.classList.add('p-20');
      console.log('Touch started on dragContainer!');
    }
    dragContainer.current && (dragContainer.current.ontouchstart = handleTouchStart);
  },dragContainer.current)
  


  useGSAP( () => {
    gsap.fromTo(".col-frame", {scale: 0.85, opacity: 0}, {scale: 1, opacity: 1, stagger: 0.5})
    timeline.add(gsap.to(container.current, { opacity: 0 }))
  }, {scope: container})

  

  

  return (
    <div ref={container} className='h-screen w-screen overflow-clip kitchen'>
     
     <div style={{ 
      width: cursorImage ? '20px' : '400px',
    height: cursorImage ? '20px' : '600px',
    position: 'fixed',
    transform: cursorImage ?'translate(0,0)' : 'translate(-350px, -20px)',
    
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
          backgroundImage: cursorImage ? `url(images/cursor2.svg)` : `url(images/dua2.png)`,       


      }}
  id="cursor">

      </div>
      <div className="col-frame">
    <div className="ver-col"></div>
    <div className="ver-col-2"></div>
  </div>
  <div className='bg-btn-container'>
  <div className="styled-button bg-img-wooden bg-btn-active" id="wooden"> </div>
      <div className="styled-button bg-img-inox" id="inox"> </div>
      <div className="styled-button bg-img-pinkgreen" id="pinkgreen"></div>
  </div>
  
  <div onMouseEnter={quizEnter}
      onMouseLeave={quizLeave} className="quiz-container">
    <div className="quiz-borders">
      <div className="q-border-horizontal-1 rainbow2 bor1"></div>
      <div className="q-border-horizontal-1 rainbow2 bor2"></div>
      <div className="q-border-horizontal-2 rainbow2 bor3"></div>
      <div className="q-border-vertical rainbow bor4"></div>
      <div className="q-border-vertical rainbow bor5"></div>
    </div>
    <div className="quiz-content question-1 question-active">
      <div className="quiz-question-container">
        <div className="quiz-question quiz-question-shadow" data-text="hat is the first thing you need to do?"><span
            className="script" data-text="W">W</span>hat is the first thing you need to do?</div>
        <div className="quiz-question" data-text="hat is the first thing you need to do?"><span className="script"
            data-text="W">W</span>hat is the first thing you need to do?</div>
      </div>
      <div className="quiz-answer-option">
        <div className="question-1">

        </div>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>Fluff up the rice
        </button>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>Set the table
        </button>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>Go on your phone
        </button>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>Nothing
        </button>

      </div>
    </div>

    <div className="quiz-content question-2 ">
      <div className="quiz-question-container">
        <div className="quiz-question quiz-question-shadow" data-text="hat is the first thing you need to do?"><span
            className="script" data-text="W">H</span>ow do you show respect for elders at the dinner table?</div>
        <div className="quiz-question" data-text="hat is the first thing you need to do?"><span className="script"
            data-text="W">H</span>ow do you show respect for elders at the dinner table?</div>
      </div>
      <div className="quiz-answer-option">
        <div className="question-1">

        </div>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>Only eat rice
        </button>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>Ask them to eat first
        </button>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>High-five them
        </button>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>Eat in silence
        </button>

      </div>
    </div>


    <div className="quiz-content question-3">
      <div className="quiz-question-container">
        <div className="quiz-question quiz-question-shadow" data-text="hat is the first thing you need to do?"><span
            className="script" data-text="W">W</span>hat are you not allowed to do while eating fish?</div>
        <div className="quiz-question" data-text="hat is the first thing you need to do?"><span className="script"
            data-text="W">W</span>hat are you not allowed to do while eating fish?</div>
      </div>
      <div className="quiz-answer-option">
        <div className="question-1">

        </div>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>Dip it in fish sauce
        </button>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>Eat it with rice
        </button>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>Flip the fish
        </button>
        <button onClick={checkAnswer} className="btn-option">
          <div className="btn-outline"></div>Eat the eyeball
        </button>

      </div>
    </div>

    <div onClick={closeQuiz} id="close-quiz">
      <svg id="arrow" width="170" height="15" viewBox="0 0 170 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L92 14L183 1" stroke-width="2" stroke="#AAB14F"/>
        </svg>
        
    </div>

  </div>
  <div className="correct-popup-container">
    <div className="correct-popup">
      <img src="images/balloons-pink-hearts.gif" alt=""></img>
    </div>
    <div className="correct-popup">
      <img src="images/rose-flower.gif" alt=""></img>
    </div>
    <div className="correct-popup">
      <img src="images/love-you-puppy.gif" alt=""></img>
    </div>
    <div className="correct-popup">
      <img src="images/borboletas-butterflies.gif" alt=""></img>
    </div>
    <div className="correct-popup">
      <img src="images/red-rose-and-butterflies-sparkles.gif" alt=""></img>
    </div>
  </div>
  <div id="wrong-popup" className="outline-text">Shame!</div>
  <div ref={dragContainer} id="food-container">
    <div className="inner-food-container">
      <div onClick={() => getFood(cakhoStages, cakhoCounter, setCakhoCounter)} className="drag-food-item" id="cakho">
        <img className="drag-food-img" src="images/cakhoto.png" alt=""></img>
      </div>
      <div onClick={() => getFood(canhchuaStages, canhchuaCounter, setCanhchuaCounter)} className="drag-food-item" id="canhchua">
        <img className="drag-food-img" src="images/canhchua.png" alt=""></img>
      </div>
      <div onClick={() => getFood(rauxaoStages, rauxaoCounter, setRauxaoCounter)} className="drag-food-item" id="rauxao">
        <img className="drag-food-img" src="images/rauxao.png" alt=""></img>
      </div>
      <div ref={tocom} onClick={eating} className="drag-food-item food-rice" id="tocom">
        <img className="drag-food-img" src="images/com-0.png" alt=""></img>
        <img className="drag-food-img" src="images/com-1.png" alt=""></img>
        <img className="drag-food-img" src="images/com-2.png" alt=""></img>
        <img className="drag-food-img" src="images/com-3.png" alt=""></img>
        {ricebowl}
      </div>
    </div>
    
  </div>
  <div className="other-bowls">
    <div className="food-rice">
      <img src="images/com-3.png" alt=""></img>
    </div>
    <div className="food-rice">
      <img src="images/com-3.png" alt=""></img>
    </div>
    <div className="food-rice">
      <img src="images/com-3.png" alt=""></img>
    </div>
  </div>
      </div>
   
  )
}
