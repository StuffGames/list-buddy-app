import { randomUUID } from 'crypto';
import { Database } from './db-interfaces';
import { DatabaseConnectionError, InvalidUserError } from './exceptions';
import { Task, TaskResponse } from './task-objects';
import { UserResponse, User } from './user-object';
import { promises } from 'fs';

const fs = promises;
const temp_db_filename = 'app/api/_src/temp_database.json';

class JsonDatabase implements Database {
  // The data in the "database"
  private jsonData: { users: any[], tasks: any[] } = { 'users': [], 'tasks': [] };

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
      const jsonData = await fs.readFile(temp_db_filename, 'utf8');
      const data = JSON.parse(jsonData);
      if (!data) {
        console.error(`Error reading ${temp_db_filename}: No data found`);
        this.connected = false;
        return;
      }
      this.jsonData = data;
      this.connected = true;
    } catch (error) {
      console.error(`Error reading ${temp_db_filename}: ${error}`);
      this.connected = false;
      throw new DatabaseConnectionError('Could not connect to JSON Database');
    }
  }

  isConnectedToDb(): boolean {
    return this.connected;
  }

  // TODO: Change this to something like usernameExists
  //      And then create a new userExists that checks the id
  async userExists(username: string): Promise<UserResponse> {
    // Using type any for right now because we need to reset the database before using the correct types
    const user: any = this.jsonData.users.find((u: User) => u.username === username);
    if (!user) {
      throw new InvalidUserError(`User "${username}" does not exist`);
    }
    return new UserResponse(200, 'OK', user.id);
  }

  async getUser(user_id: string): Promise<User> {
    const user: any = this.jsonData.users.find((user: User) => user.id === user_id);
    if (!user) {
      throw new InvalidUserError(`User with ID: '${user_id}', does not exist`);
    }
    const userResult = new User(user_id, user.username, user.password, user.star_count, user.task_ids);
    return userResult;
  }

  async addUser(user: User): Promise<UserResponse> {
    const userId = randomUUID();
    this.jsonData.users.push({ ...user.toJSON(), id: userId });

    try {
      await fs.writeFile(temp_db_filename, JSON.stringify(this.jsonData));
    }
    catch (error) {
      // TODO: consider updating the User and Task response to take in a "message" property
      //    That way we dont just console.error an error, instead propogate it to front end
      console.error(error);
      return new UserResponse({ status: 400, statusText: `Failed to add user: ${user.username}` });
    }
    return new UserResponse({ status: 200, statusText: 'Inserted', user_id: userId });
  }

  async updateUser(user_id: string, update: any): Promise<UserResponse> {
    const user: any = this.jsonData.users.find((user: User) => user.id === user_id);
    if (!user) {
      return new UserResponse({ status: 400, statusText: `No user with ID: ${user_id} found` });
    }

    const updatedUser = { ...user };
    if (update) {
      Object.keys(update).forEach((key: any) => {
        // TODO: Maybe add a check to make sure stuff like id doesn't get changed?
        if (user[key]) {
          updatedUser[key] = update[key];
        }
      });
    }

    const userIndex: number = this.jsonData.users.findIndex((user: User) => user.id === user_id);
    this.jsonData.users[userIndex] = updatedUser;

    try {
      await fs.writeFile(temp_db_filename, JSON.stringify(this.jsonData));
    }
    catch (error: any) {
      console.error(error);
      return new UserResponse({ status: 500, statusText: `Error writing to database while updating user: ${user_id}` });
    }    

    return new UserResponse({ status: 200, statusText: 'User updated successfully', user_id: updatedUser.id });
  }

  async getTasks(user: User): Promise<Task[]> {
    const user_id = user.id;
    const dbUser: any = this.jsonData.users.find((user: User) => user.id === user_id);
    if (!dbUser) {
      return [];
    }
    // Currently using this for backwards compatability with the way old tasks worked.
    // TODO: Deprecate this one we have the JSON schema fully fleshed out
    if (dbUser.tasks) {
      return dbUser.tasks;
    }
    const tasks = this.jsonData.tasks.filter((task: Task) => task.user_id === user.id);
    // TODO: Map all tasks to task objects when returning
    // return tasks.map((task: any) => new Task(task));
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
    const user: User = this.jsonData.users.find((user: User) => user.id === task.user_id);
    if (!user) {
      return new TaskResponse(400, `Could not find user for task with id: ${task.user_id}`, task.id);
    }

    // Replace user in the list with one that has newly added task
    const userIndex = this.jsonData.users.indexOf(user);
    
    // Create a random taskId
    const taskId = randomUUID();
    user.task_ids.push(taskId);
    this.jsonData.users[userIndex] = user;
    
    // Adding id to newly inserted task.
    // id is protected, so we cannot edit directly.
    // luckily this task only exists as type Task until we write it out as JSON
    this.jsonData.tasks.push({ ...task.toJSON(), id: taskId });
    try {
      await fs.writeFile(temp_db_filename, JSON.stringify(this.jsonData));
    }
    catch (error) {
      console.error(error);
      return new TaskResponse({ status: 400, statusText: `Failed to add task: ${task.name}` });
    }
    return new TaskResponse({ status: 200, statusText: 'Inserted', task_id: taskId });
  }

  // TODO: find a way to generalize this update builder. maybe we just input an update that is of type Task or something
  //      that we don't have to ignore the UpdateBuilder
  async updateTask(task_id: string, update: any): Promise<TaskResponse> {
    const task: any = this.jsonData.tasks.find((task: Task) => task.id === task_id);
    if (!task) {
      return new TaskResponse({ status: 400, statusText: `No task with ID: ${task_id} found` });
    }

    const updatedTask = task;
    if (update) {
      Object.keys(update).forEach((key: any) => {
        // TODO: Maybe add a check to make sure stuff like id doesn't get changed?
        if (task[key]) {
          updatedTask[key] = update[key];
        }
      });
    }

    const taskIndex: number = this.jsonData.tasks.findIndex(task);
    this.jsonData.tasks[taskIndex] = updatedTask;

    try {
      await fs.writeFile(temp_db_filename, JSON.stringify(this.jsonData));
    }
    catch (error: any) {
      console.error(error);
      return new TaskResponse({ status: 500, statusText: `Error writing to database while updating Task: ${task_id}` });
    }
    
    return new TaskResponse({ status: 200, statusText: 'Task updated successfully', task_id: updatedTask.id });
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
      console.error('Error closing out JSON database', error);
    }
  }
}

export { JsonDatabase };
