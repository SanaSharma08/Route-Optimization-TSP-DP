import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';
import { useRef, useState } from 'react';

export default function Scanner() {
  const imgRef = useRef();
  const [result, setResult] = useState("Waiting for image...");

  const classifyImage = async () => {
    setResult("Analyzing...");
    const model = await mobilenet.load();
    const predictions = await model.classify(imgRef.current);
    setResult(predictions[0].className); // e.g., "water bottle" -> Logic: Map to Plastic
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px' }}>
      <h3>Level 2: Recycling AI Scanner</h3>
      <input type="file" accept="image/*" onChange={(e) => {
        imgRef.current.src = URL.createObjectURL(e.target.files[0]);
      }} />
      <img ref={imgRef} width="200" alt="trash" style={{ display: 'block', margin: '10px 0' }} />
      <button onClick={classifyImage}>Classify Waste</button>
      <p>Result: <strong>{result}</strong></p>
    </div>
  );
}