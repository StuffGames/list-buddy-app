import { Task } from './task-objects';
import {connectToDatabase, addTask, updateTask, getTasks} from '../src/service-crud';
import {createUser, updateUser, getUser} from '../src/service-crud';
import { randomUUID } from 'crypto';
import { describe } from 'node:test';

const fs = require('fs').promises;
const temp_db = 'app/src/temp_database.json';

async function login(username, password) {

    // Connect, if error or no connection go to file
    const response = await connectToDatabase();

    // If error move onto local database. later check if error is actually problem connecting
    if (response.status !== 200) {
        // File stuff...
        try {
            const jsonData = await fs.readFile(temp_db, "utf8");
            const data = JSON.parse(jsonData);
            const user = data.users.filter(u => u.username === username)[0];
            // console.log(user);
            if (user !== undefined && user.password !== "" && user.password === password) {
                return {message: "Successful sign in", status: 200, user: user};
            }
            else {
                return {message: "Error, wrong password", status: 400};
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
    // Connect, if error or no connection go to file
    const response = await connectToDatabase();

    // If error move onto local database. later check if error is actually problem connecting
    if (response.status !== 200) {
        // File stuff...
        try {
            const jsonData = await fs.readFile(temp_db, "utf8");
            const data = JSON.parse(jsonData);
            const user = data.users.filter(u => u.user_id === params.user_id)[0];

            // verify is user exists
            if (user === undefined) {
                return {message: "User does not exist", status: 400};
            }

            // Add task to user and database
            user.tasks.push(
                {
                    user_id: user.user_id,
                    task_id: params.task_id,
                    deadline: params.deadline,
                    category: params.category,
                    description: params.description,
                    priority: params.priority,
                    difficulty: params.difficulty
                }
            );

            // Write out
            
            return {message: "Error, wrong password", status: 400};
            
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

async function getAllTasks() {
    // const endpoint = '/getTasks';
    // try {
    //     const response = await fetch(url + endpoint, {
    //         method: 'GET'
    //     });
    //     if (!response.ok) {
    //         throw new Error(`Response status: ${response.status} with response: ${response.text()}`);
    //     }
    // } catch (error) {
    //     console.error(error.message);
    // }
    return {};
}

export {login, createTask, getAllTasks};