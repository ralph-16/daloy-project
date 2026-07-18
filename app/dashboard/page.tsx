'use client'
import { LoginButton } from '@/components/LoginButton'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarTrigger,
    SidebarContent,
    SidebarFooter
} from "@/components/ui/sidebar"
import { House, ListChecks } from 'lucide-react';
import { TodoList } from '@/components/TodoList'
import { auth } from "@/lib/firebase-client"
import { User, onAuthStateChanged } from 'firebase/auth'
import { useState, useEffect } from 'react'

export default function Dashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        return onAuthStateChanged(auth, (loggedUser) => {
            setUser(loggedUser)
        })
    }, [])

    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <h1 className="text-3xl font-extrabold text-blue-600">Daloy</h1>
                </SidebarHeader>
                <SidebarContent className="px-3">
                    <Button variant="ghost" onClick={() => router.push('/dashboard')}><House />Home</Button>
                    <Button variant="ghost"><ListChecks />Todos</Button>
                </SidebarContent>
                <SidebarFooter>
                    <LoginButton />
                </SidebarFooter>
            </Sidebar>
            <div className="bg-blue-100 w-full p-5">
                <h1 className="text-3xl font-extrabold my-3">Seize the day, {user?.displayName}</h1>
                <div className="flex flex-wrap gap-5">
                    {user && (
                        <Card className="w-md">
                            <CardHeader>
                                <CardTitle>Todos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <TodoList userId={user.uid} />
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </SidebarProvider>
    )
}