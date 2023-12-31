import readlineSync from "readline-sync";
import fs from "fs";
import displayAdminMenu from "./web-dev-quiz.js";

const categories = ["htmlQuestions", "cssQuestions", "javaScriptQuestions"];

function removeQuestion() {
  console.clear();
  console.log(
    "Please select a category from the below options to remove question from."
  );
  const categoryChoice = readlineSync.keyInSelect(
    categories,
    "Enter here the number of your category: =>",
    { cancel: "Cancel" }
  );
  console.clear();
  if (categoryChoice === -1) {
    displayAdminMenu();
    return;
  }

  const category = categories[categoryChoice];
  let questions = JSON.parse(fs.readFileSync(`${category}.json`, "utf-8"));

  if (questions.length === 0) {
    console.log("There are no questions to remove.");
    displayAdminMenu();
    return;
  }

  let removeAnother = true;

  while (removeAnother) {
    console.log("Select a question to remove:");

    const questionNumbers = questions.map((_, index) => (index + 1).toString());
    const questionNumber = readlineSync.question(
      `Which question do you want to remove from this list? =>(1-${questionNumbers.length}) or 0 to cancel: `
    );

    console.clear();
    if (questionNumber === "0") {
      console.log("Canceled. No question removed.");
      displayAdminMenu();
      return;
    }

    const index = parseInt(questionNumber) - 1;
    function removeQuestion() {
      console.clear();
      console.log(
        "Please select a category from the below options to remove question from."
      );
      const categoryChoice = readlineSync.keyInSelect(
        categories,
        "Enter here the number of your category: =>",
        { cancel: "Cancel" }
      );
      console.clear();
      if (categoryChoice === -1) {
        displayAdminMenu();
        return;
      }

      const category = categories[categoryChoice];
      let questions = JSON.parse(fs.readFileSync(`${category}.json`, "utf-8"));

      if (questions.length === 0) {
        console.log("There are no questions to remove.");
        displayAdminMenu();
        return;
      }

      let removeAnother = true;

      while (removeAnother) {
        console.log("Select a question to remove:");

        const questionNumbers = questions.map((_, index) =>
          (index + 1).toString()
        );
        const questionNumber = readlineSync.question(
          `Which question do you want to remove from this list? =>(1-${questionNumbers.length}) or 0 to cancel: `
        );

        console.clear();
        if (questionNumber === "0") {
          console.log("Canceled. No question removed.");
          displayAdminMenu();
          return;
        }

        const index = parseInt(questionNumber) - 1;

        if (isNaN(index) || index < 0 || index >= questionNumbers.length) {
          console.log("Invalid choice. Please try again.");
          displayAdminMenu();
          return;
        }

        const selectedQuestion = questions[index];
        console.log(`Selected Question: ${selectedQuestion.question}`);

        const confirmRemoval = readlineSync.keyInYNStrict(
          "Do you really want to remove this question? "
        );

        console.clear();
        if (confirmRemoval) {
          questions.splice(index, 1);
          fs.writeFileSync(
            `${category}.json`,
            JSON.stringify(questions, null, 2)
          );
          console.log("Question removed successfully!");
        } else {
          console.log("Canceled. No question removed.");
        }
        console.clear();
        removeAnother = readlineSync.keyInYNStrict(
          "Do you want to remove another question?"
        );

        if (removeAnother) {
          questions = JSON.parse(fs.readFileSync(`${category}.json`, "utf-8"));
        } else {
          displayAdminMenu();
        }
      }
    }

    const selectedQuestion = questions[index];
    console.log(`Selected Question: ${selectedQuestion.question}`);

    const confirmRemoval = readlineSync.keyInYNStrict(
      "Do you really want to remove this question? "
    );

    console.clear();
    if (confirmRemoval) {
      questions.splice(index, 1);
      fs.writeFileSync(`${category}.json`, JSON.stringify(questions, null, 2));
      console.log("Question removed successfully!");
    } else {
      console.log("Canceled. No question removed.");
    }
    console.clear();
    removeAnother = readlineSync.keyInYNStrict(
      "Do you want to remove another question?"
    );

    if (removeAnother) {
      questions = JSON.parse(fs.readFileSync(`${category}.json`, "utf-8"));
    } else {
      displayAdminMenu();
    }
  }
}
export default removeQuestion;
