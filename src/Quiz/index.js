import React, { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel';
import { carouselContext } from '../context';
import './index.css';

function Quiz() {
  const [questionList, setQuestionList] = useState(getQuestionList());
  const [isFlipped, setIsFlipped] = useState(false);
  const [index, setIndex] = useState(0);

  function handleFlip() {
    setIsFlipped(!isFlipped);
  }

  function getQuestionList() {
    const storageQuestionList = window.localStorage.getItem('questionList');
    return storageQuestionList ? JSON.parse(storageQuestionList) : [];
  }

  function handleClickRight() {
    setIndex((index + 1) % questionList.length);
  }

  function handleClickLeft() {
    index === 0 ? setIndex(questionList.length - 1) : setIndex(index - 1);
  }

  function handleDeleteCard() {
    const newQuestionList = questionList.filter((_, i) => index !== i);
    if (index >= newQuestionList.length || index < 0) setIndex(0);
    setQuestionList(newQuestionList);
    window.localStorage.setItem('questionList', JSON.stringify(newQuestionList));
  }

  const carouselContextValue = {
    isFlipped,
    handleFlip,
    questionList,
    index,
    handleClickLeft,
    handleClickRight,
  };
  return (
    <div>
      {!isEmpty(questionList) ? (
        <div>
          <carouselContext.Provider value={carouselContextValue}>
            <Carousel />
          </carouselContext.Provider>
          <button className="delete-button" onClick={handleDeleteCard}>
            Delete
          </button>
        </div>
      ) : (
        <div className="flip-card front">
          There are no questions available, please click <Link to="/form">here</Link> to add some
        </div>
      )}
    </div>
  );
}

export default Quiz;
