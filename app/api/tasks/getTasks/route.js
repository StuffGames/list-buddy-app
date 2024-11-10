// app/api/tasks/getTasks/route.js
import { NextResponse } from 'next/server';
import { getTasks } from '../../../src/service-crud';

// For a get request we should get the id of the user
export async function GET(request) {
  try {
    //const { username, password } = await request.json();

    const { user } = await request.json();

    // Try and get from the database depending on the id
    if (true) {
        return NextResponse.json({message: 'Got the user, returning,'});
    }
    else {
        return NextResponse.json({ message: 'cannot connect to database'}, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}