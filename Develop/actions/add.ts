// src/actions/add.ts
import inquirer from 'inquirer';
import pool from '../src/db';

// Add a new department =  prompted to enter the name of the department and that department is added to the database
export const addDepartment = async () => {
    const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the name of the department:',
                validate: input => input ? true : 'Department name is required!',
            },
        ]);

    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [answers.name]);
        console.log('Department added successfully!');
    } catch (error) {
        console.error('Error adding department:', error);
    }
};

// Add a new role =  prompted to enter the name, salary, and department for the role and that role is added to the database
export const addRole = async () => {
    const departments = await pool.query('SELECT * FROM department');
    const departmentChoices = departments.rows.map(dept => ({
        name: dept.name,
        value: dept.id
    }));

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:',
            validate: input => input ? true : 'Role title is required!',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role:',
            validate: input => input ? true : 'Role salary is required!',
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Select the department for this role:',
            choices: departmentChoices,
        },
    ]);

    try {
        await pool.query(
            'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
            [answers.title, answers.salary, answers.department_id]
        );
        console.log('Role added successfully!');
    } catch (error) {
        console.error('Error adding role:', error);
    }
};

// Add a new employee =  prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
export const addEmployee = async () => {
    const roles = await pool.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({   
        name: role.title,
        value: role.id
    }));

    const employees = await pool.query('SELECT * FROM employee');
    const managerChoices = employees.rows.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id
    }));

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name:',
            validate: input => input ? true : 'name is required!',
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'Enter the lastname:',
            validate: input => input ? true : 'lastname is required!',
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Select the manager for this role:',
            choices: managerChoices,
        },
        {
            type: 'input',
            name: 'role',
            message: 'Select the role',
            choices: roleChoices,
        },
    ]);

try {
    await pool.query('INSERT INTO department (name) VALUES ($1)', [answers.name]);
    console.log('Department added successfully!');
} catch (error) {
    console.error('Error adding department:', error);
}
}
