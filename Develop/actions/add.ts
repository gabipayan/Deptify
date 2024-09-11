// src/actions/add.ts
import inquirer from 'inquirer';
import pool from '../src/db';

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
