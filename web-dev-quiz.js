import readlineSync from "readline-sync";
import fs from "fs";

const categories = ["htmlQuestions", "cssQuestions", "javaScriptQuestions"];

function displayMainMenu() {
  console.clear();
  console.log("Welcome to the Web Development Quiz main room.\n");
  console.log("[1] Admin");
  console.log("[2] User");
  console.log("[0] Exit\n");
  const userChoice = readlineSync.question(
    "Choose your role from here: => [1, 2, 0]"
  );

  if (userChoice === "1") {
    displayAdminMenu();
  } else if (userChoice === "2") {
    displayUserMenu();
  } else if (userChoice === "0") {
    process.exit();
  } else {
    console.log("Inavlid choice, try again.");
  }
}

function displayAdminMenu() {
  console.clear();
  console.log("Welcome to the admin room.\n");
  console.log("[1] Add question");
  console.log("[2] Remove question");
  console.log("[0] Get back to main room.\n");
  const adminChoice = readlineSync.question(
    "Choose your option to add/remove question => [1, 2, 0]"
  );

  if (adminChoice === "1") {
    addQuestion();
  } else if (adminChoice === "2") {
    removeQuestion();
  } else if (adminChoice === "0") {
    displayMainMenu();
  } else {
    console.log("Inavlid choice, try again.");
  }
}
// displayMainMenu();

function displayUserMenu() {
  console.clear();
  console.log("Welcome to the quiz questions category room!\n");
  console.log("[1] htmlQuestions");
  console.log("[2] cssQuestions");
  console.log("[3] javaScriptQuestions");
  console.log("[0] Get back to main room.\n");
  console.log("Select a category to answer the questions [1, 2, 3, 0]:");

  const userChoice = readlineSync.question("Enter your choice: ");

  if (userChoice === "1" || userChoice === "2" || userChoice === "3") {
    askQuestions(categories[parseInt(userChoice) - 1]);
  } else if (userChoice === "0") {
    displayMainMenu();
  } else {
    console.log("Invalid choice. Please try again.");
    displayUserMenu();
  }
}

// ********************************************************** Ask adn Answer Section
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

// ***********************************************************  AddQuestion
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

// ***************************************************  RemoveQuestion
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
      // Refresh the questions array from the file
      questions = JSON.parse(fs.readFileSync(`${category}.json`, "utf-8"));
    } else {
      displayAdminMenu();
    }
  }
}

//   *****************************************    Main logic
displayMainMenu();
const roleChoice = readlineSync.question("Enter your choice: ");

if (roleChoice === "1") {
  displayAdminMenu();
} else if (roleChoice === "2") {
  displayUserMenu();
} else if (roleChoice === "0") {
  console.log("Exiting...");
} else {
  console.log("Invalid choice. Please try again.");
}
