const Employee = require("./Employee")

class Engineer extends Employee {
    constructor(name, id, email, github, role) {
        super(name, id, email, role = "Engineer")
        this.github = github
    }
    getGithub(){
        return this.github
    }
    getRole(){
        return this.role
    }
}
module.exports = Engineer;