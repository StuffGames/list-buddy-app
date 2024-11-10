import { NextResponse } from 'next/server';
import { daysUntilDeadlin, calculateTaskImportance, getOpenAIEstimates, daysUntilDeadline } from '../../../src/importance_algo';
import { taskUpdate } from "../../../src/service-api";

export async function POST(request) {
    try {
        const response = await request.json();

        if (response === undefined) {
          return NextResponse.json({message: "Error getting response from database"}, {status: 400});
        }

        const importanceResponse = await calculateTaskImportance({
            taskDescription: response.description,
            daysUntilDeadline: daysUntilDeadline(response.deadline),
            difficulty: response.difficulty,
            priority: response.priority
        });
        
        if (importanceResponse.status !== 200) {
            return NextResponse.json({message: importanceResponse.message}, {status: 400});
        }
        
        const score = importanceResponse.score;
        return NextResponse.json({ message: 'Importance Success', score}, {status: 200});
    
      } catch (error) {
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
      }
}