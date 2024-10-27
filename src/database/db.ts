import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@cluster0.gx2sshg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log("Connected to MongoDB!");

    // Access or create the "ToDoApp" database and the "todos" collection
    const todosCollection = client.db("ToDoApp").collection("todos");
    return todosCollection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error for handling elsewhere
  }
}

export async function createUserCollection() {
  try {
    // Connect the client to the server
    await client.connect();

    // Access or create the "ToDoApp" database and the "todos" collection
    const usersCollection = client.db("ToDoApp").collection("users");
    return usersCollection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Rethrow the error for handling elsewhere
  }
}


