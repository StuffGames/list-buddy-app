// crucial imports or something

import { User } from './user-object';
import { Task } from './task-objects';
import './db-objects-interface';

/**
 * Indicates a database object that is persistent throughout (only created once).  
 * Also includes database CRUD functions to do cool stuffff....
 */
class Database {

    /**
     * Represents an instance of the database
     */
    static #instance: Database;
    
    /**
     * Represents a specific database, whether MongoDB or local .json
     */
    #db: Object; 

    /**
     * Private constructor to avoid creation from `new` operator
     */
    private constructor() {
        // Attempt to connect to database, re-attempt, otherwise there was an error, maybe default to local database
        
    }

    public static get instance(): Database {
        if (!Database.#instance) {
            Database.#instance = new Database();
        }

        return Database.#instance;
    }

    // public get db() {
    //     return this.#db;
    // }

    // Database operations below...
    public async getUser(user_id: number): Promise<User> {
        return new User(0, "");
    }

    public async addUser(user: User): Promise<Response> {
        return new Response();
    }

    public async updateUser(user_id: number, data: Object): Promise<Response> {
        return new Response;
    }

    public async getTasks(user: User): Promise<Response> {
        return new Response();
    }
    public async getTask(user_id: number, task_id: number): Promise<Task> {
        return new Task(0, 0, "", "", "");
    }

    public async addTask(task: Task): Promise<Response> {
        //;
        return new Response();
    }

    public async updateTask(task_id: number, data: Object): Promise<Response> {
        //;
        return new Response();
    }

    // etc...
}

export { Database };