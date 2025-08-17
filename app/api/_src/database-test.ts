import { MongoDatabase } from './mongo-database';
import { User, UserUpdateBuilder } from './user-object';
import { Task, TaskUpdateBuilder } from './task-objects';
import { Database } from './db-interfaces';

async function main() {
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
main().catch(console.dir);