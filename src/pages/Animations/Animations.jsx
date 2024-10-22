import React, { useState, useEffect } from 'react';
import Basketball from '../../assets/img/basketball.png';
import Football from '../../assets/img/football.png';
import Volleyball from '../../assets/img/volleyball.png';
import Human from '../../assets/img/human.png';
import Cartoon from '../../assets/img/cartoon.png';
import Logo from '../../assets/img/logo.png';
import Field from '../../assets/img/field.jpg';
import './Animations.css';

// Import your CSS file

const Animations = () => {
  const fieldWidth = 800;
  const fieldHeight = 700;
  const ballSize = 100;
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [running, setRunning] = useState(true);
  const [randomRotate, setRandomRotate] = useState(0);
  const [rotateDirection, setRotateDirection] = useState(0);
  const [rotateSpeed, setRotateSpeed] = useState(0);
  const [ballImage, setBallImage] = useState('');
  
  const maxLeft = fieldWidth - ballSize - 2;
  const maxTop = fieldHeight - ballSize - 2;
  const vx = 5;
  const vy = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        calculate();
        render();
      }
    }, 25);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [x, y, goRight, goDown, running]);

  useEffect(() => {
    circleBall();
    
  },[running  , goRight , goDown]);
  

  const calculate = () => {
    if (goRight) {
      setX((prevX) => {
        const newX = prevX + vx;
        if (newX >= maxLeft) setGoRight(false);
        
        return newX;
      });
    } else {
      setX((prevX) => {
        const newX = prevX - vx;
        if (newX < 0) setGoRight(true);
        
        return newX;
      });
    }

    if (goDown) {
      setY((prevY) => {
        const newY = prevY + vy;
        if (newY >= maxTop) setGoDown(false);
        
        return newY;

      });
    } else {
      setY((prevY) => {
        const newY = prevY - vy;
        if (newY < 0) setGoDown(true);
        
        return newY;
      });
      
    }
    rotateBall();
  };

 

  const rotateBall = () => {
      const ball = document.getElementById("ball");
      setRandomRotate((prev) => {
          const newRotate = prev + rotateDirection;
          ball.style.transform = `rotate(${newRotate}deg)`;
          return newRotate;
        });
    };

    const circleBall = () => {
        if (x >= maxLeft || x <= 0 || y >= maxTop || y <= 0) {
            setRandomRotate(Math.floor(Math.random() * 90 ))
            setRotateSpeed (Math.floor(Math.random()*10)+1)  
            setRotateDirection(Math.random() > 0.5 ? rotateSpeed : -rotateSpeed)
        
            }
            setRandomRotate(rotateDirection)
    }
    
    const render = () => {
      const ball = document.getElementById("ball");
      ball.style.left = `${x}px`;
      ball.style.top = `${y}px`;
      rotateBall();
    };
  const handleRunClick = () => {
    setRunning(!running);
  };

  const handleImageClick = (image) => {
    setBallImage(image);

    // const ball = document.getElementById("ball");
    // ball.style.backgroundImage = `url(${image})`;
  };

  return (
    <div id="container">
      <div id="field" style={{ width: `${fieldWidth}px`, height: `${fieldHeight}px`, backgroundImage: `url(${Field})` }}>
        <div id="ball" style={{ width: `${ballSize}px`, height: `${ballSize}px` , backgroundImage : `url(${ballImage})` , transform: `rotate(${randomRotate}deg)`}}></div>
      </div>
      <div id="control">
        <button
          id="run"
          onClick={handleRunClick}
          className={`btn ${running ? 'btn-danger' : 'btn-success'}`}
          style={{ marginRight: '50px' }}
        >
          {running ? 'PAUSE' : 'RUN'} 
        </button>

        <input type="radio" className="btn-check btn-md" name="options" id="option7" autoComplete="off" />
        <label className="btn btn-outline-danger" htmlFor="option7" onClick={() => handleImageClick('')}>NONE</label>

        <input type="radio" className="btn-check" name="options" id="option1" autoComplete="off" />
        <label className="btn btn-outline-secondary" htmlFor="option1" onClick={() => handleImageClick(Basketball)}>BASKETBALL</label>

        <input type="radio" className="btn-check" name="options" id="option2" autoComplete="off" />
        <label className="btn btn-outline-secondary" htmlFor="option2" onClick={() => handleImageClick(Football)}>FOOTBALL</label>

        <input type="radio" className="btn-check" name="options" id="option3" autoComplete="off" />
        <label className="btn btn-outline-secondary" htmlFor="option3" onClick={() => handleImageClick(Volleyball)}>VOLLEYBALL</label>

        <input type="radio" className="btn-check" name="options" id="option4" autoComplete="off" />
        <label className="btn btn-outline-secondary" htmlFor="option4" onClick={() => handleImageClick(Human)}>HUMAN</label>

        <input type="radio" className="btn-check" name="options" id="option5" autoComplete="off" />
        <label className="btn btn-outline-secondary" htmlFor="option5" onClick={() => handleImageClick(Cartoon)}>CARTOON</label>

        <input type="radio" className="btn-check" name="options" id="option6" autoComplete="off" />
        <label className="btn btn-outline-secondary" htmlFor="option6" onClick={() => handleImageClick(Logo)}>LOGO</label>
      </div>
    </div>
  );
};

export default Animations;