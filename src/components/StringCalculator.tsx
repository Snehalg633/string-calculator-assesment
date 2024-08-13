import './StringCalculator.css';
import React, { useState } from "react";
import { add } from "../services/stringCalculator";

const StringCalculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    try {
      setResult(add(input));
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        setResult(null);
      }
    }
  };

  const setInputValue = (e:any) =>{ 
    setInput(e.target.value)
  }
  return (
    <div>
      <h1>String Calculator</h1>
    
       <input
        value={input}
        onChange={setInputValue}
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <p>Result: {result}</p>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default StringCalculator;
