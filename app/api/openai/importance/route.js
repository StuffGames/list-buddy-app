import { NextResponse } from 'next/server';
import { daysUntilDeadline, calculateTaskImportance } from '../../_src/openai/importance_algo';

export async function POST(request) {
  try {
    const response = await request.json();

    if (response === undefined) {
      return NextResponse.json({ message: 'Error getting response from database' }, { status: 400 });
    }

    const importanceResponse = await calculateTaskImportance({
      taskDescription: response.description,
      daysUntilDeadline: daysUntilDeadline(response.deadline),
      difficulty: response.difficulty,
      priority: response.priority
    });
        
    if (importanceResponse.status !== 200) {
      console.log(importanceResponse);
      return NextResponse.json({ message: importanceResponse.message }, { status: 400 });
    }
        
    const score = importanceResponse.score;
    return NextResponse.json({ message: 'Importance Success', score }, { status: 200 });
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}