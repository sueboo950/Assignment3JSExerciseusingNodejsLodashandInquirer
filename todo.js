const inquirer = require('inquirer');
const _ = require('lodash');

let tasks = [];

// Function to add a task
const addTask = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'task',
            message: 'Enter the task:',
        },
    ]).then(answers => {
        tasks.push({ task: answers.task, completed: false });
        showMenu();
    });
};

// Function to mark a task as completed
const markTaskCompleted = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'Select the task to mark as completed:',
            choices: tasks.filter(task => !task.completed).map((task, index) => ({
                name: task.task,
                value: index
            })),
        },
    ]).then(answers => {
        tasks[answers.task].completed = true;
        showMenu();
    });
};

// Function to remove a task
const removeTask = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'task',
            message: 'Select the task to remove:',
            choices: tasks.map((task, index) => ({
                name: task.task,
                value: index
            })),
        },
    ]).then(answers => {
        tasks.splice(answers.task, 1);
        showMenu();
    });
};

// Function to view all tasks
const viewTasks = () => {
    const groupedTasks = _.groupBy(tasks, 'completed');
    console.log('Pending Tasks:');
    (groupedTasks['false'] || []).forEach(task => console.log(`- ${task.task}`));
    console.log('\nCompleted Tasks:');
    (groupedTasks['true'] || []).forEach(task => console.log(`- ${task.task}`));
    showMenu();
};

// Function to show the menu
const showMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'Add a task',
                'Mark a task as completed',
                'Remove a task',
                'View all tasks',
                'Exit'
            ],
        },
    ]).then(answers => {
        switch (answers.action) {
            case 'Add a task':
                addTask();
                break;
            case 'Mark a task as completed':
                markTaskCompleted();
                break;
            case 'Remove a task':
                removeTask();
                break;
            case 'View all tasks':
                viewTasks();
                break;
            case 'Exit':
                console.log('Goodbye!');
                process.exit();
                break;
        }
    });
};

// Start the application
showMenu();
