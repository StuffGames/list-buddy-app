import { ObjectId } from 'mongodb';
import { DB_Object, DB_UpdateBuilder } from './db-interfaces';

class Subtask {
    Subtask(subtask_id: number, content: string) {
        let _subtask_id = subtask_id;
        let _content = content;
    }
}


/**
 * Represents a task that a user has
 */
export class Task extends DB_Object {

    private _user_id: string;
    private _name: string;
    private _deadline: Date;
    private _category: string;
    private _priority: number;
    private _difficulty: number;
    private _importance: number;
    private completed: boolean;
    
    public description: string;

    /**
     * Creates a Task based on input object
     * @param task_object JSON object to get values from 
     */
    constructor(task_object: object);

    /**
     * Creates a Task from the inputted variables
     * 
     * @param user_id ID of the user this task belongs to
     * @param task_id ID of the Task in the database
     * @param name Name of the task
     * @param category Category of the task
     * @param description Description of the task
     * @param deadline Date which the task is due
     * @param priority Priority value of the task
     * @param difficulty Difficulty value of the task
     * @param importance Importance value of the task
     * @param completed Has the Task been completed yet
     */
    constructor(task_id: string, user_id: string, name: string, category: string, description: string, 
        deadline?: Date, priority?: number, difficulty?: number, importance?: number, completed?: boolean);
        
    constructor(objectOrId: object | string, user_id?: string, name?: string, category?: string, description?: string, 
        deadline: Date = new Date(Date.now()), priority:number = 0, difficulty: number = 0,
        importance: number = 0, completed: boolean = false) {
            super();
            
            if (typeof objectOrId === "object") {
                this._id = objectOrId['_id'];
                this._user_id = objectOrId['user_id'];
                this._name = objectOrId['name'];
                this._deadline = objectOrId['deadline'];
                this._category = objectOrId['category'];
                this.description = objectOrId['description'];
                this._priority = objectOrId['priority'];
                this._difficulty = objectOrId['difficulty'];
                this._importance = objectOrId['importance'];
                this.completed = objectOrId['completed'];
            }
            else {
                if (objectOrId !== "") this._id = objectOrId;
                this._user_id = user_id;
                this._name = name;
                this._deadline = deadline;
                this._category = category;
                this.description = description;
                this._priority = priority;
                this._difficulty = difficulty;
                this._importance = importance;
                this.completed = completed;
            }
    }

    public get id(): string {
        return this._id;
    }

    public get user_id(): string {
        return this._user_id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get deadline(): Date {
        return this._deadline;
    }

    public get category(): string {
        return this._category;
    }

    public get priority(): number {
        return this._priority;
    }
    
    public get difficulty(): number {
        return this._difficulty;
    }

    public get importance(): number {
        return this._importance;
    }

    public get isComplete(): boolean {
        return this.completed;
    }

    public set isComplete(completed: boolean) {
        this.completed = completed;
    }

    /**
     * Switches completed flag to opposite value.  
     * If completed is true, then it gets switched to false.  
     * If completed is false, then it gets switched to true;
     */
    public switchComplete() {
        this.completed = !this.completed;
    }

    public getId(): string {
        return this._id;
    }

    public toJSON(): Object {
        const result = {
            user_id: new ObjectId(this._user_id),
            name: this._name,
            deadline: this._deadline,
            category: this._category,
            description: this.description,
            priority: this._priority,
            difficulty: this._difficulty,
            importance: this._importance,
            completed: this.completed
        };
        
        if (this.id !== undefined) {
            result['_id'] = this.id;
        }

        return result;
    }
}

export class TaskResponse {
    private _status: number;
    private _statusText: string;
    private _task_id: string;

    constructor(params: object);
    constructor(status: number, statusText: string, task_id: string);
    constructor(paramOrStatus: object | number, statusText?: string, task_id?: string) {
        if (typeof(paramOrStatus) == 'object') {
            this._status = paramOrStatus['status'];
            this._statusText = paramOrStatus['statusText'];
            this._task_id = paramOrStatus['task_id'];
        }
        else{
            this._status = paramOrStatus;
            this._statusText = statusText;
            this._task_id = task_id;
        }
    }

    public get status(){
        return this._status;
    }
    public get statusText(){
        return this._statusText;
    }
    public get task_id(){
        return this._task_id;
    }
}

export class TaskUpdateBuilder extends DB_UpdateBuilder {
    constructor() {
        super();
    }

    public setName(newName: string): TaskUpdateBuilder {
        this.$set("name", newName);
        return this;
    }

    public setDeadline(newDeadline: Date): TaskUpdateBuilder {
        this.$set("deadline", newDeadline);
        return this;
    }

    public setCompleted(completed: boolean): TaskUpdateBuilder {
        this.$set("completed", completed);
        return this;
    }

    public setDescription(description: string): TaskUpdateBuilder {
        this.$set("description", description);
        return this;
    }

    public setPriority(priority: number): TaskUpdateBuilder {
        this.$set("priority", priority);
        return this;
    }

    public setDifficulty(difficulty: number): TaskUpdateBuilder {
        this.$set("difficulty", difficulty);
        return this;
    }

    public setImportance(importanceScore: number): TaskUpdateBuilder {
        this.$set("importance", importanceScore);
        return this;
    }
}