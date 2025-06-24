'use client'

import { Task, useTodoStore } from '@/store/useTodoStore'
import { useRouter } from 'next/navigation'
import { Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface Props {
    task: Task
}

export const TaskCard = ({ task }: Props) => {
    const { deleteTask } = useTodoStore()
    const router = useRouter()

    const handleDelete = () => {
        deleteTask(task.id)
        toast.success('Task deleted')
    }

    const firstLetter = task.title?.charAt(0).toUpperCase() || '?'
    const formattedDate = new Date(task.createdAt).toLocaleDateString('en-GB', {
        weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'
    })

    return (
        <div className="flex justify-between gap-4 items-start bg-white p-[16px] rounded-[8px] shadow-sm border border-gray-200 hover:shadow-md transition relative group">
            {/* Avatar + Content */}
            <div className="flex gap-[12px]">
                {/* Avatar */}
                <div className="w-[40px] h-[40px] rounded-full border border-[#004a99] text-[#004a99] flex items-center justify-center font-semibold">
                    {firstLetter}
                </div>

                {/* Title, Description, Date */}
                <div className="space-y-[4px]">
                    <h4 className="text-[15px] font-semibold text-[#004a99] leading-tight">{task.title}</h4>
                    <p className="text-[14px] text-gray-700 leading-snug line-clamp-2">{task.description}</p>
                    <p className="text-[12px] text-gray-400">{formattedDate}</p>
                </div>
            </div>

            {/* Actions + Status */}
            <div className="flex flex-col items-end gap-[8px] opacity-0 group-hover:opacity-100 transition">
                <div className="flex gap-[10px]">
                    <button onClick={() => router.push(`/edit/${task.id}`)} title="Edit">
                        <Pencil className="w-4 h-4 text-blue-600 hover:text-blue-800" />
                    </button>
                    <button onClick={handleDelete} title="Delete">
                        <Trash2 className="w-4 h-4 text-red-600 hover:text-red-800" />
                    </button>
                </div>
                <div className="flex items-center gap-[6px]">
                    <span className="w-2 h-2 rounded-full bg-yellow-400" />
                    <span className="text-[13px] text-[#1a1a1a]">{task.status}</span>
                </div>
            </div>
        </div>
    )
}
