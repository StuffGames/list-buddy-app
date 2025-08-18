import { NextResponse } from 'next/server';
import { breakdown } from '../../_src/openai/break_down';
import { taskUpdate } from '../../_src/service-api';
import { MissingFieldError } from '../../_src/exceptions';

export async function POST(request) {
  try {
    const response = await request.json();
    /*
      Response: {
        user_id,
        task_id,
        completed,
        description
      }
    */
    const fields = ['user_id', 'task_id', 'completed', 'description'];
    fields.forEach(field => {
      if (response[field] === undefined) {
        throw new MissingFieldError(`Field '${field}' is missing from the request`);
      }
    });
    if (response === undefined) {
      return NextResponse.json({ message: 'Error getting response from database' }, { status: 400 });
    }

    const textResponse = await breakdown(response.task_name, response.description);

    const newText = textResponse.res;

    const fullText = `${response.description} \n${newText}`;
    const taskResponse = await taskUpdate({
      user_id: response.user_id,
      task_id: response.task_id,
      completed: response.completed,
      description: fullText
    });
    
    if (taskResponse.status !== 200) {
      console.log(taskResponse);
      return NextResponse.json({ message: taskResponse.message }, { status: 400 });
    }
        
    return NextResponse.json({ message: 'Task Updating Success', fullText }, { status: 200 });
    
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}