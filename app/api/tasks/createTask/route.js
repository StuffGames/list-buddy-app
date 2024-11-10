// app/api/tasks/createTask/route.js
import { NextResponse } from 'next/server';
import { createTask } from '../../../src/service-api';

export async function POST(request) {
  try {
    const response = await request.json();
    /*
        Response: {
            user_id,
            task_id,
            deadline,
            category,
            description,
            priority,
            difficulty
        }
    */
    if (response === undefined) {
      return NextResponse.json({message: "Error getting response from database"}, {status: 400});
    }
    const taskResponse = await createTask(response);

    if (taskResponse.status !== 200) {
      return NextResponse.json({message: taskResponse.message}, {status: 400});
    }
    
    return NextResponse.json({ message: 'Task Adding Success' });

  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}