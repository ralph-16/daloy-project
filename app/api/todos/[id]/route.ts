import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase-admin'


export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const body = await request.json()

    try {
        const res = await db.collection('todos').doc(id).get()
        if (res.exists) {
            if (res.data()!.userId == body.userId) {
                await db.collection('todos').doc(id).update({
                    text: body.text,
                    completed: body.completed
                })
                return NextResponse.json({ id, ...body })
            }
            return NextResponse.json({ error: 'Not same userId' }, { status: 403 })
        } else {
            return NextResponse.json({ error: 'Task doesn\'t exists' }, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const userId = request.nextUrl.searchParams.get('userId')

    try {
        const res = await db.collection('todos').doc(id).get()
        if (res.exists) {
            if (res.data()!.userId == userId) {
                await db.collection('todos').doc(id).delete()
                return new NextResponse(null,{status: 204})
            }
            return NextResponse.json({ error: 'Not same userId' }, { status: 403 })
        } else {
            return NextResponse.json({ error: 'Task doesn\'t exists' }, { status: 404 })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}