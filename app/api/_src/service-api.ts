import type { Database } from './db-interfaces';
import type { User } from './user-object';
import { MongoDatabase } from './mongo-database';
import { JsonDatabase } from './json-database';
import { Task, TaskUpdateBuilder } from '../_src/task-objects';

export interface ApiResponse {
    status: number;
    statusText: string;
    message?: string;
    user?: User | any;
    task?: Task | any;
    tasks?: Task[] | any;
    optional?: any;
}

// replace this with an env variable or something
const dbType: 'mongodb' | 'json' = 'json';

// TODO: Consider doing database connection stuff at an upper level
const db: Database = getDatabase();
await checkDbConnection();

function getDatabase() {
  // fall back on JSON database when you can
  if (dbType === 'mongodb') {
    return MongoDatabase.instance;
  } else {
    return JsonDatabase.instance;
  }
}

async function checkDbConnection(): Promise<void> {
  if (!db.isConnectedToDb()) {
    try {
      await db.connectToDatabase();
    }
    catch (error: any) {
      console.error('Error connecting to db', error);
      // return {
      //   status: 400,
      //   statusText: 'Unable to connect to database',
      //   message: 'Connection was not made to the database'
      // };
    }
  }
}

// TODO: TEST THIS
export async function login(username: string, password: string): Promise<ApiResponse> {
  // Connect to database
  try {
    const userExists = await db.userExists(username);
    if (userExists.status == 400){
      return {
        status: 400,
        statusText: 'User doesn\'t exist',
        message: 'User with that username was not found'
      };
    }
        
    const user = await db.getUser(userExists.user_id);

    if(!user.checkUserAndPass(username, password)) {
      return {
        status: 400,
        statusText: 'Wrong username or password',
        message: 'Invalid username or password'
      };
    }

    return {
      status: 200,
      statusText: 'Successful Login',
      user: user
    };
  }
  catch(err: any) {
    // This is where all the errors are caught....
    return {
      status: 400,
      statusText: err.name,
      message: err.message
    };
  }
}

export async function createTask(params: any): Promise<ApiResponse> {
  // Connect to database
  try {
    // TODO: maybe bring the updating of user out here? idk lol
    const taskResponse = await db.addTask(new Task(params));

    // TODO: be checking if certain properties (such as 'name') exist in the params object
    if (taskResponse.status !== 200) {
      return {
        status: 400,
        statusText: taskResponse.statusText,
        message: `There was a problem inserting Task '${params.name}' into user with id ${params.user_id}`
      };
    }

    return {
      status: 200,
      statusText: 'Successfully created task'
    };
  }
  catch (err: any) {
    return {
      status: 400,
      statusText: err.name,
      message: err.message
    };
  }
}

export async function getAllTasks(user_id: string): Promise<ApiResponse> {
  // connect to database
  try {
    const user: User = await db.getUser(user_id);
    const tasks: Task[] = await db.getTasks(user);

    return {
      status: 200,
      statusText: 'Successfully got all tasks',
      tasks: tasks
    };
  }
  catch (err: any) {
    return {
      status: 400,
      statusText: err.name,
      message: err.message
    };
  }
}

export async function taskUpdate(params: any): Promise<ApiResponse> {
  // connect to database
  try{
    /*
      Response:
        user_id,
        task_id,
        description,
        completed
    */

    // TODO: Fix this so that the task builder is built based on whatever fields available in params variable
    // Currently just works based on input from 'api/openai/importance'
    const taskUpdate = dbType === 'mongodb' ?
      // TODO: Move this taskBuilder logic into the appropriate database.
      //      Basically, we want to convert a normal update object into the specific database format
      new TaskUpdateBuilder().setDescription(params.description).setCompleted(params.completed).getUpdate() :
      {
        description: params.description,
        completed: params.completed
      };
    const taskResponse = await db.updateTask(params.task_id, taskUpdate);

    if (taskResponse.status !== 200) {
      return {
        status: 400,
        statusText: 'Failed to update task',
        message: `There was an error updating task with id '${params.task_id}'`
      };
    }

    return {
      status: 200,
      statusText: 'Successfully updated task'
    };
  }
  catch (err: any) {
    return {
      status: 400,
      statusText: err.name,
      message: err.message
    };
  }
}