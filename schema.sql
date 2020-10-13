DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;

USE employee_tracker;

CREATE TABLE departments (
	id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
	id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
	department_id INT,
    FOREIGN KEY(department_id) REFERENCES departments(id),
    PRIMARY KEY(id)
);


CREATE TABLE employees (
	id INT AUTO_INCREMENT,
	first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES departments(id),
    PRIMARY KEY(id)
);

INSERT INTO departments(name)
VALUES('Executive'),
('Sales'),
('Engineering'),
('Legal'),
('Accounting'),
('Human Resources');