import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => setQuestions(questions));
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
    setShowForm(false);
  };

  const handleDeleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  };

  const handleUpdateCorrectAnswer = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        setQuestions(questions.map((question) =>
          question.id === id ? updatedQuestion : question
        ));
      })
      .catch((error) => {
        console.error("Error updating correct answer:", error);
      });
  };

  return (
    <section>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "View Questions" : "New Question"}
      </button>
      {showForm ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <>
          <h1>Quiz Questions</h1>
          <ul>
            {questions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                onDelete={handleDeleteQuestion}
                onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

export default QuestionList;







/* Explanation:
State Management:

questions: An array of questions fetched from the server.
showForm: A boolean to toggle between the form and the list of questions.
Fetching Questions:

The useEffect hook fetches questions from the server when the component mounts.
Adding a Question:

handleAddQuestion: Updates the state with the new question and hides the form.
Deleting a Question:

handleDeleteQuestion: Sends a DELETE request to the server and updates the state to remove the deleted question.
Updating Correct Answer:

handleUpdateCorrectAnswer: Sends a PATCH request to update the correct answer and updates the state with the updated question.
Toggle Button:

A button to toggle between the question form and the list of questions.
Rendering Questions:

Maps over the questions array and renders a QuestionItem for each question, passing the necessary props for deletion and updating.*/