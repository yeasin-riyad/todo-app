// app/api/todos/route.ts

import { connectToDatabase } from '@/database/db';
import { NextResponse } from 'next/server';

// Define the type for the todo item
interface Todo {
    _id?: string; 
    todo: string; 
    createdAt: Date; 
    email:string,
}

let todosCollection: any; 

async function initializeTodosCollection() {
    if (!todosCollection) {
        todosCollection = await connectToDatabase();
    }
}





// Define the expected request body type
interface RequestBody {
    todo: string; 
    email:string;// The incoming request must have a 'todo' field
}

export async function POST(request: Request) {
    await initializeTodosCollection(); // Ensure collection is initialized
    try {
        // Parse the request body and assert the type
        const body: RequestBody = await request.json();

        // Create a new todo item
        const newTodo: Todo = {
            todo: body.todo,
            email:body.email,
            createdAt: new Date(), // Set the creation date
        };

        // Insert the new todo into the collection
        const result = await todosCollection.insertOne(newTodo);

        // Return a success response with the inserted document ID
        return NextResponse.json(
            {
                message: 'Todo added successfully',
                todo: {
                    _id: result.insertedId.toString(), // Convert ObjectId to string
                    ...newTodo,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error inserting todo:', error);
        return NextResponse.json(
            {
                message: 'Failed to add todo',
                error: (error as Error).message, // Ensure error is typed as Error
            },
            { status: 500 }
        );
    }
}


