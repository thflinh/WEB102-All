import { useState } from 'react';
import flashcards from './components/CardList';
import Flashcard from './components/Flashcard';
import './index.css';

const App = () => {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const[feedback, setFeedback] = useState(null);

  const currentCard = flashcards[index];

  const handleSubmit = () => {
    const cleanedGuess = guess.trim().toLowerCase();
    const correctAnswer = currentCard.ans.trim().toLowerCase();

    if (cleanedGuess === correctAnswer)
    {
      setFeedback('correct');
    }
    else {
      setFeedback('wrong');
    }
  };

  const goNext = () => {
    if (index < flashcards.length -1) {
      setIndex(index + 1);
      resetState();
    }
  };

  const goBack = () => {
    if (index > 0)
    {
      setIndex(index - 1);
      resetState();
    }
  };

  const resetState = () => {
    setGuess('');
    setFeedback('');
  }

  return (
    <div className="app">
      <h1>💻 DSA Flashcards</h1>
      <p>Study fundamental computer science concepts and terminology.</p>
      <p>Total Cards: {flashcards.length}</p>

      <Flashcard card={currentCard} />

      <input
        type="text"
        placeholder="Enter your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {feedback === 'correct' && <p style={{ color: 'green' }}>✅ Correct!</p>}
      {feedback === 'wrong' && <p style={{ color: 'red' }}>❌ Try again!</p>}

      <div className="button-row">
        <button onClick={goBack} disabled={index === 0}>
          ⬅️ Back
        </button>
        <button onClick={goNext} disabled={index === flashcards.length - 1}>
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default App;
