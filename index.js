import inquirer from "inquirer";
import fs from "fs";




inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
    },
    {
        type: "input",
        name: "description",
        message: "Please provide a short description of your project."
    },
    {
        type: "input",
        name: "installation",
        message: "What are the steps required to install your project?"
    },
    {
        type: "input",
        name: "usage",
        message: "Provide instructions and examples for use."
    },
    {
        type: "confirm",
        name: "screenshot",
        message: "Do you have screenshots you would like to include?",
        default: false
    },
    {
        type: "input",
        name: "screenshotPath",
        message: "Please provide the path to your screenshot.",
        when: (answers) => answers.screenshot,
        validate: (value) => value ? true : "Please provide the path to your screenshot."
           
    },
        {
        type: "input",
        name: "credits",
        message: "List your collaborators, if any, with links to their GitHub profiles."
    },
    {
        type: "input",
        name: "features",
        message: "If your project has a lot of features, list them here."
    },
    {
        type: "input",
        name: "contribute",
        message: "If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so."
    },
    {
        type: "input",
        name: "tests",
        message: "Provide examples for running tests."
    },
    {
        type: "list",
        name: "license",
        message: "What license would you like to use?",
        choices: ["MIT", "Apache 2.0", "GPL", "LGPL", "BSD"]
    }
])
.then(function (data) {
    const readme = readmeTemplate(data);
    console.log(readme);

    fs.writeFile("README.md", readme, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("README.md has been created!");
    });
});

function readmeTemplate({ title, description, installation, usage, credits, features, contribute, tests, license, screenshot, screenshotPath }) {

    let screenshotSection = "";
    if (screenshot && screenshotPath) {
        screenshotSection = `![screenshot](${screenshotPath})`;
    };
    return `# ${title}

## Description

${description}

## Table of Contents (Optional)


- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [Features](#Features)
- [How to Contribute](#How-to-Contribute)
- [Tests](#Tests)
- [License](#license)

## Installation

${installation}

## Usage

${usage}

   ${screenshotSection}


## Credits

${credits}


## Features

${features}

## How to Contribute

${contribute}

## Tests

${tests}

## License

${license}`
}