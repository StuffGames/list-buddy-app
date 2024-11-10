import { Task } from './task-objects';
import {connectToDatabase, addTask, updateTask, getTasks} from '../src/service-crud';
import {createUser, updateUser, getUser} from '../src/service-crud';

const fs = require('fs');
const temp_db = './temp_databse.json';

async function login(username, password) {

    // Connect, if error or no connection go to file
    const response = await connectToDatabase();

    // If error move onto local database. later check if error is actually problem connecting
    if (response.status !== 200) {
        // File stuff...
        try {
            const jsonData = await fs.readFile(temp_db, "utf8");
            const data = JSON.parse(jsonData);
            const user = data.users.filter(u => u.username === username);
            if (user.password !== "" && user.password === password) {
                return {message: "Successful sign in", status: 200, user: user}
            }
            else {
                return {message: "Error, wrong password", status: 400}
            }
        } catch (error) {
            console.error(`Error reading ${temp_db}: ${error}`);
            return {message: "error reading temp db", status: 400};
        }
    }
    else {
        // else connected to database
        return {message: "Connected to database", status: 200};
    }
}

async function createTask(params) {
    const endpoint = '/createTask';
    try {
        const response = await fetch(url+endpoint, {
            method: 'POST',
            body: JSON.stringify({username: username, password: password})
        });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status} with response: ${response.text()}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

async function getTasks() {
    const endpoint = '/getTasks';
    try {
        const response = await fetch(url + endpoint, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status} with response: ${response.text()}`);
        }
    } catch (error) {
        console.error(error.message);
    }
}

export {login, createTask, getTasks};