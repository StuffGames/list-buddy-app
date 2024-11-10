import { Task } from './task-objects';
import {connectToDatabase, addTask, updateTask, getTasks} from '../src/service-crud';
import {createUser, updateUser, getUser} from '../src/service-crud';

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
            // used filter() before this...
            const user = data.users.find(u => u.user_id === params.user_id);

            // verify is user exists
            if (user === undefined) {
                return {message: "User does not exist", status: 400};
            }

            // Add task to user and database
            data.users.filter(u=> u.user_id === params.user_id)[0].tasks.push(
                {
                    user_id: user.user_id,
                    task_id: params.task_id,
                    deadline: params.deadline,
                    name: params.name,
                    category: params.category,
                    description: params.description,
                    priority: params.priority,
                    difficulty: params.difficulty,
                    importance: params.importance,
                    completed: params.completed
                }
            );

            // Write out
            await fs.writeFile(temp_db, JSON.stringify(data));

            return {message: "Wrote to database", status: 200};
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

async function getAllTasks(user_id) {

    const db_response = await connectToDatabase();

    if (db_response.status !== 200) {
        const jsonData = await fs.readFile(temp_db, "utf8");
        const data = JSON.parse(jsonData);
        const user = data.users.filter(u => u.user_id === user_id)[0];

        if (user === undefined) {
            return {message: "User not defined in getting tasks", status: 400};
        }

        return {message: "Success getting tasks", status: 200, tasks: user.tasks};
    }
    else {
        return {message: "success on connecting to database somehow", status: 200};
    }
}

async function taskUpdate(params) {
    const db_response = await connectToDatabase();

    if (db_response.status !== 200) {
        const jsonData = await fs.readFile(temp_db, "utf8");
        const data = JSON.parse(jsonData);
        const user = data.users.find(u => u.user_id === params.user_id);

        // console.log(user.tasks.find(t=>t.task_id == params.task_id));

        if (user === undefined) {
            return {message: "User not defined in getting tasks", status: 400};
        }

        const task = user.tasks.find(t => t.task_id == params.task_id);

        task.description = params.description;
        task.completed = params.completed;

        data.users
        .filter(u=> u.user_id === params.user_id)[0]
        .tasks.filter(t => t.task_id == params.task_id)[0];

        await fs.writeFile(temp_db, JSON.stringify(data));

        return {message: "Success editing task", status: 200};
    }
    else {
        return {message: "success on connecting to database somehow", status: 200};
    }
}

export {login, createTask, getAllTasks, taskUpdate};