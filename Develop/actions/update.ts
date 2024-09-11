// src/actions/update.ts
import inquirer from 'inquirer';
import pool from '../src/db';

export const updateEmployeeRole = async () => {
    const employees = await pool.query('SELECT * FROM employee');
    const employeeChoices = employees.rows.map(emp => ({
        name: `${emp.first_name} ${emp.last_name}`,
        value: emp.id
    }));

    const roles = await pool.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({
        name: role.title,
        value: role.id
    }));

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee whose role you want to update:',
            choices: employeeChoices,
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the new role for this employee:',
            choices: roleChoices,
        },
    ]);

    try {
        await pool.query(
            'UPDATE employee SET role_id = $1 WHERE id = $2',
            [answers.role_id, answers.employee_id]
        );
        console.log('Employee role updated successfully!');
    } catch (error) {
        console.error('Error updating employee role:', error);
    }
};
