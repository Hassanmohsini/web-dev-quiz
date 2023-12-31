import readlineSync from "readline-sync";
import fs from "fs";
import displayAdminMenu from "./web-dev-quiz.js";

const categories = ["htmlQuestions", "cssQuestions", "javaScriptQuestions"];

function addQuestion() {
  console.clear();
  console.log(
    "Please select a category from the below options to add a question."
  );
  const categoryChoice = readlineSync.keyInSelect(
    categories,
    "Enter the number of your category or choose 'Cancel' to go back: =>",
    { cancel: "Cancel" }
  );

  if (categoryChoice === -1) {
    displayAdminMenu();
    return;
  }

  const category = categories[categoryChoice];

  do {
    console.clear();
    const newQuestion = readlineSync.question(
      `You have selected the category ${category}. Enter your question: => `
    );

    const options = [];
    for (let i = 0; i < 4; i++) {
      const option = readlineSync.question(`Enter option ${i + 1}: `);
      options.push(option);
    }

    const correctAnswerIndex = readlineSync.keyInSelect(
      options,
      "Select the correct answer:",
      { cancel: "Cancel" }
    );

    if (correctAnswerIndex === -1) {
      console.log("Canceled. Question not added.");
      break;
    }

    const newQuestionObject = {
      question: newQuestion,
      options: options,
      correctAnswer: correctAnswerIndex,
    };

    const questions = JSON.parse(fs.readFileSync(`${category}.json`));
    questions.push(newQuestionObject);
    fs.writeFileSync(`${category}.json`, JSON.stringify(questions, null, 2));
    console.clear();
    console.log("Question added successfully!");

    const addAnother = readlineSync.keyInYNStrict(
      "Do you want to add another question?"
    );
    if (!addAnother) {
      break;
    }
  } while (true);

  displayAdminMenu();
}
export default addQuestion;
