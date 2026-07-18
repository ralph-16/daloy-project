import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
        return NextResponse.json({ error: 'userId is required' }, { status: 400 })
    }

    try {
        const res = await db.collection('todos').where('userId', '==', userId).get()
        const userData = res.docs.map((doc => ({ id: doc.id, ...doc.data() })))
        return NextResponse.json(userData)
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }

}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { text, userId } = body

    if (!text || !userId) {
        return NextResponse.json({ error: 'text and userId is required' }, { status: 400 })
    }

    try {
        const createdAt = new Date().toISOString()
        const docRef = await db.collection('todos').add({ text, completed: false, userId, createdAt })
        return NextResponse.json({
            id: docRef.id,
            text,
            completed: false,
            userId,
            createdAt
        })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}