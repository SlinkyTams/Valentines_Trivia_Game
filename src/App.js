import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const questions = [
  { question: "Which Roman god is associated with love?", options: ["Mars", "Venus", "Jupiter", "Mercury"], correct: 1 },
  { question: "What is the traditional color of Valentine's Day?", options: ["Blue", "Green", "Red", "Purple"], correct: 2 },
  { question: "Which flower is most associated with love?", options: ["Tulip", "Daisy", "Rose", "Lily"], correct: 2 },
  { question: "What shape is most associated with Valentine's Day?", options: ["Star", "Circle", "Triangle", "Heart"], correct: 3 },
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);
  const [highScore, setHighScore] = useState(() => localStorage.getItem("highScore") || 0);
  
  useEffect(() => {
    if (!showScore && timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      nextQuestion();
    }
  }, [timer, showScore]);

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
      new Audio('./correct.mp3').play();
    } else {
      new Audio('./wrong.mp3').play();
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(10);
    } else {
      setShowScore(true);
      if (score + 1 > highScore) {
        localStorage.setItem("highScore", score + 1);
        setHighScore(score + 1);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Valentine's Trivia 💖</h1>
      {showScore ? (
        <>
          <h2>Your Score: {score}</h2>
          <h3>High Score: {highScore}</h3>
          <button onClick={() => { setShowScore(false); setCurrentQuestion(0); setScore(0); setTimer(10); }}>Play Again</button>
        </>
      ) : (
        <>
          <h3>{questions[currentQuestion].question}</h3>
          <p>Time Left: {timer}s</p>
          {questions[currentQuestion].options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)}>{opt}</button>
          ))}
        </>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
