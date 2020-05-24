import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import QuizQuestionForm from './QuizForm';
import Quiz from './Quiz';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/quiz" className="link">
            <h1>Quiz</h1>
          </Link>
          <Link to="/form" className="link">
            <h1>Add Question</h1>
          </Link>
        </header>
        <Route exact path="/" render={() => <Redirect to="/quiz" />} />
        <Route exact path="/quiz" component={Quiz} />
        <Route exact path="/form" component={QuizQuestionForm} />
      </div>
    </Router>
  );
}

export default App;
