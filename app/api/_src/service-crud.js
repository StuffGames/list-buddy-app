import { Task } from "./task-objects";

async function connectToDatabase() {
    // Currently not connected to MongoDB
    if (true) {
        return {message: "Not Connected", status: 400};
    }
    return {message: "Connected", status: 200};
}

async function getUser(user_id) {
    //;
    return {message: "User", status: 200};
}

async function addUser(user_id, credentials) {
    return {};
}

async function updateUser(user_id, data) {
    return {};
}

async function updateTask(task) {
    return {};
}

async function getTasks(user_id) {
    // Check if user exists

    // Try to get data (fetch)

    // return json data

    return {};
}

async function addTask(task_id, user_id, task) {
    //;
}

export {
    connectToDatabase,
    getTasks, addTask, updateTask,
    getUser, addUser, updateUser
};