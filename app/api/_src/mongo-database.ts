// crucial imports or something
import { MongoClient, ServerApiVersion, Db, ObjectId } from 'mongodb';
import { User, UserResponse, UserUpdateBuilder } from './user-object';
import { Task, TaskResponse, TaskUpdateBuilder } from './task-objects';
import { Database } from './db-interfaces';

import {
    DatabaseConnectionError,
    InvalidUserError,
    InvalidTaskError
} from './exceptions';

// URI to connect to the database, contained within secrets (.env)
const uri = process.env.MONGO_URI || "";
const db_name = process.env.DB_NAME || "";

// TODO: TURN THE COLLECTIONS INTO SEPARATE ABSTRACTIONS?
const user_collection_name = process.env.USER_COLLECTION || "";
const task_collection_name = process.env.TASK_COLLECTION || "";

/**
 * MongoDB database that integrates MongoDB Atlas functionality
 */
export class MongoDatabase implements Database {

    /**
     * Represents an instance of the database
     */
    static #instance: Database;
    
    /**
     * Represents a specific database, whether MongoDB or local .json
     */
    private db: Db;

    /**
     * The MongoClient object from which we can interact with the Mongo Database
     */
    private client: MongoClient;

    // TODO: Add collection abstraction for MongoDB Collections maybe?
    private userCollection;
    private taskCollection;

    private connected: boolean = false;

    /**
     * Private constructor to avoid creation from `new` operator
     */
    private constructor() {
        this.connectToDatabase();
    }

    /**
     * Get the current running instance of the Database object
     */
    public static get instance(): Database {
        if (!MongoDatabase.#instance) {
            MongoDatabase.#instance = new MongoDatabase();
        }

        return MongoDatabase.#instance;
    }

    public connectToDatabase(): void {
        try {
            this.client = new MongoClient(uri, {
                serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
                }
            });
            this.db = this.client.db(db_name);
            this.userCollection = this.db.collection(user_collection_name);
            this.taskCollection = this.db.collection(task_collection_name);

            this.connected = true;
        }
        catch (error) {
            console.error("Could get the database from client", error);
            throw new DatabaseConnectionError("Could not Connect to MongoDB database");
        }
    }

    public isConnectedToDb(): boolean {
        return this.connected;
    }

    public async userExists(username: string): Promise<UserResponse> {
        const user = await this.userCollection.findOne({"username": username});
        if (user === null) {
            throw new InvalidUserError(`User "${username}" does not exist`);
        }
        return new UserResponse(200, "Successfully got user", user._id.toString());
    }

    // Database operations below...

    public async getUser(user_id: string): Promise<User> {
        const user = await this.userCollection.findOne({"_id": new ObjectId(user_id)});
        if (user === null) {
            throw new InvalidUserError(`User with ID: '${user_id}', does not exist`);
        }
        
        const userResult = new User(user_id, user.username, user.password, user.star_count, user.tasks.map((t: any) => t.toString()));
        
        // TODO: Consider later use case for this
        // const tasks: Task[] = await this.getTasks(userResult);
        // tasks.forEach(task => userResult.addTask(task));

        return userResult;
    }

    public async addUser(user: User): Promise<UserResponse> {
        const result = await this.userCollection.insertOne(user.toJSON());

        if (result.acknowledged) {
            console.log(result.insertedId);
            return new UserResponse({status: 200, statusText: "Inserted", user_id: result.insertedId.toString()});
        }
        return new UserResponse({status: 400, statusText: "Failed"});
    }

    public async updateUser(user_id: string, update: UserUpdateBuilder): Promise<UserResponse> {
        const result = await this.userCollection.updateOne({"_id": new ObjectId(user_id)}, update.getUpdate());
        if (!result.acknowledged || result.matchedCount === 0 || result.modifiedCount === 0) {
            return new UserResponse({status: 400, statusText: "failure"});
        }
        return new UserResponse({status: 200, statusText: "success", user_id: user_id});
    }
    
    public async getTasks(user: User): Promise<Task[]> {
        const task_ids: ObjectId[] = user.task_ids.map(task_id => new ObjectId(task_id));
        const tasks: Task[] = [];

        // TODO: consider updating the task object array of User?
        const db_tasks = await this.taskCollection.find({"user_id": new ObjectId(user.id)});
        for await (const db_task of db_tasks) {
            if (db_task == null) {
                throw new InvalidTaskError("Task does not exist");
            }
            db_task['_id'] = db_task['_id'].toString();
            db_task['user_id'] = db_task['user_id'].toString();
            tasks.push(new Task(db_task));
        }

        return tasks;
    }

    // TASKS OPERATIONS
    public async getTask(user_id: string, task_id: string | ObjectId): Promise<Task> {
        const task = await this.taskCollection.findOne({"_id": (typeof(task_id) === 'string') ? new ObjectId(task_id) : task_id});

        if (task === null) {
            console.log("Error getting task. ID may be incorrect.");
            throw new InvalidTaskError(`Error getting task. ID: '${task_id}' may be incorrect`);
        }

        return new Task(
            (typeof(task_id) === 'string') ? task_id : task_id.toString(),
            user_id, 
            task.name, task.category, task.description, task.deadline,
            task.priority, task.difficulty, task.importance, task.completed
        );
    }
    
    public async addTask(task: Task): Promise<TaskResponse> {
        const result = await this.taskCollection.insertOne(task.toJSON());
        if (!result.acknowledged) {
            return new TaskResponse({status: 400, statusText: "Failed"});
        }
        // -----------------------------------------------------
        // ADDS TASK TO THE USER AS WELL, consider dropping if we have other code do it instead
        // TODO: Also apparently result.insertedId returns undefined if it is generated by the server??? idk , fix later
        const userResult = await this.updateUser(task.user_id, new UserUpdateBuilder().addTask(result.insertedId.toString()));
        if (userResult.status != 200) {
            return new TaskResponse({
                status: 400,
                statusText: "Error inserting into user"
            });
        }
        // ------------------------------------------------------

        return new TaskResponse({status: 200, statusText: "Inserted", task_id: result.insertedId.toString()});
    }

    // CONSIDERING DROPPING, idk...
    public async addTaskToUser(user_id: string, task: Task): Promise<TaskResponse> {
        if (user_id !== task.user_id) {
            return new TaskResponse({
                status: 400,
                statusText: "The user id for the task and user do not match"
            });
        }

        const userResult = await this.updateUser(user_id, new UserUpdateBuilder().addTask(task.id));
        if (userResult.status != 200) {
            return new TaskResponse({
                status: 400,
                statusText: "Error inserting into user",
                
            });
        }

        return new TaskResponse({status: 200, statusText: "Success"});
    }

    public async updateTask(task_id: string, update: TaskUpdateBuilder): Promise<TaskResponse> {
        const result = await this.taskCollection.updateOne({"_id": new ObjectId(task_id)}, update.getUpdate());
        if (!result.acknowledged || result.matchedCount === 0 || result.modifiedCount === 0) {
            return new TaskResponse({status: 400, statusText: "failure"});
        }
        return new TaskResponse({status: 200, statusText: "success", task_id: task_id});
    }

    // etc...
    public async closeDB() {
        await this.client.close();
    }
}