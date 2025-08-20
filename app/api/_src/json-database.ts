import { randomUUID } from 'crypto';
import { Database } from './db-interfaces';
import { DatabaseConnectionError, InvalidUserError } from './exceptions';
import { Task, TaskResponse, TaskUpdateBuilder } from './task-objects';
import { UserResponse, User, UserUpdateBuilder } from './user-object';
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
    const user: any = this.jsonData.users.find((u: any) => u.username === username);
    if (!user) {
      throw new InvalidUserError(`User "${username}" does not exist`);
    }
    return new UserResponse(200, 'OK', user.id);
  }

  async getUser(user_id: string): Promise<User> {
    const user: any = this.jsonData.users.find((user: any) => user.id === user_id);
    if (!user) {
      throw new InvalidUserError(`User with ID: '${user_id}', does not exist`);
    }
    const userResult = new User(user_id, user.username, user.password, user.star_count, user.task_ids);
    return userResult;
  }

  async addUser(user: User): Promise<UserResponse> {
    this.jsonData.users.push(user.toJSON());
    try {
      await fs.writeFile(temp_db_filename, JSON.stringify(this.jsonData));
    }
    catch (error) {
      return new UserResponse({ status: 400, statusText: `Failed to add user: ${user.username}` });
    }
    return new UserResponse({ status: 200, statusText: 'Inserted', user_id: randomUUID() });
  }

  async updateUser(user_id: string, update: UserUpdateBuilder): Promise<UserResponse> {
    const user = this.jsonData.users.find((user: any) => user.id === user_id);
    if (!user) {
      return new UserResponse({ status: 400, statusText: `No user with ID: ${user_id} found` });
    }
    // Figure out what to do with the UserUpdateBuilder
    // user = update
    // return new UserResponse({status: 200, statusText: "success", user_id: user_id});
    return new UserResponse({ status: 400, statusText: 'User update not implemented yet' });
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
    this.jsonData.tasks.push({ ...task.toJSON(), _id: taskId });
    try {
      await fs.writeFile(temp_db_filename, JSON.stringify(this.jsonData));
    }
    catch (error) {
      console.error(error);
      return new TaskResponse({ status: 400, statusText: `Failed to add task: ${task.name}` });
    }
    return new TaskResponse({ status: 200, statusText: 'Inserted', task_id: taskId });
  }

  async updateTask(task_id: string, update: TaskUpdateBuilder): Promise<TaskResponse> {
    // const result = await this.userCollection.updateOne({"_id": new ObjectId(user_id)}, update.getUpdate());
    const user = this.jsonData.tasks.find((task: Task) => task.id === task_id );
    if (!user) {
      return new TaskResponse({ status: 400, statusText: `No task with ID: ${task_id} found` });
    }
    // Figure out what to do with the UserUpdateBuilder
    // user = update
    // return new UserResponse({status: 200, statusText: "success", user_id: user_id});
    return new TaskResponse({ status: 400, statusText: 'Task update not implemented yet' });
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
