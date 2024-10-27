import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/db";


let todosCollection: any; 

async function initializeTodosCollection() {
    if (!todosCollection) {
        todosCollection = await connectToDatabase();
    }
}


// Define the GET request handler for the dynamic route
export async function GET(request: Request, { params }: { params: { email: string } }) {
    const { email } = params;
  
    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    }
  
    try {
      await initializeTodosCollection();
  
      // Find todos associated with the provided email
      const result = await todosCollection.find({ email }).toArray();
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error("Error fetching todos:", error);
      return NextResponse.json({ message: "Failed to fetch todos" }, { status: 500 });
    }
  }
// Define the DELETE request handler for the dynamic route
export async function DELETE(req: Request, { params }: { params: { email: string } }) {
  const { email } = params;

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  try {
    await initializeTodosCollection();

    // Attempt to delete todos associated with the given email
    const result = await todosCollection.deleteMany({ email });
    return NextResponse.json({ message: `${result.deletedCount} todos successfully deleted` }, { status: 200 });
  } catch (error) {
    console.error("Error deleting todos:", error);
    return NextResponse.json({ message: "Failed to delete todos" }, { status: 500 });
  }
}




