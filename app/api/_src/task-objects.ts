
class Subtask {
    Subtask(subtask_id: number, content: string) {
        let _subtask_id = subtask_id;
        let _content = content;
    }
}


/**
 * Represents a task that a user has
 */
class Task extends DB_Object {

    private user_id: string;
    private _name: string;
    private _deadline: Date;
    private _category: string;
    private _priority: number;
    private _difficulty: number;
    private _importance: number;
    private completed: boolean;
    
    public description: string;

    constructor(task_object: Object);
    constructor(user_id: string, task_id: string, name: string, category: string, description: string, 
        deadline?: Date, priority?: number, difficulty?: number, importance?: number, completed?: boolean);
        
    constructor(objectOrId: Object | string, task_id?: string, name?: string, category?: string, description?: string, 
        deadline: Date = new Date(Date.now()), priority:number = 0, difficulty: number = 0,
        importance: number = 0, completed: boolean = false) {
            super();
            
            if (typeof objectOrId === "object") {
                this.user_id = objectOrId['user_id'];
                this._id = objectOrId['_id'];
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
                this.user_id = objectOrId;
                this._id = task_id;
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
        return {
            _id: this._id,
            user_id: this.user_id,
            deadline: this._deadline,
            category: this._category,
            description: this.description,
            priority: this._priority,
            difficulty: this._difficulty,
            importance: this._importance
        };
    }
}

export {Task};