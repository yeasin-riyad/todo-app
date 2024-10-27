"use client";
import { useAddTodoMutation } from "@/redux/Slice";
import React, { useState, ChangeEvent } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import TodoList from "./TodoList";

export const Form: React.FC = () => {
  const { data: session } = useSession(); // Access the session data
  const [todo, setTodo] = useState<string>("");
  const [addTodo] = useAddTodoMutation();

  const todoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Check if the todo text is available and if there's a session
    if (todo && session?.user?.email) {
      try {
        await addTodo({ todo, email: session.user.email }).unwrap();
        toast.success("ToDo Added Successfully.");
        setTodo("");
      } catch (error) {
        toast.error("Failed To Add Todo. Please check your internet connection.");
      }
    } else {
      toast.error("Please log in to add a todo.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="relative flex items-center gap-4 h-10 md:h-12">
        <input
          required
          onChange={todoChange}
          value={todo}
          className="flex-1 h-full border-[1px] border-gray-600 bg-transparent pl-4 pr-6 placeholder:text-gray-400 text-base placeholder:text-sm tracking-wide rounded-md outline-none hover:border-green-500 focus-visible:border-green-500 duration-75"
          placeholder="Enter Your Todo......."
          type="text"
        />
        {todo && (
          <MdClose
            onClick={() => setTodo("")}
            className="absolute right-28 top-3 text-white text-lg cursor-pointer md:right-32 md:top-4"
          />
        )}
        <button
          className="h-full border-[1px] border-gray-600 px-2 rounded-md hover:text-orange-600 uppercase duration-100 text-sm md:text-base"
          type="submit"
        >
          Add Todo
        </button>
      </form>
      <TodoList />
    </div>
  );
};
