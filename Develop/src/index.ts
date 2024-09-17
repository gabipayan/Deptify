import inquirer from "inquirer";
import {mainMenu} from "./mainMenu";

const init = async () => {
    console.log("Welcome to the Employee Tracker!");
    await mainMenu();
    };


init();