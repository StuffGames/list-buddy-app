// app/api/tasks/getTasks/route.js
import { NextResponse } from 'next/server';
import { getAllTasks } from '../../_src/service-api';

import { Task } from '../../_src/task-objects';

// For a get request we should get the id of the user
export async function POST(request) {
  try {
    const { user_id } = await request.json();

    if (user_id === undefined) {
      return NextResponse.json({message: "User ID not found in request"}, {status: 500});
    }

    const taskResponse = await getAllTasks(user_id);

    if (taskResponse.status !== 200) {
      return NextResponse.json({message: taskResponse.message}, {status: 400});
    }
    const totalTasks = taskResponse.tasks;
    // TODO: Make sure this works with the mongodb
    return NextResponse.json(
      {
        message: "Success getting tasks",
        totalTasks: totalTasks.map(t => (t instanceof Task) ? t.toJSON() : t)
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}