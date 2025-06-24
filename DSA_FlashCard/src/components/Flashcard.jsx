import { useState } from 'react';
import '../index.css';

const Flashcard = ({ card }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
        <div className="flashcard-front">
          <p>{card.ques}</p>
        </div>
        <div className="flashcard-back">
          <p>{card.ans}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
