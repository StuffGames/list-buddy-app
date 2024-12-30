// app/api/tasks/createTask/route.js
import { NextResponse } from 'next/server';
import { createTask } from '../../_src/service-api';

export async function POST(request) {
  try {
    const response = await request.json();
    /*
        Response: {
            user_id,
            deadline,
            name,
            category,
            description,
            priority,
            difficulty,
            importance,
            completed
        }
    */
    if (response === undefined) {
      return NextResponse.json({message: "Error getting response from database"}, {status: 400});
    }
    const taskResponse = await createTask(response);

    if (taskResponse.status !== 200) {
      console.error(taskResponse);
      return NextResponse.json({message: taskResponse.message}, {status: 400});
    }
    
    return NextResponse.json({ message: 'Task Adding Success' });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}