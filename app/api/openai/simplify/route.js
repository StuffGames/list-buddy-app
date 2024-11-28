import { NextResponse } from 'next/server';
import { breakdown } from "../../_src/openai/break_down";
import { taskUpdate } from "../../_src/service-api";

export async function POST(request) {
    try {
        const response = await request.json();
        /*
            Response: {
                user_id
                task_name
                completed,
                description
            }
        */
        if (response === undefined) {
          return NextResponse.json({message: "Error getting response from database"}, {status: 400});
        }

        const textResponse = await breakdown(response.task_name, response.description);

        const newText = textResponse.res;

        const fullText = response.description + '\n' + newText;

        const taskResponse = await taskUpdate({
            user_id: response.user_id,
            task_id: response.task_id,
            completed: response.completed,
            description: fullText
        });
    
        if (taskResponse.status !== 200) {
          return NextResponse.json({message: taskResponse.message}, {status: 400});
        }
        
        return NextResponse.json({ message: 'Task Updating Success', fullText}, {status: 200});
    
      } catch (error) {
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
      }
}