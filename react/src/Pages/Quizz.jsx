import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const QuestionComponent = (props) => {
  const AnswerComponent = (props) => {
    return (
      <div className="flex w-fit items-center gap-x-2 ml-4">
        <input type="checkbox" />
        <p>{props.ans}</p>
      </div>
    );
  };
  return (
    <div className="ml-8 my-4">
      <h2 className="text-xl mb-2">
        {props.id}
        <span className="mr-2">.</span>
        {props.quest}
      </h2>

      <div>
        {props.ans.map((ans) => (
          <AnswerComponent key={ans.id} {...ans} />
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

  return (
    <div className=" flex-1 p-10 bg-gray-50 my-20 rounded-lg shadow-md mx-auto max-w-[1000px]">
      <h1 className="text-3xl mb-3">Quizz</h1>

      {Questions.map((question) => (
        <QuestionComponent key={question.id} {...question} />
      ))}

      <Link to={"/home/quizz/finish"}>
        <Button className="mx-auto flex px-20 py-6 bg-yellow-500 hover:bg-yellow-600">
          Suivant
        </Button>
      </Link>
    </div>
  );
};

export default Quizz;
