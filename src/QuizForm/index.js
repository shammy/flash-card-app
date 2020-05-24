import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import './index.css';

function QuizQuestionForm() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionEntity, setQuestionEntity] = useState([]);

  useEffect(setLocalStorage, [questionEntity]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!question || !answer) return;
    setQuestionEntity({ question, answer });
    setQuestion('');
    setAnswer('');
  }

  function getQuestionList() {
    const storedQuestionList = window.localStorage.getItem('questionList');
    if (storedQuestionList) return [...JSON.parse(storedQuestionList), questionEntity];
    return [questionEntity];
  }

  function setLocalStorage() {
    if (!questionEntity || isEmpty(questionEntity)) return;
    const questionList = getQuestionList();
    window.localStorage.setItem('questionList', JSON.stringify(questionList));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question-input">Question</label>
        <input
          id="question-input"
          type="text"
          className="display-block"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        <label htmlFor="answer-input">Answer</label>
        <textarea
          id="answer-input"
          row="4"
          cols="50"
          className="display-block"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default QuizQuestionForm;
