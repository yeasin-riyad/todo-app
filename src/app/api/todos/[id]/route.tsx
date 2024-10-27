// app/api/todos/[id]/route.ts

import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/database/db';
let todosCollection: any; 

async function initializeTodosCollection() {
    if (!todosCollection) {
        todosCollection = await connectToDatabase();
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
   await initializeTodosCollection()
    const { id } = params;

    try {
        // Ensure ID is a valid MongoDB ObjectId
        if (!ObjectId.isValid(id)) {
            return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
        }

        // Attempt to delete the todo item by its ID
        const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });

        // Check if the todo item was found and deleted
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting todo:', error);
        return NextResponse.json({ message: 'Failed to delete todo', error: (error as Error).message }, { status: 500 });
    }
}
