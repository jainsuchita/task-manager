'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useTodoStore, Task } from '@/store/useTodoStore'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ArrowLeft } from 'lucide-react'

export default function EditTaskPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const { tasks, updateTask } = useTodoStore()

    const existingTask = tasks.find((t) => t.id === id)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState<Task['status']>('In Progress')

    useEffect(() => {
        if (existingTask) {
            setTitle(existingTask.title)
            setDescription(existingTask.description)
            setStatus(existingTask.status)
        }
    }, [existingTask])

    const handleUpdate = () => {
        if (!existingTask) return
        if (!title.trim()) return alert('Title is required')

        updateTask(id, { title, description, status })
        router.push('/')
    }

    if (!existingTask) {
        return (
            <main className="p-6 max-w-xl mx-auto">
                <p className="text-red-500">Task not found.</p>
            </main>
        )
    }

    return (
        <div className="min-h-screen bg-[#f5f6fa] flex justify-center px-4 py-10">
            <div className="w-full max-w-[768px] bg-white rounded-lg shadow-md border border-gray-200">
                {/* Header */}
                <header className="bg-[#004a99] text-white px-[24px] py-[20px] flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="text-white hover:text-gray-200"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-[20px] font-semibold">Edit Task</h1>
                </header>

                <main className="px-[24px] pt-[32px] pb-[40px] space-y-[32px]">
                    <div className="space-y-[24px]">
                        {/* Title */}
                        <div className="space-y-[8px]">
                            <label className="text-sm font-medium text-[#333]">Title</label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the title"
                                className="rounded-[8px] px-[16px] py-[12px] text-[15px] border border-[#D3D3D3] placeholder:text-[#A0A0A0]"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-[8px]">
                            <label className="text-sm font-medium text-[#333]">Description</label>
                            <Textarea
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter the description"
                                className="rounded-[8px] px-[16px] py-[12px] text-[15px] border border-[#D3D3D3] placeholder:text-[#A0A0A0]"
                            />
                        </div>

                        {/* Status */}
                        <div className="space-y-[8px]">
                            <label className="text-sm font-medium text-[#333]">Status</label>
                            <Select value={status} onValueChange={(value) => setStatus(value as Task['status'])}>
                                <SelectTrigger className="rounded-[8px] px-[16px] py-[12px] text-[15px] border border-[#D3D3D3] placeholder:text-[#A0A0A0] focus:ring-2 focus:ring-[#004a99] focus:outline-none">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="rounded-[8px] border border-[#D3D3D3] shadow-md">
                                    <SelectItem
                                        value="Pending"
                                        className="text-[15px] px-[16px] py-[10px] cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
                                    >
                                        Pending
                                    </SelectItem>
                                    <SelectItem
                                        value="In Progress"
                                        className="text-[15px] px-[16px] py-[10px] cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
                                    >
                                        In Progress
                                    </SelectItem>
                                    <SelectItem
                                        value="Completed"
                                        className="text-[15px] px-[16px] py-[10px] cursor-pointer hover:bg-gray-100 focus:bg-gray-100"
                                    >
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between gap-[16px]">
                        <Button
                            variant="outline"
                            className="text-[#004a99] border-[#004a99] px-[32px] py-[12px] rounded-[8px] text-[15px] font-medium w-[160px]"
                            onClick={() => router.push('/')}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#004a99] hover:bg-[#003a7a] text-white px-[32px] py-[12px] rounded-[8px] text-[15px] font-medium w-[160px]"
                            onClick={handleUpdate}
                        >
                            Update
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    )
}
