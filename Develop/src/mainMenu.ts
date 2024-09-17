import inquirer from "inquirer";
import {viewDepartments, viewRoles, viewEmployees} from "../actions/view";
import {addDepartment, addRole, addEmployee} from "../actions/add";
import {updateEmployeeRole} from "../actions/update";

export const mainMenu = async () => {
    const answers = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit',
            ],
        },
    ]);

    switch (answers.action) {
        case 'View all departments':
            await viewDepartments();
            break;
        case 'View all roles':
            await viewRoles();
            break;
        case 'View all employees':
            await viewEmployees();
            break;
        case 'Add a department':
            await addDepartment();
            break;
            case 'Add a role':
                await addRole();
                break;
                case 'Add an employee':
            await addEmployee();
            break;
        case 'Update an employee role':
            await updateEmployeeRole();
            break;
            default:
                console.log("Goodbye!");
                process.exit(0);
    }
    await mainMenu(); // To loop back to the main menu after an action is completed
};