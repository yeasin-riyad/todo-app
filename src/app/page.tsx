"use client"
import InputForm from "@/components/InputForm";
import Login from "@/components/Login";
import { useSession, signOut } from "next-auth/react";
export const dynamic="force-dynamic"

export default function Home() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading state
  }

  return (
    <div className='w-full py-5 px-2 min-h-screen bg-gradient-to-r from-slate-100 via-slate-300 to-slate-300 flex items-center flex-col'>
      <nav className='w-full max-w-screen-md bg-bodyColors p-4 rounded-md flex justify-between items-center'>
        {session?.user?.email && (
          <button 
            onClick={() => signOut({ callbackUrl: "/login" })} 
            className='bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300'
          >
            Logout
          </button>
        )}
      </nav>
      <div className='w-full max-w-screen-md bg-bodyColors p-4 md:p-20 lg:p-10 rounded-md flex flex-col gap-5'>
        {session?.user?.email ? (
          <InputForm /> // Show InputForm if session exists
        ) : (
          <Login /> // Show Login component if session does not exist
        )}
      </div>
    </div>
  );
}
