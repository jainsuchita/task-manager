'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { TaskCard } from '@/components/TaskCard'
import { useTodoStore } from '@/store/useTodoStore'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const { tasks, searchTerm, setSearchTerm } = useTodoStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timeout)
  }, [])

  const filtered = useMemo(() => {
    const keyword = searchTerm.toLowerCase()
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(keyword) ||
        task.description.toLowerCase().includes(keyword)
    )
  }, [tasks, searchTerm])

  const groupedTasks = {
    'In Progress': filtered.filter((task) => task.status === 'In Progress'),
    Pending: filtered.filter((task) => task.status === 'Pending'),
    Completed: filtered.filter((task) => task.status === 'Completed'),
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex justify-center px-4 py-10">
      <div className="w-full max-w-[768px] rounded-lg shadow-md border border-gray-200 bg-white">
        <header style={{ color: 'white' }}  className="bg-[#004a99] text-[20px] font-bold p-[24px] leading-none">
          TO-DO APP
        </header>

        <main className="px-[24px] pt-[32px] pb-[40px] space-y-[32px]">

          <div className="flex flex-col sm:flex-row gap-[16px] items-center">
            <Input
              placeholder="Search To-Do"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-[#E0E0E0] rounded-[8px] px-[16px] py-[12px] text-[15px] placeholder:text-[#A0A0A0]"
            />
            <Button
              onClick={() => router.push('/add')}
              style={{ color: 'white' }}
              className="w-full sm:w-auto bg-[#004a99] hover:bg-[#003a7a] text-white px-[24px] py-[12px] text-[15px] rounded-[8px]"
            >
              Add Task
            </Button>
          </div>

          {/* Accordion Sections */}
          <div className="rounded-[8px] border border-[#E0E0E0] overflow-hidden">
            {loading ? (
              <div className="space-y-2 p-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-gray-100 animate-pulse rounded-md"
                  />
                ))}
              </div>
            ) : (
              <Accordion type="multiple" defaultValue={['In Progress']}>
                {Object.entries(groupedTasks).map(([status, taskList]) => (
                  <AccordionItem key={status} value={status}>
                    <AccordionTrigger className="bg-[#f1f3f6] px-[20px] py-[16px] text-[15px] font-semibold text-[#333] hover:no-underline">
                      {status}
                      <span className="ml-1 font-bold text-[14px]">
                        ({taskList.length})
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="divide-y">
                      {taskList.length === 0 ? (
                        <p className="text-sm italic text-gray-500 px-4 py-4">
                          No tasks in this section.
                        </p>
                      ) : (
                        taskList.map((task) => (
                          <div key={task.id} className="px-4 py-3">
                            <TaskCard task={task} />
                          </div>
                        ))
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
