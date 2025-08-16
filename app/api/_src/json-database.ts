import { randomUUID } from "crypto";
import { Database } from "./db-interfaces";
import { DatabaseConnectionError, InvalidUserError } from "./exceptions";
import { Task, TaskResponse, TaskUpdateBuilder } from "./task-objects";
import { UserResponse, User, UserUpdateBuilder } from "./user-object";

const fs = require('fs').promises;
const temp_db_filename = 'app/api/_src/temp_database.json';

class JsonDatabase implements Database {
    // The data in the "database"
    private jsonData: { users: any[], tasks: any[] } = {"users": [], "tasks": []};

    public connected: boolean = false;

    static #instance: Database;

    /**
     * Get the current running instance of the Database object
     */
    public static get instance(): Database {
        if (!JsonDatabase.#instance) {
            JsonDatabase.#instance = new JsonDatabase();
        }

        return JsonDatabase.#instance;
    }

    private constructor() {
        this.connectToDatabase();
    }

    async connectToDatabase(): Promise<void> {
        try {
            const jsonData = await fs.readFile(temp_db_filename, "utf8");
            const data = JSON.parse(jsonData);
            if (!data) {
                console.error(`Error reading ${temp_db_filename}: No data found`)
                this.connected = false;
                return;
            }
            this.jsonData = data;
            this.connected = true;
        } catch (error) {
            console.error(`Error reading ${temp_db_filename}: ${error}`);
            this.connected = false;
            throw new DatabaseConnectionError("Could not connect to JSON Database");
        }
    }
    isConnectedToDb(): boolean {
        return this.connected;
    }
    async userExists(username: string): Promise<UserResponse> {
        // Using type any for right now because we need to reset the database before using the correct types
        const user: any = this.jsonData.users.filter((u: any) => u.username === username)[0];
        if (user === null) {
            throw new InvalidUserError(`User "${username}" does not exist`);
        }
        return new UserResponse(200, 'OK', user.id);
    }
    async getUser(user_id: string): Promise<User> {
        const user: any = this.jsonData.users.filter((user: any) => user.id === user_id)[0];
        if (user === null) {
            throw new InvalidUserError(`User with ID: '${user_id}', does not exist`);
        }
        const userResult = new User(user_id, user.username, user.password, user.star_count, user.tasks.map((t: any) => t.toString()));
        return userResult;
    }
    async addUser(user: User): Promise<UserResponse> {
        this.jsonData.users.push(user);
        try {
            await fs.writeFile(temp_db_filename, JSON.stringify(this.jsonData))
        }
        catch (error) {
            return new UserResponse({status: 400, statusText: `Failed to add user: ${user.username}`});
        }
        return new UserResponse({status: 200, statusText: "Inserted", user_id: randomUUID().toString()});
    }
    async updateUser(user_id: string, update: UserUpdateBuilder): Promise<UserResponse> {
        const user = this.jsonData.users.find((user: any) => user.id === user_id);
        if (!user) {
            return new UserResponse({status: 400, statusText: `No user with ID: ${user_id} found`});
        }
        // Figure out what to do with the UserUpdateBuilder
        // user = update
        // return new UserResponse({status: 200, statusText: "success", user_id: user_id});
        return new UserResponse({status: 400, statusText: `User update not implemented yet`});
    }
    async getTasks(user: User): Promise<Task[]> {
        const user_id = user.id;
        const dbUser = this.jsonData.users.find((u: any) => (u.id) === user_id);
        if (!dbUser) {
            return [];
        }
        if (dbUser.tasks) {
            return dbUser.tasks;
        }
        const tasks = this.jsonData.tasks.filter((task: any) => task.user_id === user.id);
        return tasks;
    }
    async getTask(user_id: string, task_id: string): Promise<Task> {
        const tasks = this.jsonData.tasks;

        const task = tasks.find((task: Task) => {
            return (task.user_id === user_id) && (task.id === task_id);
        });

        if (!task) {
            console.error(`Task with id: ${task} not found`);
        }
        return task;
    }
    async addTask(task: Task): Promise<TaskResponse> {
        const user: User = this.jsonData.users.find((user: any) => user.id === task.user_id);
        if (!user) {
            return new TaskResponse(400, `Could not find user for task with id: ${task.user_id}`, task.id)
        }

        // Replace user in the list with one that has newly added task
        const userIndex = this.jsonData.users.indexOf(user);
        user.task_ids.push(task.id);
        this.jsonData.users[userIndex] = user;
        this.jsonData.tasks.push(task);
        try {
            await fs.writeFile(temp_db_filename, JSON.stringify(this.jsonData))
        }
        catch (error) {
            return new TaskResponse({status: 400, statusText: `Failed to add task: ${task.name}`});
        }
        return new TaskResponse({status: 200, statusText: "Inserted", task_id: randomUUID().toString()});
    }
    async updateTask(task_id: string, update: TaskUpdateBuilder): Promise<TaskResponse> {
        // const result = await this.userCollection.updateOne({"_id": new ObjectId(user_id)}, update.getUpdate());
        const user = this.jsonData.tasks.find((task: Task) => task.id === task_id );
        if (!user) {
            return new TaskResponse({status: 400, statusText: `No task with ID: ${task_id} found`});
        }
        // Figure out what to do with the UserUpdateBuilder
        // user = update
        // return new UserResponse({status: 200, statusText: "success", user_id: user_id});
        return new TaskResponse({status: 400, statusText: `Task update not implemented yet`});
    }
    closeDB(): void {
        try {
            fs.writeFile(temp_db_filename, JSON.stringify(this.jsonData));
            this.jsonData = {
                users: [],
                tasks: []
            };
        }
        catch (error) {
            console.error(`Error closing out JSON database`, error);
        }
    }
}

export { JsonDatabase };

// TODO: figure out if we need to anything from below

// async function createTask(params) {
//     // Connect, if error or no connection go to file
//     const response = await connectToDatabase();

//     // If error move onto local database. later check if error is actually problem connecting
//     if (response.status !== 200) {
//         // File stuff...
//         try {
//             const jsonData = await fs.readFile(temp_db, "utf8");
//             const data = JSON.parse(jsonData);
//             // used filter() before this...
//             const user = data.users.find(u => u.user_id === params.user_id);

//             // verify is user exists
//             if (user === undefined) {
//                 return {message: "User does not exist", status: 400};
//             }

//             // Add task to user and database
//             data.users.filter(u=> u.user_id === params.user_id)[0].tasks.push(
//                 {
//                     user_id: user.user_id,
//                     task_id: params.task_id,
//                     deadline: params.deadline,
//                     name: params.name,
//                     category: params.category,
//                     description: params.description,
//                     priority: params.priority,
//                     difficulty: params.difficulty,
//                     importance: params.importance,
//                     completed: params.completed
//                 }
//             );

//             // Write out
//             await fs.writeFile(temp_db, JSON.stringify(data));

//             return {message: "Wrote to database", status: 200};
//         } catch (error) {
//             console.error(`Error reading ${temp_db}: ${error}`);
//             return {message: "error reading temp db", status: 400};
//         }
//     }
//     else {
//         // else connected to database
//         return {message: "Connected to database", status: 200};
//     }
// }

// async function getAllTasks(user_id) {

//     const db_response = await connectToDatabase();

//     if (db_response.status !== 200) {
//         const jsonData = await fs.readFile(temp_db, "utf8");
//         const data = JSON.parse(jsonData);
//         const user = data.users.filter(u => u.user_id === user_id)[0];

//         if (user === undefined) {
//             return {message: "User not defined in getting tasks", status: 400};
//         }

//         return {message: "Success getting tasks", status: 200, tasks: user.tasks};
//     }
//     else {
//         return {message: "success on connecting to database somehow", status: 200};
//     }
// }

// async function taskUpdate(params) {
//     const db_response = await connectToDatabase();

//     if (db_response.status !== 200) {
//         const jsonData = await fs.readFile(temp_db, "utf8");
//         const data = JSON.parse(jsonData);
//         const user = data.users.find(u => u.user_id === params.user_id);

//         // console.log(user.tasks.find(t=>t.task_id == params.task_id));

//         if (user === undefined) {
//             return {message: "User not defined in getting tasks", status: 400};
//         }

//         const task = user.tasks.find(t => t.task_id == params.task_id);

//         task.description = params.description;
//         task.completed = params.completed;

//         data.users
//         .filter(u=> u.user_id === params.user_id)[0]
//         .tasks.filter(t => t.task_id == params.task_id)[0];

//         await fs.writeFile(temp_db, JSON.stringify(data));

//         return {message: "Success editing task", status: 200};
//     }
//     else {
//         return {message: "success on connecting to database somehow", status: 200};
//     }
// }
