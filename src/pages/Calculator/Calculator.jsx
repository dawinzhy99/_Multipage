import React, { useState, useEffect } from "react";
import "./Calculator.css";
import Button from "./Button/Button";
function Calculator() {
  const [value, setValue] = useState("0");
  const [previousValue, setPreviousValue] = useState("");
  const [memoOperand, setMemoOperand] = useState("");
  const [operator, setOperator] = useState("");
  const [state, setState] = useState("1");
  const [checkEquals, setCheckEquals] = useState(false);
  const [clearCount, setClearCount] = useState(0)

// Function to handle key presses

  const commafy = (value) => {
    if (value === "0") return value;
    let output = "";
    let decimal = "";
    let isNeg = false;
    if (value.includes(".")) {
      output = value.substring(0, value.indexOf("."));
      decimal = value.substring(value.indexOf("."));
    } else {
      output = value;
    }
    if (parseFloat(value) < 0) {
      isNeg = true;
      output = output.substring(1);
    }
    return isNeg
      ? "-" + parseFloat(output).toLocaleString() + decimal
      : parseFloat(output).toLocaleString() + decimal;
  };

  useEffect(() => {
    console.log("Operator :", operator);
    console.log("Value :", value);
    console.log("previousValue :", previousValue);
    console.log("state :", state);
    console.log("memoOperand :", memoOperand);
    console.log("checkEquals :", checkEquals);
  }, [operator, value, previousValue, state, memoOperand, checkEquals]);

  const calculate = () => {
    if (!checkEquals) {
      if (operator === "+" && state === "3") {
        setValue((parseFloat(previousValue) + parseFloat(value)).toString());
        setState("2");
      } else if (operator === "+" && state === "2") {
        setValue((parseFloat(memoOperand) + parseFloat(value)).toString());
        setState("2");
      }
      if (operator === "-" && state === "3") {
        setValue((parseFloat(previousValue) - parseFloat(value)).toString());
        setState("2");
      } else if (operator === "-" && state === "2") {
        setValue((parseFloat(memoOperand) - parseFloat(value)).toString());
        setState("2");
      }
      if (operator === "×" && state === "3") {
        setValue((parseFloat(previousValue) * parseFloat(value)).toString());
        setState("2");
      } else if (operator === "×" && state === "2") {
        setValue((parseFloat(memoOperand) * parseFloat(value)).toString());
        setState("2");
      }
      if (operator === "÷" && state === "3") {
        setValue((parseFloat(previousValue) / parseFloat(value)).toString());
        setState("2");
      } else if (operator === "÷" && state === "2") {
        setValue((parseFloat(memoOperand) / parseFloat(value)).toString());
        setState("2");
      }
    } else {
        setMemoOperand(value)
      if (operator === "+") {
        setValue((parseFloat(memoOperand) + parseFloat(value)).toString());
      }
      if (operator === "-") {
        setValue((parseFloat(memoOperand) - parseFloat(value)).toString());
      }
      if (operator === "×") {
        setValue((parseFloat(memoOperand) * parseFloat(value)).toString());
      }
      if (operator === "÷") {
        setValue((parseFloat(memoOperand) / parseFloat(value)).toString());
      }
    }
  };
  const isNumber = (content) => {
    return !isNaN(content);
  };

  //   const checkOperator = (content) => {
  //     if (content !== "="){
  //       return content === "+" || content === "-" || content === "×" || content === "÷";}

  //     else {
  //       return false};
  //   };

  const handleInput = (content) => () => {

    if (content === "C") {
      if (clearCount === 1) {
        // Double-click detected, reset everything
        setValue("0");
        setPreviousValue("");
        setMemoOperand("");
        setOperator("");
        setState("1");
        setCheckEquals(false);
        setClearCount(0); // Reset count
      } else {
        // Single click, only clear current value
        setValue("0");
        setClearCount(1); 
        
        // Reset click count after 300ms
        setTimeout(() => {
          setClearCount(0);
        }, 300);
      }
    } 
     else if (isNumber(content) &&  content !== "") {
      if (state === "1") {
        setValue(value === "0" ? content : value + content);
      } else if (state === "3") {
        setValue(value + content);
        setMemoOperand(value);
      } else {
        setValue(content);
        setPreviousValue(value);
        setState("3");
      }
    } else if (content !== "=" && !isNumber(content)) {
      if (state === "1" || (state === "3" && content !== "=")) {
        if (
          operator === "+" ||
          operator === "-" ||
          operator === "×" ||
          operator === "÷"
        ) {
          setMemoOperand(value);
          setOperator(content);
          calculate();
        } 
        
        else {
          setOperator(content);
          setPreviousValue(value);
          setMemoOperand(value);
          setState("2");
        }
      } else if (state === "2" || state === "1") {
        setOperator(content);
        setPreviousValue(value);
      }
    } else if (content === "=") {
      setCheckEquals(true);
      calculate();
      setState("2");
    } 
    const handleKeyDown = (event) => {
        const key = event.key;
    
        // Map keyboard keys to calculator buttons
        if (!isNaN(key)) {
            // If the key is a number (0-9)
            onButtonClick(key);
        } else if (key === '+') {
            handleButtonClick('+');
        } else if (key === '-') {
            handleButtonClick('-');
        } else if (key === '*') {
            handleButtonClick('*');
        } else if (key === '/') {
            handleButtonClick('/');
        } else if (key === 'Enter' || key === '=') {
            handleButtonClick('=');
        } else if (key === 'Escape') {
            handleButtonClick('C'); // Assuming 'C' is your clear button
        }
    };
    
    
  };
  const handleKeyDown = (event) => {
    const key = event.key;

    // Map keyboard keys to calculator buttons
    if (!isNaN(key)) {
        // If the key is a number (0-9)
        handleInput(key);
    } else if (key === '+') {
        handleButtonClick('+');
    } else if (key === '-') {
        handleButtonClick('-');
    } else if (key === '*') {
        handleButtonClick('*');
    } else if (key === '/') {
        handleButtonClick('/');
    } else if (key === 'Enter' || key === '=') {
        handleButtonClick('=');
    } else if (key === 'Escape') {
        handleButtonClick('C'); // Assuming 'C' is your clear button
    }
};

useEffect(() => {
    // Add event listener for keydown events
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, []);
  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="display">{commafy(value)}</div>
      </div>
      <div className="calculator-buttons">
        <Button onButtonClick={handleInput} content="C" type="function" />
        <Button onButtonClick={handleInput} content="±" type="function" />
        <Button onButtonClick={handleInput} content="%" type="function" />
        <Button onButtonClick={handleInput} content="÷" type="operator" />
        <Button onButtonClick={handleInput} content="7" />
        <Button onButtonClick={handleInput} content="8" />
        <Button onButtonClick={handleInput} content="9" />
        <Button onButtonClick={handleInput} content="×" type="operator" />
        <Button onButtonClick={handleInput} content="4" />
        <Button onButtonClick={handleInput} content="5" />
        <Button onButtonClick={handleInput} content="6" />
        <Button onButtonClick={handleInput} content="-" type="operator" />
        <Button onButtonClick={handleInput} content="1" />
        <Button onButtonClick={handleInput} content="2" />
        <Button onButtonClick={handleInput} content="3" />
        <Button onButtonClick={handleInput} content="+" type="operator" />
        <Button onButtonClick={handleInput} content="0" />
        <Button onButtonClick={handleInput} content="." />
        <Button onButtonClick={handleInput} content="=" type="operator" />
      </div>
    </div>
  );
}
export default Calculator;
