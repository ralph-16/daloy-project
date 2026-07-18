'use client'
import { Button } from "@/components/ui/button"
import { loginWithGoogle, auth, logout } from "@/lib/firebase-client"
import { CircleUser, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export function LoginButton() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        return onAuthStateChanged(auth, (loggedUser) => {
            setUser(loggedUser)
            setLoading(false)
            if (loggedUser) {
                router.push('/dashboard')
            }
        })
    }, [])

    async function handleLogin() {
        try {
            await loginWithGoogle()
        } catch (error) {
            console.log(error)
        }
    }

    async function handleLogout() {
        try {
            await logout()
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    if (loading) {
        return (
            <></>
        )
    } else if (user) {
        return (
            <Button onClick={handleLogout}><LogOut />Sign Out</Button>
        )
    } else {
        return (
            <Button onClick={handleLogin}><CircleUser />Sign in with Google</Button>
        )
    }
}