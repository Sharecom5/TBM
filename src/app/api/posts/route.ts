import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/wordpress';

export async function GET() {
    try {
        const posts = await getAllPosts(1, 20);
        return NextResponse.json(posts);
    } catch (error) {
        console.error('[API Posts Error]:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
