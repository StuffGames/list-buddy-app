// crucial imports or something
import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import { User } from './user-object';
import { Task } from './task-objects';
import './db-objects-interface';

// const { MongoClient, ServerApiVersion } = require('mongodb')
// const { User } = require('./user-object');
// const { Task } = require('./task-objects');

// URI to connect to the database, contained within secrets (.env)
const uri = process.env.MONGO_URI;
const db_name = process.env.DB_NAME;
const user_collection_name = process.env.USER_COLLECTION;
const task_collection_name = process.env.TASK_COLLECTION;

/**
 * Indicates a database object that is persistent throughout (only created once).  
 * Also includes database CRUD functions to do cool stuffff....
 */
export class Database {

    /**
     * Represents an instance of the database
     */
    private static _instance: Database;
    
    /**
     * Represents a specific database, whether MongoDB or local .json
     */
    private db: Db;

    /**
     * The MongoClient object from which we can interact with the Mongo Database
     */
    private client: MongoClient;

    /**
     * Private constructor to avoid creation from `new` operator
     */
    private constructor() {
        // Attempt to connect to database, re-attempt, otherwise there was an error, maybe default to local database
        try {
            this.client = new MongoClient(uri, {
                serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
                }
            });
            this.db = this.client.db(db_name);
        }
        catch (error) {
            // Now do temp database?
            console.error("Could get the database from client", error);
        }
    }

    public static get instance(): Database {
        if (!Database.instance) {
            Database._instance = new Database();
        }

        return Database._instance;
    }

    // public get db() {
    //     return this.#db;
    // }

    // Database operations below...
    // TODO: Add collection abstraction for MongoDB Collections
    public async getUser(user_id: string): Promise<User> {
        const userCollection = this.db.collection(user_collection_name);
        const user = await userCollection.findOne({id: user_id});
        console.log(user);
        return new User('0', "");
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
        return new Task('0', '0', "", "", "");
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
    public async closeDB() {
        await this.client.close();
    }
}