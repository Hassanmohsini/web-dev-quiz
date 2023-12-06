import readlineSync from "readline-sync";


import displayMainMenu from "./main-admin-user.js";
import displayAdminMenu from "./main-admin-user.js"
import displayUserMenu from "./main-admin-user.js"

const categories = ["htmlQuestions", "cssQuestions", "javaScriptQuestions"];

displayMainMenu(categories);
const roleChoice = readlineSync.question("Enter your choice: ");

if (roleChoice === "1") {
  displayAdminMenu(categories);
} else if (roleChoice === "2") {
  displayUserMenu(categories);
} else if (roleChoice === "0") {
  console.log("Exiting...");
} else {
  console.log("Invalid choice. Please try again.");
}