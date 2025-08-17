import { ObjectId } from 'mongodb';
import { DB_Object, DB_UpdateBuilder } from './db-interfaces';
import { Task } from './task-objects';

/**
 * Represents a User and contains information such as username, star_count, etc.
 */
export class User extends DB_Object{

  private star_count: number;
  private _username: string;
  private password: string;

  // TODO: change this to be a Task id array (rename to task_ids) and maybe add a new field that is just a Task array (named tasks)
  private _task_ids: string[];

//   private _tasks: Task[];
    
  /**
     * Creates a user object from the input object
     * 
     * @param user_object JSON object to get values from
     */
  constructor(user_object: any);
    
  /**
     * Creates a user object from the inputted variables
     * 
     * @param id Unique id for the user
     * @param star_count The amount of stars the user has
     * @param username The username of the user
     * @param password OPTIONAL (not needed for now)
     * @param tasks List of task_ids
     */
  constructor(id: string, username: string, password: string, star_count?: number, tasks?: string[]);

  constructor(objectOrId: any | string, username: string, password: string, star_count: number = 0, tasks: string[] = []) {
    super();

    if (typeof objectOrId === 'object') {
      this._id = objectOrId.id;
      this.star_count = objectOrId.star_count;
      this._username = objectOrId.username;
      if (password !== undefined) this.password = objectOrId.password;
      this._task_ids = tasks;
    }
    else {
      if (objectOrId !== '') this._id = objectOrId;
      this.star_count = star_count;
      this._username = username;
      if (password !== undefined) this.password = password;
      this._task_ids = tasks;
    }
  }

  public get id(): string {
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
    
  public get task_ids(): string[] {
    return this._task_ids;
  }
    
  public addTask(task: Task) {
    this._task_ids.push(task.id);
  }

  public getId(): string {
    return this._id;
  }

  public checkUserAndPass(username: string, password: string): boolean {
    return this._username === username && this.password == password;
  }

  public toJSON(): object {

    const result = {
      id: '',
      username: this.username,
      password: this.password,
      star_count: this.star_count,
      tasks: this._task_ids
    };

    if(this._id !== undefined) {
      result.id = this._id;
    }

    return result;
  }
}

export class UserResponse {
  private _status: number;
  private _statusText: string;
  private _user_id: string;

  constructor(params: any);
  constructor(status: number, statusText: string, user_id: string);
  constructor(paramOrStatus: any | number, statusText?: string, user_id?: string) {
    if (typeof(paramOrStatus) == 'object') {
      this._status = paramOrStatus.status;
      this._statusText = paramOrStatus.statusText;
      this._user_id = paramOrStatus.user_id;
    }
    else{
      this._status = paramOrStatus;
      this._statusText = statusText || '';
      this._user_id = user_id || '';
    }
  }
  public get status(){
    return this._status;
  }
  public get statusText(){
    return this._statusText;
  }
  public get user_id(){
    return this._user_id;
  }
}

// TODO: possible make this either interface or abstract class and have it be inherited by something like UserUpdateBuilderMongoDB or something idk
export class UserUpdateBuilder extends DB_UpdateBuilder {
  constructor() {
    super();
  }

  public incrementStarCount(amount: number): UserUpdateBuilder {
    this.$inc('star_count', amount);
    return this;
  }

  public setStarCount(amount: number): UserUpdateBuilder {
    this.$set('star_count', amount);
    return this;
  }

  public setUsername(newUsername: string): UserUpdateBuilder {
    this.$set('username', newUsername);
    return this;
  }

  public setPassword(newPassword: string): UserUpdateBuilder {
    this.$set('password', newPassword);
    return this;
  }

  public addTask(newTaskId: string): UserUpdateBuilder {
    this.$push('tasks', new ObjectId(newTaskId));
    return this;
  }
}