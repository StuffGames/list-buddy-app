// app/api/login/route.js
import { NextResponse } from 'next/server';
import { login } from '../_src/service-api';
// import ApiResponse as a type for when switching to TypeScript

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (username === undefined || password === undefined) {
      return NextResponse.json({ message: 'Username or Password missing from request'}, {status: 500});
    }

    const response = await login(username, password);

    // You should verify the username and password (WILL CHANGE TO AUTH0 at some point maybe or mongodb)
    if (response.status === 200) {
      // Simulate success and send a response with a token or user data
      const user = response.user;
      return NextResponse.json({ message: 'Login successful', user });
    } else {
      // More than likely message will be "Invalid username or password"
      console.log(response);
      return NextResponse.json({ message: response.message }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}