import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

export const useTaskStore = create(persist((set, get) => ({
    tasks: [],
    doneTasks: [],
    addTask: (text) => set((state) => ({
        tasks: [{id: new Date().toString() + ' ' + new Date().getMilliseconds().toString(), date: new Date().toString(), text: text}, ...state.tasks]
    })),
    changeTask: (id, text) => set((state) => ({
        tasks: [...state.tasks.map(
            item => {
                 if (item.id === id) item.text = text
                return item
            }
        )],
    })),
    removeTask: (id) => set((state)=>({
        tasks: [...state.tasks.filter(item => item.id !== id)]
    })),
    removeDoneTask: (id) => set((state)=>({
        doneTasks: [...state.doneTasks.filter(item => item.id !== id)]
    })),
    executeTask: (id) => set((state)=>({
        tasks: [...state.tasks.filter(item => item.id !== id)],
        doneTasks: [...state.tasks.filter(item => item.id === id), ...state.doneTasks]
    })),
}),
    {
        name: 'tasks',
        storage: createJSONStorage(() => localStorage),
    }
))