// app/api/tasks/updateTask/route.js
import { NextResponse } from 'next/server';
import { taskUpdate } from '../../../src/service-api';

export async function POST(request) {
  try {
    const response = await request.json();

    /*
    Response:
        user_id,
        task_id,
        description,
        completed
    */

    if (response === undefined) {
      return NextResponse.json({message: "Error getting response from database"}, {status: 400});
    }
    const taskResponse = await taskUpdate(response);

    if (taskResponse.status !== 200) {
      return NextResponse.json({message: taskResponse.message}, {status: 400});
    }
    
    return NextResponse.json({ message: 'Task Editing Success' });

  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}