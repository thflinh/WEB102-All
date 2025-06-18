import { useState } from 'react';
import flashcards from './components/CardList';
import Flashcard from './components/Flashcard';
import './index.css';

const App = () => {
  const [index, setIndex] = useState(0);

  const goNext = () => {
    setIndex((prev) => (prev + 1) % flashcards.length);
  };

  const goBack = () => {
    setIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="app">
      <h1>💻 DSA Flashcards</h1>
      <p>Study fundamental computer science concepts and terminology.</p>
      <p>Total Cards: {flashcards.length}</p>

      <Flashcard card={flashcards[index]} />

      <div className="button-row">
        <button onClick={goBack}>⬅️ Back</button>
        <button onClick={goNext}>Next ➡️</button>
      </div>
    </div>
  );
};

export default App;
