// store/useTodoStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export type TaskStatus = 'Pending' | 'In Progress' | 'Completed'

export interface Task {
    id: string
    title: string
    description: string
    status: TaskStatus
    createdAt: string
}

interface TodoStore {
    tasks: Task[]
    searchTerm: string

    addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
    updateTask: (id: string, updates: Partial<Task>) => void
    deleteTask: (id: string) => void
    setSearchTerm: (term: string) => void
}

export const useTodoStore = create<TodoStore>()(
    persist(
        (set) => ({
            tasks: [],
            searchTerm: '',

            addTask: (task) =>
                set((state) => ({
                    tasks: [
                        ...state.tasks,
                        {
                            id: uuidv4(),
                            createdAt: new Date().toISOString(),
                            ...task,
                        },
                    ],
                })),

            updateTask: (id, updates) =>
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === id ? { ...task, ...updates } : task
                    ),
                })),

            deleteTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== id),
                })),

            setSearchTerm: (term) => set(() => ({ searchTerm: term })),
        }),
        {
            name: 'todo-store', 
        }
    )
  )
