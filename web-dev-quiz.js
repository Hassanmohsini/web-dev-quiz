import readlineSync from "readline-sync";
// import fs from "fs";
import askQuestions from "./ask-question.js";
import addQuestion from "./add-question.js";
import removeQuestion from "./remove-question.js";

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

export default function displayAdminMenu() {
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

export function displayUserMenu() {
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
//******************************************** askQuestion
//******************************************** addQuestion
//******************************************** removeQestion
//******************************************** Main logic
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