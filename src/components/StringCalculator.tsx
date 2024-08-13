import React, { useState } from "react";
import { add } from "../services/stringCalculator";

const StringCalculator: React.FC = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    try {
      setResult(add(input));
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };
  return (
    <div>
      <h1>String Calculator</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <p>Result: {result}</p>}
    </div>
  );
};

export default StringCalculator;
