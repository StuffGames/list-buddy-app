import type { User, UserResponse, UserUpdateBuilder } from './user-object';
import type { Task, TaskResponse, TaskUpdateBuilder } from './task-objects';
import type {
    DatabaseConnectionError,
    InvalidUserError,
    InvalidTaskError
} from './exceptions';

/**
 * Database Interface for interaction between different kinds of databases.  
 * Indicates a database object that is persistent throughout (only created once).  
 * Also includes database CRUD functions to do cool stuffff....
 * 
 * IMPORTANT: Make sure to `closeDB()` the database when finished with it.
 */
export interface Database {

    /**
     * Connects to database if needed
     * 
     * @throws {DatabaseConnectionError}
     */
    connectToDatabase(): void;

    /**
     * Returns true if the database is connected
     */
    isConnectedToDb(): boolean;

    /**
     * Checks if the user with specified username exists in the database
     * @param username The username to check
     * 
     * @throws {InvalidUserError}
     */
    userExists(username: string): Promise<UserResponse>;

    // taskExists(): Promise<boolean>;

    /**
     * Gets a User object that represents a user in the database
     * @param user_id The ObjectId of the user we want
     * @returns User object containing all data from the database
     * 
     * @throws {InvalidUserError}
     */
    getUser(user_id: string): Promise<User>;

    /**
     * Adds the User object into the database
     * @param user User object containing data to insert into the database
     * @returns Response indicating if operation was successful
     */
    addUser(user: User): Promise<UserResponse>;

    /**
     * Updates user in the database with new data from the update builder
     * 
     * @param user_id The ObjectId that corresponds to the user in the collection
     * @param update An update builder that is constructed with fields that are to be updated
     * @returns UserResponse indicating success (200) or failure (something else)
     */
    updateUser(user_id: string, update: UserUpdateBuilder): Promise<UserResponse>;

    /**
     * Get a list of tasks (as Task objects) from a specific user
     * 
     * @param user User to get tasks from
     * @returns List of Tasks from specified user as Task objects
     * 
     * @throws {InvalidTaskError}
     */
    getTasks(user: User): Promise<Task[]>;

    /**
     * Gets a Task from the database
     * 
     * @param user_id ID of the user that the has the task
     * @param task_id ID of the task to retrieve
     * @returns Task object representing task from database, null if unsuccessful
     * 
     * @throws {InvalidTaskError}
     */
    getTask(user_id: string, task_id: string): Promise<Task>;

    /**
     * Adds a new Task to the database
     * @param task Task object that contains all necessary task data
     * @returns TaskResponse indicating success(200) or failure(400)
     */
    addTask(task: Task): Promise<TaskResponse>;

    /**
     * Updates task in the database with new data from the update builder
     * @param task_id ID of the task to update
     * @param update An update builder with constructed fields to update
     * @returns TaskResponse indicating success (200) or failure (400)
     */
    updateTask(task_id: string, update: TaskUpdateBuilder): Promise<TaskResponse>;

    closeDB(): void;
}

/**
 * Represents an Object that is transformed from data in a specific Database
 */
interface IDB_Object {
    // id: Number;

    /**
     * Returns the unique ID of this object
     */
    getId(): Number;
    
    // fromJSON(obj: Object);

    /**
     * Returns this object as a JSON object that is correct to its database representation
     */
    toJSON(): Object;
}

/**
 * Represents an Object that is transformed from data in a specific Database
 */
export abstract class DB_Object {
    // TODO: change this to be an ObjectID() from mongodb, that way we dont have to keep creating new ones
    //       also think about maybe being able to change the id??? not sure...
    protected _id: string;

    /**
     * Returns the unique ID of this object
     */
    abstract get id(): string;
    
    // fromJSON(obj: Object);

    /**
     * Returns this object as a JSON object that is correct to its database representation
     */
    abstract toJSON(): Object;
}

// FOR LATER TO ENCAPSULATE A LOT OF RESPONSE CODE
abstract class DB_Object_Resposne {
    constructor(){}
}

/**
 * Builder class that creates a MongoDB operator query thing for CRUD operations.  
 * This allows for an easy to use interface that supports chaining too create the desired change for a document in the database.
 * 
 * WARNING: Do not chain the same function more than once! At the moment I don't have a way to prevent this
 * but it is important to not do that as it could mess up your update and what you actually want to change.
 */
export abstract class DB_UpdateBuilder {
    protected updateQuery: {};
    constructor() {
        this.updateQuery = {};
    }

    private createOperator(operator: string, field: string, value: string | number | object) {
        if (this.updateQuery[operator] === undefined) {
            this.updateQuery[operator] = {};
        }
        this.updateQuery[operator][field] = value;
    }

    protected $set(field: string, value: string | number | any) {
        this.createOperator("$set", field, value);
    }

    protected $inc(field: string, value: number) {
        this.createOperator("$inc", field, value);
    }

    protected $push(field: string, value: string | object) {
        this.createOperator("$push", field, value);
    }

    protected $pull(field: string, value: string | object) {
        this.createOperator("$pull", field, value);
    }

    public clear() {
        this.updateQuery = {};
    }

    public getUpdate(): object {
        const query = this.updateQuery;
        this.clear();
        return query;
    }
}