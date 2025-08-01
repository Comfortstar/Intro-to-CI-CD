# Intro-to-CI-CD

# UNDERSTANDING TO CONTINUOUS INTEGRATION AND CONTINUOUS DEPLOYMENT:

## Definition of CI/CD

* Continuous Integration (CI) is the practice of merging all Developers' working copies to a shared mainline several times a day.
* Continuous Deployment (CD) is the process of releasing softwares changes to production automatically and reliably. 

* ### Benefit: Faster release rate, improve developer productivity, better code quality, and enhance customer satisfaction.

## Overview Of The CD/CD Pipeline

*  ### CI PIPELINE:
  Typically includes steps like version control, code integration, automated testing, and building of application.

  * ### CD PIPELINE: 
  
  Involves steps like deploying application to a staging or prodution environment, and post deployment monitoring.

  ### TOOLS: 
  Version control system (git), CI/CD platform (e.g github action), testing framework, and deployment tools.

  ## INTRODUCTION TO GITHUB ACTION:
 * ### Github Action: 
  Is a CI/CD platform integrated into github, automating the build, test and deployment pipeline of your software directly within your Github repository.

  * ### Documentation References:
Explore the Github Actions Documentation for in-depth understanding.

## Key Concept and terminolgies:
### 1. WORKFLOW:
* #### DEFINTION:
  A configurable automated process made up of one or more jobs. Workflow are defined by a YAML file in the repository.

### 2. Events:
Is a specific activity that triggers a workflow. Events includes activities like push, pull request, issue creation, or even a schedule time. 

### 3. Jobs:
A set of steps in a workflow that are executed on the same runner. Jobs can run sequentially or parallel. 

### 4. Steps:
Is an individual task that can run a command within a job. Steps can run scripts or actions.
Example a step in a job to install dependencies like `npm install´

### 5. Action:
Is a standalone commands combined into steps to create a job. Action can be written by you or provided by the github community. Example, using àctions/checkout` to checkout your repositorycode. 

### 6. Runner:
A server thatbruns your workflow when they are triggered. Runners can be hosted GitHub or self-hosted. Example, Gitub-Hosted runner that uses Ubuntu.

## Additional Resources
* Githu learning lab: Interactive courses to learn GitHub Actions. 
* GitHub Action Quickstart: For a hands on introduction.
* Community Forum: Engage with the GitHub community for questions and discussion. 

## Practical Implementation
### Setting up the project:
### 1. Initialize the GitHub Repository:
* Create a new repository on GitHub
* Clone it to your Local machine.

### 2. Create a Simple Node.js application:
   * Initialize a node.js project (npm init)
   * Create a simple server using Express.js to serve a static web page.
* Add your code to the repository and push it to GitHub.

~~~~
// Example: index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {"\n     res.send('Hello World!');\n   "});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

~~~~

### 3. Writting your first Github workflow:
* Create a `.github/workflows` directory in your repository.
  
* Add a workflow file (e.g node.js.yml)

~~~~
# Example: .github/workflows/node.js.yml

# Name of the workflow
name: Node.js CI

# Specifies when the workflow should be triggered
on:
# Triggers the workflow on 'push' events to the 'main' branch
push:
    branches: [ main ]
# Also triggers the workflow on 'pull_request' events targeting the 'main' branch
pull_request:
    branches: [ main ]

# Defines the jobs that the workflow will execute
jobs:
# Job identifier, can be any name (here it's 'build')
build:
    # Specifies the type of virtual host environment (runner) to use
    runs-on: ubuntu-latest

    # Strategy for running the jobs - this section is useful for testing across multiple environments
    strategy:
    # A matrix build strategy to test against multiple versions of Node.js
    matrix:
        node-version: [14.x, 16.x]

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
    - # Checks-out your repository under $GITHUB_WORKSPACE, so the job can access it
    uses: actions/checkout@v2

    - # Sets up the specified version of Node.js
    name: Use Node.js ${{" matrix.node-version "}}
    uses: actions/setup-node@v1
    with:
        node-version: ${{" matrix.node-version "}}

    - # Installs node modules as specified in the project's package-lock.json
    run: npm ci

    - # This command will only run if a build script is defined in the package.json
    run: npm run build --if-present

    - # Runs tests as defined in the project's package.json
    run: npm test

  ~~~~

  ### Explanation:
  1. Name: This simply names your workflow. It what appears on github when the work is running.
  2. on: This section defines when the workflow is triggered. Here, its set to activate on push and pull request events to the main branch. 
  3. Jobs: Jobs are a set of steps that execute on the same runner. In this example, there is one job named 'build'.
  4. runs-on: Defines the type of machine to run the job on. Here its using the latest ubuntu virtual machine.
  5. strategy.matrix: This allows you to run the job on multiple version of node.js, ensuring compactibilty.
  6. steps: A sequence of task executed as part of job.
   * action/checkout@v2: checks out your repository under '$GITHUB_WORKSPACE' 
   * actions/setup_node@v1: Sets up the node.js environment.
   * npm ci: Install dependencies defined in 'package-lock.json'
   * npm run build --if-present: Runs the build script from 'package.json' if its present.
   * npm test:Runs test specified in package.json.

###  4. Testing and Deployment:
* Add automated test for the application. 