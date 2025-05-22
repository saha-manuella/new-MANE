import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const QuestionComponent = ({ id, quest, ans, selectedAnswers, onAnswerSelect }) => {
  const handleAnswerSelect = (questionId, answerId) => {
    onAnswerSelect(questionId, answerId);
  };

  return (
    <div className="ml-8 my-4">
      <h2 className="text-xl mb-2">
        {id}
        <span className="mr-2">.</span>
        {quest}
      </h2>

      <div>
        {ans.map((answer) => (
          <div key={answer.id} className="flex w-fit items-center gap-x-2 ml-4 my-2">
            <input 
              type="radio" 
              id={`question-${id}-answer-${answer.id}`}
              name={`question-${id}`}
              checked={selectedAnswers[id] === answer.id}
              onChange={() => handleAnswerSelect(id, answer.id)}
            />
            <label htmlFor={`question-${id}-answer-${answer.id}`}>{answer.ans}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

const Quizz = () => {
  const Questions = [
    {
      id: 1,
      quest: "What is React JS?",
      correctAnswer: 2,
      ans: [
        {
          id: 1,
          ans: "A JavaScript framework",
        },
        {
          id: 2,
          ans: "A JavaScript library",
        },
        {
          id: 3,
          ans: "A JavaScript framework",
        },
        {
          id: 4,
          ans: "A web development tool",
        },
      ],
    },
    {
      id: 2,
      quest: "What is JavaScript?",
      correctAnswer: 1,
      ans: [
        {
          id: 1,
          ans: "A high-level programming language",
        },
        {
          id: 2,
          ans: "A low-level programming language",
        },
        {
          id: 3,
          ans: "A scripting language",
        },
        {
          id: 4,
          ans: "A markup language",
        },
      ],
    },
    {
      id: 3,
      quest: "What is Node.js?",
      correctAnswer: 1,
      ans: [
        {
          id: 1,
          ans: "A JavaScript runtime environment",
        },
        {
          id: 2,
          ans: "A JavaScript framework",
        },
        {
          id: 3,
          ans: "A web development tool",
        },
        {
          id: 4,
          ans: "A database management system",
        },
      ],
    },
    {
      id: 4,
      quest: "What is a React component?",
      correctAnswer: 2,
      ans: [
        {
          id: 1,
          ans: "A reusable piece of code",
        },
        {
          id: 2,
          ans: "A function that returns JSX",
        },
        {
          id: 3,
          ans: "A class that extends React.Component",
        },
        {
          id: 4,
          ans: "A web page",
        },
      ],
    },
    {
      id: 5,
      quest: "What is JSX?",
      correctAnswer: 1,
      ans: [
        {
          id: 1,
          ans: "A syntax extension for JavaScript",
        },
        {
          id: 2,
          ans: "A JavaScript framework",
        },
        {
          id: 3,
          ans: "A templating engine",
        },
        {
          id: 4,
          ans: "A markup language",
        },
      ],
    },
    {
      id: 6,
      quest: "What is the virtual DOM?",
      correctAnswer: 1,
      ans: [
        {
          id: 1,
          ans: "A lightweight in-memory representation of the real DOM",
        },
        {
          id: 2,
          ans: "A copy of the real DOM",
        },
        {
          id: 3,
          ans: "A JavaScript object",
        },
        {
          id: 4,
          ans: "A web development tool",
        },
      ],
    },
    {
      id: 7,
      quest: "What is state in React?",
      correctAnswer: 1,
      ans: [
        {
          id: 1,
          ans: "An object that determines the behavior of a component",
        },
        {
          id: 2,
          ans: "A property of a component",
        },
        {
          id: 3,
          ans: "A JavaScript variable",
        },
        {
          id: 4,
          ans: "A web development tool",
        },
      ],
    },
    {
      id: 8,
      quest: "What is a prop in React?",
      correctAnswer: 2,
      ans: [
        {
          id: 1,
          ans: "A short-hand for property",
        },
        {
          id: 2,
          ans: "A way to pass data from a parent component to a child component",
        },
        {
          id: 3,
          ans: "A JavaScript variable",
        },
        {
          id: 4,
          ans: "A web development tool",
        },
      ],
    },
    {
      id: 9,
      quest: "What is a higher-order component in React?",
      correctAnswer: 1,
      ans: [
        {
          id: 1,
          ans: "A function that takes a component as an argument and returns a new component",
        },
        {
          id: 2,
          ans: "A component that wraps another component",
        },
        {
          id: 3,
          ans: "A JavaScript function",
        },
        {
          id: 4,
          ans: "A web development tool",
        },
      ],
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));
  };

  const checkAnswers = () => {
    let correct = true;
    
    Questions.forEach(question => {
      if (selectedAnswers[question.id] !== question.correctAnswer) {
        correct = false;
      }
    });
    
    setAllCorrect(correct);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setAllCorrect(false);
  };

  const getQuestionResult = (questionId) => {
    const isAnswered = selectedAnswers[questionId] !== undefined;
    const isCorrect = selectedAnswers[questionId] === Questions.find(q => q.id === questionId).correctAnswer;
    
    if (!showResults || !isAnswered) return null;
    
    return (
      <span className={`ml-2 font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
        {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
      </span>
    );
  };

  return (
    <div className="flex-1 p-10 bg-gray-50 my-20 rounded-lg shadow-md mx-auto max-w-[1000px]">
      <h1 className="text-3xl mb-3">Quiz</h1>

      {Questions.map((question) => (
        <div key={question.id}>
          <QuestionComponent 
            {...question} 
            selectedAnswers={selectedAnswers}
            onAnswerSelect={handleAnswerSelect}
          />
          {getQuestionResult(question.id)}
        </div>
      ))}

      <div className="flex justify-center gap-4 mt-8">
        {showResults ? (
          <Button 
            onClick={resetQuiz} 
            className="px-10 py-6 bg-blue-500 hover:bg-blue-600"
          >
            {allCorrect ? "Parfait!" : "Réessayer"}
          </Button>
        ) : (
          <Button 
            onClick={checkAnswers} 
            className="px-10 py-6 bg-green-500 hover:bg-green-600"
          >
            Voir les résultats
          </Button>
        )}
        
        <Link to={"/home/quizz/finish"}>
          <Button className="px-10 py-6 bg-yellow-500 hover:bg-yellow-600">
            Suivant
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Quizz;