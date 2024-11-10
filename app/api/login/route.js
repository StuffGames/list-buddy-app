// app/api/login/route.js
import { NextResponse } from 'next/server';
import { login } from '../../src/service-api';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const response = await login(username, password);

    // You should verify the username and password (WILL CHANGE TO AUTH0 at some point maybe or mongodb)
    if (response.status === 200) {
      // Simulate success and send a response with a token or user data
      const user = response.user;
      return NextResponse.json({ message: 'Login successful', user });
    } else {
      return NextResponse.json({ message: 'Invalid username or password' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}