# ListBuddy App

![ListBuddy thumbnail](/public/list-buddy-thumbnail.png)
*All UI Design, Logos, and Art created by Tyler Millien*

## Description

**ListBuddy** is an application that helps users with executive dysfunction with managing and completing tasks. Anyone with this behavioral symptom may feel helpless when it comes to getting tasks done, leading them to shut down and not complete any tasks at all.  
ListBuddy will help you with creating, managing, and keeping track of completed tasks. You will start by creating an account so that ListBuddy can give you access to your tasks from anywhere. Your tasks will be split into "Active tasks" and "Completed tasks". When a task is completed, you can manually check it off your "Active tasks" list, when it will move to the "Completed tasks" and you will gain 1 star as a reward.

## Developer Tools
* Git: https://git-scm.com/downloads
* IDE/Code Editor
    * VSCode, WebStorm, anything else
* Node.js (v22.18.0 LTS)
    * I suggest using Node Version Manager (NVM) to handle different node version/environments
        * Mac/Linux: https://github.com/nvm-sh/nvm
        * Windows Alternative: https://github.com/coreybutler/nvm-windows
* JavaScript/Typescript tools (come automatically with VSCode)
* A broswer
    * Chrome, Edge, Firefox, etc.
### Some Useful VSCode Extensions
* **ESLint** is a great extension to run the current ESLint config while you program. That way you can catch issues before you run git commands.
    * Current ESLint config not published on main branch

## Developing
1. Clone the repo onto your local machine using `git`:
    ```shell
    git clone https://github.com/StuffGames/list-buddy-app.git
    ```
    * or the GitHub CLI:
        ```shell
        gh repo clone StuffGames/list-buddy-app
        ```
    then open the folder in VSCode or use the terminal to move into the listbuddy directory:
    ```shell
    cd list-buddy-app; code .
    ```
2. If using `nvm`, install the current node version:
    ```shell
    nvm install 22.18.0
    ```
    Or just use the version if you already have the correct version installed.
    ```shell
    nvm use 22.18.0
    ```
3. Install all current packages:
    ```shell
    npm install
    ```
To start a local version of the application use the following command:
```shell
npm run dev
```
Then just follow the link to the running url (likely `localhost:3000`)
### Dev Cycle
> NOTE:  
> This project uses Husky hooks to enforce certain rules like branch naming conventions, running linting before committing, commit message conventions, etc.
* When starting new changes, create a new branch with the following structure: `IssueNumber-feature-name`. Ex:
    ```shell
    git checkout -b 39-refactor-old-code
    ```
* Anytime you are ready to commit features to the branch use the following structure: `#IssueNumber: Current change occurring`. Ex:
    ```shell
    git commit "#39: Update file directory structure of front end files"
    ```
* Whenever you commit you can push your changes up to the remote repo (GitHub):
    ```shell
    git push origin 39-refactor-old-code
    ```
* To bring any changes into the main branch, submit any changes from the branch to a pull request so that your branch changes are merging into main: `main <-- 39-refactor-old-code`
* Success.