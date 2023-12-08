import readlineSync from "readline-sync";
import fs from "fs";
import { displayUserMenu } from "./web-dev-quiz.js";

const categories = ["htmlQuestions", "cssQuestions", "javaScriptQuestions"];

function askQuestions(category) {
  let totalQuestions = 0;
  let score = 0;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function printResult() {
    console.clear();
    console.log(
      `You have answered correctly ${score} out of ${totalQuestions} questions.\n`
    );

    if (score === totalQuestions) {
      console.log("Congratulations! 🌹❤️❤️❤️\n");
    }
  }

  while (true) {
    let askedQuestions = [];
    totalQuestions = 0;
    score = 0;
    console.clear();
    const numQuestions = readlineSync.questionInt(
      "How many questions do you want to answer? "
    );

    if (numQuestions <= 0) {
      console.log("Exiting the quiz. Goodbye!");
      process.exit();
    }

    console.clear();
    const questions = JSON.parse(fs.readFileSync(`${category}.json`));
    const shuffledQuestions = shuffleArray(questions);
    const selectedQuestions = shuffledQuestions.slice(0, numQuestions);

    totalQuestions += numQuestions;

    for (let i = 0; i < selectedQuestions.length; i++) {
      if (i > 0) {
        console.clear();
      }

      let currentQuestion;

      do {
        currentQuestion = selectedQuestions[i];
      } while (askedQuestions.includes(currentQuestion));

      askedQuestions.push(currentQuestion);

      console.log(currentQuestion.question);

      const userAnswerIndex = readlineSync.keyInSelect(
        currentQuestion.options,
        "Your answer:",
        { cancel: "Exit" }
      );

      if (userAnswerIndex === -1) {
        console.log("Exiting the quiz. Goodbye!");
        process.exit();
      }

      if (userAnswerIndex + 1 === currentQuestion.correctAnswer + 1) {
        console.log("Correct!\n");
        score++;
      } else {
        console.log(
          "Incorrect. The correct answer is: " +
            (currentQuestion.correctAnswer + 1) +
            "\n"
        );
      }
    }
    console.clear();
    printResult();
    const continueQuiz = readlineSync.keyInYNStrict("Do you want to continue?");
    if (!continueQuiz) {
      // console.log("Exiting the quiz. Goodbye!");
      displayUserMenu();
    }

    console.clear();
  }
}
export default askQuestions;
