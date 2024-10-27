"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { MdDelete } from 'react-icons/md'
import { useDeleteTodoMutation } from '@/redux/Slice'
import toast from 'react-hot-toast'

interface TodoItemProps {
    item: {
        _id: string
        todo: string
        createdAt: Date
        email:string
    }
}

interface DeleteResponse {
    message: string
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
    const [deleteItem, { isLoading, isError, isSuccess, data }] = useDeleteTodoMutation()

    const deleteSingleItem = async () => {
        try {
            const res = await deleteItem(item._id).unwrap() as DeleteResponse
            toast.success(res.message)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("An unexpected error occurred")
            }
        }
    }

    return (
        <motion.li
         initial={{y:10,opacity:0}} 
         animate={{y:0, opacity:1}}
         transition={{y:{type:"spring",stiffness:120}}}
         className='flex justify-between border-l-green-500 border-l-[6px] cursor-pointer border-[1px] w-full font-medium p-1 border-green-900'>
            {item.todo}
            <MdDelete disabled={isLoading} onClick={deleteSingleItem} className='text-xl hover:text-red-500' />
        </motion.li>
    )
}

export default TodoItem
