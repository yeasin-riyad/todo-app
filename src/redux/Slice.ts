import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Todo } from './types';

interface DeleteResponse {
  message: string;
}

export interface User {
  username: string;
  email: string;
  password: string;
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }),
  tagTypes: ['Todo'], // Add tagTypes here

  endpoints: (builder) => ({
    registerUser: builder.mutation<void, User>({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
      }),
    }),
    getTodos: builder.query<Todo[], string>({
      query: (email) => `todos/email/${email}`,
      providesTags: ['Todo'],
    }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation<DeleteResponse, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteAllTodo: builder.mutation<DeleteResponse, string>({
      query: (email) => ({
        url: `todos/email/${email}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useRegisterUserMutation,
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useDeleteAllTodoMutation,
} = todoApi;
