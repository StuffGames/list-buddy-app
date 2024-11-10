// app/api/tasks/createTask/route.js
import { NextResponse } from 'next/server';
import { connectToDatabase, addTask } from '../../../src/service-crud';

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

    // Connect to the database
    const connected = await connectToDatabase();
    if (connected.status !== 200) {
        return NextResponse.json({message: "Error Connecting to Database"}, {status: 400});
    }

    // verify that the user exists (user_id)

    // Add it to the database
    const added = addTask();
    if (added.message !== 200) {
        return NextResponse.json({message: "Error adding task to database"}, {status: 400});
    }

    if (true /*successful operation*/) {
        return NextResponse.json({ message: 'Task Adding Success' });
    }
    else {
        return NextResponse.json({message: 'Error creating task'}, {status: 400});
    }

  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}