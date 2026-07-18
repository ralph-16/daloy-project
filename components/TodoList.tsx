'use client'
import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
import { Separator } from "@/components/ui/separator"

interface todo {
    id: string,
    text: string,
    completed: boolean,
    userId: string,
    createdAt: string
}

export function TodoList({ userId }: { userId: string | undefined }) {
    const [todos, setTodos] = useState<todo[]>([])
    const [loading, setLoading] = useState(true)
    const [newText, setNewText] = useState('')

    async function handleAdd() {
        if (!newText) return

        const res = await fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newText, userId })
        })
        const newTodo = await res.json()
        setTodos([...todos, newTodo])
        setNewText('')
    }

    async function handleToggle(todo: todo) {
        const res = await fetch('/api/todos/' + todo.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
                text: todo.text,
                completed: !todo.completed
            })
        })
        setTodos(todos.map((t) => t.id === todo.id ? { ...t, completed: !t.completed } : t))
    }

    async function handleDelete(id: string) {
        await fetch('/api/todos/' + id + '?userId=' + userId, { method: 'DELETE' })
        setTodos(todos.filter((t) => t.id !== id))
    }

    useEffect(() => {
        async function fetchTodos() {
            const res = await fetch('/api/todos?userId=' + userId)
            const data = await res.json()
            setTodos(data)
            setLoading(false)
        }
        fetchTodos()
    }, [userId])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <Field className="py-3">
                <FieldLabel htmlFor="new-task">Add new task</FieldLabel>
                <Input value={newText} onChange={(e) => setNewText(e.target.value)} />
                <Button onClick={() => handleAdd()}>Add new task</Button>
            </Field>
            <Separator />
            <p className="font-bold py-3">Current tasks:</p>
            <ul className="py-3">
                {todos.map((todo) => (
                    <li key={todo.id} className='flex items-center gap-3 py-1'>
                        <Checkbox checked={todo.completed} onCheckedChange={() => handleToggle(todo)} />
                        <span>{todo.text}</span>
                        <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
                    </li>
                ))}
            </ul>
        </>
    )
}