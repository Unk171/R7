import inquirer from "inquirer";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "What is the title of your project? \n"
    },
    {
        type: "input",
        name: "description",
        message: "Please provide a short description of your project. \n"
    },
    {
        type: "input",
        name: "installation",
        message: "What are the steps required to install your project? \n"
    },
    {
        type: "input",
        name: "usage",
        message: "Provide instructions and examples for use. \n"
    },
    {
        type: "confirm",
        name: "screenshot",
        message: "Do you have screenshots you would like to include? \n",
        default: false
    },
    {
        type: "input",
        name: "screenshotPath",
        message: "Please provide the path to your screenshot. \n",
        when: (answers) => answers.screenshot,
        validate: (value) => value ? true : "Please provide the path to your screenshot."
    },
    {
        type: "input",
        name: "credits",
        message: "List your collaborators, if any, with links to their GitHub profiles. \n"
    },
    {
        type: "input",
        name: "features",
        message: "If your project has a lot of features, list them here. \n"
    },
    {
        type: "input",
        name: "contribute",
        message: "If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. \n"
    },
    {
        type: "input",
        name: "tests",
        message: "Provide examples for running tests. \n"
    },
    {
        type: "list",
        name: "license",
        message: "What license would you like to use?",
        choices: ["MIT", "Apache 2.0", "GPL", "LGPL", "BSD"]
    }
])
    .then(function (data) {
        const dirPath = path.join(__dirname, data.title);

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }

        const readme = readmeTemplate(data);
        console.log(readme);
        fs.writeFile(path.join(dirPath, "README.md"), readme, function (err) {
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
- [Features](#features)
- [How to Contribute](#how-to-contribute)
- [Tests](#tests)
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