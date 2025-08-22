import { MongoDatabase } from './mongo-database';
import { User, UserUpdateBuilder } from './user-object';
import { Task, TaskUpdateBuilder } from './task-objects';
import { Database } from './db-interfaces';
import { JsonDatabase } from './json-database';

async function json_db() {
  const db: Database = JsonDatabase.instance;
  if (!db.isConnectedToDb()) {
    try {
      await db.connectToDatabase();
    }
    catch (error: any) {
      console.error('Error connecting to db', error);
    }
  }

  // User Details
  const user_id = '';
  const username = 'user2';
  const password = 'password2';
  const star_count = 1;
  const task_ids: string[] = [];

  const user: User = new User(user_id, username, password, star_count, task_ids);

  // Task Details
  const task_id = '4321';
  const name = 'Test Task 1';
  const category = 'Work';
  const description = 'This is the description of the task';
  const deadline = new Date(Date.now());
  const priority = 0;
  const difficulty = 1;
  const importance = 0;
  const completed = false;

  const task: Task = new Task(task_id, user_id, name, category, description, deadline, priority, difficulty, importance, completed);

  // creating a user in the database
  // const response = await db.addUser(user);
  // console.log('Response after adding user: ', response);
  const new_user_id = '0ddefc43-ba54-41f5-b528-8f155ac5a06f'; // response.id

  // updating same user in the database
  const response = await db.updateUser(new_user_id,
    {
      star_count: 3,
      username: 'user23',
      tasks: ['123']
    }
  );
  
  // TODO: possibly use an object like this:|
  // {
  //   set: {
  //     username: '1',
  //     star_count: 2
  //   },
  //   add: {
  //     tasks: ['123']
  //   },
  //   remove: {
  //     tasks: ['123']
  //   }
  // }

  console.log('Response after updating user: ', response);

  // deleting everything after
}
json_db().catch(console.dir);

async function mongo_db() {
  const db: Database = MongoDatabase.instance;

  const user_id = '673eabece2e64e727461757c';
  //              '673eabece2e64e727461757c'

  const task_id = '67353412bcba5c329c823318';
  const user = await db.getUser(user_id);

  // Everything commented out because it was all just tests

  // console.log(user);
  // const task = await db.getTask(user_id, task_id);
  // console.log(task);

  // const tasks = await db.getTasks(user);
  // console.log(tasks);

  // const newTask = new Task(
  //     "", user_id, "Chores", "Work",
  //     "I need to clean the house because it is starting to get dirty",
  //     new Date(Date.now()), 3, 4, 0, false
  // );

  // const response = await db.addTask(newTask);
  // console.log(response);

  // const update = new TaskUpdateBuilder()
  //                         .setPriority(1)
  //                         .setDeadline(new Date(Date.now()))
  //                         .setDescription("I completed most of my history homework, but I need to finish the last few questions.");
  // const response = await db.updateTask(task_id, update);
  // console.log(response);

  db.closeDB();
}
// mongo_db().catch(console.dir);