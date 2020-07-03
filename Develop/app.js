const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { start } = require("repl");

const teamMembers = [];
// let employeeData
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

init();

function init(response) {
    inquirer.prompt({
        type: "checkbox",
        name: "addEmployee",
        message: "Would you like to add a new employee?",
        choices: ["Yes", "No"]
    }).then(function (response) {
        console.log(response)
        if (response.addEmployee[0] === "Yes") {
            addTeamMember();
        }
        else {
            createHTML()
        }
    })
};

function addTeamMember(answers) {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Please enter employee name: "
        },
        {
            type: "input",
            name: "ID",
            message: "Please enter employee ID: "
        },
        {
            type: "input",
            name: "email",
            message: "Please enter employee email: "
        },
        {
            type: "checkbox",
            name: "role",
            message: "Which type of team member would you like to add?",
            choices: ["Manager", "Engineer", "Intern", "I don't want to add any more teammembers"]
        }
    ]).then(function (answers) {
        // employeeData = answers
        if (answers.role[0] === "Engineer") {
            createEngineer(answers);
        }
        else if (answers.role[0] === "Intern") {
            createIntern(answers);
        }
        else if (answers.role[0] === "Manager") {
            createManager(answers)
        }
        else if (answers.role[0] === "I don't want to add any more teammembers") {
            createHTML();
        }
    })
};

function createEngineer(answers) {
    return inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "Please enter GitHub username: "
        }
    ]).then(function (github) {
        const engineer = new Engineer(answers.name, answers.ID, answers.email, github.github)
        teamMembers.push(engineer);
        console.log(engineer)
        init();
    })

};

function createIntern(answers) {
    inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "Please enter intern school: "
        }
    ]).then(function (school) {
        const intern = new Intern(answers.name, answers.ID, answers.email, school.school)
        teamMembers.push(intern);
        console.log(intern)
        init();
    })
};

function createManager(answers) {
    inquirer.prompt([
        {
            type: "input",
            name: "office",
            message: "Please enter office number: "
        }
    ]).then(function (office) {
        const manager = new Manager(answers.name, answers.ID, answers.email, office.office)
        teamMembers.push(manager);
        console.log(manager)
        init();
    })
};

function createHTML() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    };
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
};

