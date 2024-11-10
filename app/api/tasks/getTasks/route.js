// app/api/tasks/getTasks/route.js
import { NextResponse } from 'next/server';
import { getAllTasks } from '../../../src/service-api';

// For a get request we should get the id of the user
export async function POST(request) {
  try {
    const { user_id } = await request.json();

    const taskResponse = await getAllTasks(user_id);

    if (taskResponse.status !== 200) {
      return NextResponse.json({message: taskResponse.message}, {status: 400});
    }
    return NextResponse.json({message: "Success getting tasks"}, {status: 200}, {tasks: taskResponse.tasks});
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}