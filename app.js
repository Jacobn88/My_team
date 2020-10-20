const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function promptUser() {
    return inquirer.prompt([
         {
            type: "list",
            message: "Select your employee role.",
            name: "role",
            choices: ["Manager", "Engineer", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "What is the employee's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email address?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office number?",
            when: (answers) => answers.role === 'Manager'
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's Github username?",
            when: (answers) => answers.role === 'Engineer'
        },
        {
            type: "input",
            name: "school",
            message: "What school did the intern go to?",
            when: (answers) => answers.role === 'Intern'
        },
        // {
        //     type: 'confirm',
        //     name: 'again',
        //     message: 'Enter another employee? ',
        //     default: true
        //   }
    ])
}
var employees = [];
promptUser()
    .then(function (employeeData) {
        var employee;
        if(employeeData.role === "Intern") {
            employee = new Intern(employeeData.name, employeeData.id, employeeData.email, employeeData.school, employeeData.role)
        }else if (employeeData.role === "Engineer") {
            employee = new Engineer(employeeData.name, employeeData.id, employeeData.email, employeeData.github, employeeData.role)
        }else {
            employee = new Manager(employeeData.name, employeeData.id, employeeData.email, employeeData.officeNumber, employeeData.role)
        }
        
        
        employees.push(employee);
    })
    .then(function () {
        var html = render(employees);
        return fs.writeFileSync(outputPath, html);
    })
    .catch(function (err) {
        console.log(err);
    }).then((data) => {

    });
// promptUser().then(render(answers))
       
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
