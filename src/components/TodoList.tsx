"use client";
import { useDeleteAllTodoMutation, useGetTodosQuery } from '@/redux/Slice';
import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import TodoItem from './TodoItem';
import { Todo } from '@/redux/types';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const TodoList: React.FC = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || ''; // Ensure userEmail is a string
  const { data, error, isLoading } = useGetTodosQuery(userEmail);
  const [showRemove, setShowRemove] = useState(false);
  const [deleteAllTodos] = useDeleteAllTodoMutation();

  const handleDeleteAll = async () => {
    if (!userEmail) {
      toast.error("User is not authenticated.");
      return;
    }

    try {
      const res = await deleteAllTodos(userEmail).unwrap();
      setShowRemove(false);
      toast.success(res.message || "All todos successfully deleted.");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-2 p-4 border border-gray-600 rounded-md">
      {isLoading ? (
        <p className="text-center text-base text-blue-600 font-medium tracking-wide">Loading...</p>
      ) : error ? (
        <p className="text-center text-base text-red-600 font-medium tracking-wide">
          Error loading todos. Please check your internet connection.
        </p>
      ) : data && data.length > 0 ? (
        <>
          <ul className="flex flex-col gap-2 border border-slate-600 p-2 shadow-lg shadow-gray-600">
            {data.map((item: Todo) => (
              <TodoItem key={item._id} item={item} />
            ))}
          </ul>
          <motion.button
            onClick={() => setShowRemove(true)}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-2 py-4 text-sm text-orange-500 bg-transparent border-[1px] border-gray-500 rounded-md hover:text-red-500 hover:border-red-500"
          >
            Remove All Todos
          </motion.button>
        </>
      ) : (
        <p className="text-center text-base text-yellow-600 font-medium tracking-wide">Your Todo List is Empty...</p>
      )}
      
      {showRemove && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-72 text-center">
            <p className="mb-4 text-lg text-gray-700">
              Are you sure you want to <span className="text-red-600">remove all todos?</span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteAll}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={() => setShowRemove(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
