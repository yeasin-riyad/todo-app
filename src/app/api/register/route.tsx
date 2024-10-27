// src/app/api/register/route.ts
import { createUserCollection } from '@/database/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  try {
    const users = await createUserCollection();
    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    await users.insertOne({ username, email, password });
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error registering user', error }, { status: 500 });
  }
}
