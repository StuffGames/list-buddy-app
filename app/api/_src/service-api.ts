import { Database } from "./db-interfaces";
import { MongoDatabase } from "./mongo-database";
import type { User } from "./user-object";
import { Task, TaskUpdateBuilder } from "../_src/task-objects";

export interface ApiResponse {
    status: number;
    statusText: string;
    message?: string;
    user?: User | {};
    task?: Task | {};
    tasks?: Task[] | {};
    optional?: any;
}

// TODO: TEST THIS
export async function login(username: string, password: string): Promise<ApiResponse> {
    // Connect to database
    try {
        const db: Database = MongoDatabase.instance;
        if (!db.isConnectedToDb()) {
            return {
                status: 400,
                statusText: "Unable to connect to database",
                message: "Connection was not made to the database"
            };
        }

        const userExists = await db.userExists(username);
        if (userExists.status == 400){
            return {
                status: 400,
                statusText: "User doesn't exist",
                message: "User with that username was not found"
            };
        }
        
        const user = await db.getUser(userExists.user_id);

        if(!user.checkUserAndPass(username, password)) {
            return {
                status: 400,
                statusText: "Wrong username or password",
                message: "Invalid username or password"
            };
        }

        return {
            status: 200,
            statusText: "Successful Login",
            user: user
        };
    }
    catch(err) {
        // This is where all the errors are caught....
        return {
            status: 400,
            statusText: err.name,
            message: err.message
        };
    }
}

export async function createTask(params: {}): Promise<ApiResponse> {
    // Connect to database
    try {
        const db: Database = MongoDatabase.instance;

        if (!db.isConnectedToDb()) {
            return {
                status: 400,
                statusText: "Unable to connect to database",
                message: "Connection was not made to the database"
            };
        }

        // TODO: maybe bring the updating of user out here? idk lol
        const taskResponse = await db.addTask(new Task(params));

        if (taskResponse.status !== 200) {
            return {
                status: 400,
                statusText: taskResponse.statusText,
                message: `There was a problem inserting Task '${params['name']}' into user with id ${params['user_id']}`
            };
        }

        return {
            status: 200,
            statusText: "Successfully created task"
        };
    }
    catch (err) {
        return {
            status: 400,
            statusText: err.name,
            message: err.message
        };
    }
}

export async function getAllTasks(user_id: string): Promise<ApiResponse> {
    // connect to database
    try {
        const db: Database = MongoDatabase.instance;
        
        if (!db.isConnectedToDb()) {
            return {
                status: 400,
                statusText: "Unable to connect to database",
                message: "Connection was not made to the database"
            };
        }
        const user: User = await db.getUser(user_id);
        const tasks: Task[] = await db.getTasks(user);

        return {
            status: 200,
            statusText: "Successfully got all tasks",
            tasks: tasks
        };
    }
    catch (err) {
        return {
            status: 400,
            statusText: err.name,
            message: err.message
        };
    }
}

export async function taskUpdate(params: {}): Promise<ApiResponse> {
    // connect to database
    try{
        const db: Database = MongoDatabase.instance;

        if (!db.isConnectedToDb()) {
            return {
                status: 400,
                statusText: "Unable to connect to database",
                message: "Connection was not made to the database"
            };
        }
        /*
        Response:
            user_id,
            task_id,
            description,
            completed
        */

        // TODO: Fix this so that the task builder is built based on whatever fields available in params variable
        // Currently just works based on input from 'api/openai/importance'
        const taskResponse = await db.updateTask(
            params['task_id'],
            new TaskUpdateBuilder().setDescription(params['description']).setCompleted(params['completed'])
        );

        if (taskResponse.status !== 200) {
            return {
                status: 400,
                statusText: "Failed to update task",
                message: `There was an error updating task with id '${params['task_id']}'`
            };
        }

        return {
            status: 200,
            statusText: "Successfully updated task"
        };
    }
    catch (err) {
        return {
            status: 400,
            statusText: err.name,
            message: err.message
        };
    }
}