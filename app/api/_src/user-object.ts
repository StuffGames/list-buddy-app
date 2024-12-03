import { Task } from './task-objects';

/**
 * Represents a User and contains information such as username, star_count, etc.
 */
class User extends DB_Object{

    // private user_id: number;
    private star_count: number;
    private _username: string;
    private password: string;
    private tasks: number[];
    
    /**
     * Creates a user object from the input object
     * 
     * @param user_object JSON object to get values from
     */
    constructor(user_object: Object);
    
    /**
     * Creates a user object from the inputted variables
     * 
     * @param id Unique id for the user
     * @param star_count The amount of stars the user has
     * @param username The username of the user
     * @param password OPTIONAL (not needed for now)
     * @param tasks List of task_ids
     */
    constructor(id: number, username: string, password?: string, star_count?: number, tasks?: number[]);

    constructor(objectOrId: Object | number, username?: string, password?: string, star_count: number = 0, tasks: number[] = []) {
        super();

        if (typeof objectOrId === 'object') {
            this._id = objectOrId['id'];
            this.star_count = objectOrId['star_count'];
            this._username = objectOrId['username'];
            if (password !== undefined) this.password = objectOrId['password'];
            this.tasks = tasks;
        }
        else {
            this._id = objectOrId;
            this.star_count = star_count;
            this._username = username;
            if (password !== undefined) this.password = password;
            this.tasks = tasks;
        }
    }

    public get id(): number {
        return this._id;
    }

    public get username(): string {
        return this._username;
    }

    public get starCount(): number {
        return this.star_count;
    }

    public set starCount(count: number) {
        this.star_count = count;
    }
    
    public get task_ids(): number[] {
        return this.tasks;
    }
    
    public addTask(task: Task) {
        this.tasks.push(task.id);
    }

    public getId(): number {
        return this._id;
    }

    public toJSON(): Object {
        return {
            _id: this._id,
            username: this.username,
            password: this.password,
            star_count: this.star_count,
            tasks: this.tasks
        };
    }
}

export { User };