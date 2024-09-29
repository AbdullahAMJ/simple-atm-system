#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 100000;
let myPin = 1234;

console.log(chalk.white("\n \t Welcome to ATM-Machine \n"));

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: chalk.yellow("Enter your pin code:"),
  },
]);

if (pinAnswer.pin == myPin) {
  console.log(chalk.green("\nPin is  correct, Login successfully!"));
  // console.log(`Current Account Balance is${myBalance}`);

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: "Select an operation:",
      choices: ["Withdraw Amount","Check Balance"],
    },
  ]);

  if (operationAns.operation === "Withdraw Amount") {
    let withdrawAns = await inquirer.prompt([
      {
        name: "withdrawMethod",
        type: "list",
        message: " select a withdrawal method:",
        choices: ["Current", "Enter Amount"],
      },
    ]);
    if (withdrawAns.withdrawMethod === "Current") {
      let CurrentAns = await inquirer.prompt([
        {
          name: "Current",
          type: "list",
          message: "Select Amount:",
          choices: [1000, 2000, 5000, 10000, 20000, 50000],
        },
      ]);
      if (CurrentAns.fastCash > myBalance) {
        console.log(chalk.red("Insufficient Balance"));
      } else {
        myBalance -= CurrentAns.Current;
        console.log(`${CurrentAns.Current} withdraw Successfully`);
        console.log(chalk.green(`Your Remaining Balance is: ${myBalance}`));
      }
    } else if (withdrawAns.withdrawMethod === "Enter Amount") {
      let amountAns = await inquirer.prompt([
        {
          name: "amount",
          type: "number",
          message: "Enter the amount to withdraw:",
        },
      ]);

      if (amountAns.amount > myBalance) {
        console.log(chalk.red("Insufficient Balance"));
      } else {
        myBalance -= amountAns.amount;
        console.log(`${amountAns.amount} Withdraw Successfully`);
        console.log(`Your Remaining Balance is: ${chalk.green(myBalance)}`);
      }
    }
  } else if (operationAns.operation === "Check Balance") {
    console.log(`Your Account Balance is: ${chalk.green(myBalance)}`);
  }
} else {
  console.log(chalk.red("Pin is Incorrect, Try Again!"));
}
