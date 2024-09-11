import pool from '../src/db';

export const viewDepartments = async () => {
    try {
        const res = await pool.query('SELECT * FROM department');
        console.table(res.rows);
    } catch (err) {
        console.error('Error viewing departments:', err);
    }
};
export const viewRoles = async () => {
    try {
        const res = await pool.query(
            `SELECT role.id, role.title, role.salary, department.name AS department 
            FROM role 
            JOIN department ON role.department_id = department.id`
        );
        console.table(res.rows);
    } catch (err) {
        console.error('Error viewing roles:', err);
    }
};
export const viewEmployees = async () => {
    try {
        const res = await pool.query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary AS salary, manager.first_name AS manager
             FROM employee
             JOIN role ON employee.role_id = role.id
             JOIN department ON role.department_id = department.id
             LEFT JOIN employee manager ON employee.manager_id = manager.id`
        );
        console.table(res.rows);
    } catch (err) {
        console.error('Error viewing employees:', err);
    }
};