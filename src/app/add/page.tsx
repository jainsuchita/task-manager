'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTodoStore } from '@/store/useTodoStore'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function AddTaskPage() {
    const router = useRouter()
    const { addTask } = useTodoStore()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleAdd = () => {
        if (!title.trim()) return alert('Title is required')
        addTask({ title, description, status: 'In Progress' })
        router.push('/')
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
                    <h1 className="text-[20px] font-semibold">Add Task</h1>
                </header>

                {/* Form Section */}
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
                            onClick={handleAdd}
                        >
                            Add
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    )
}
