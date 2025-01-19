import { connectToDB } from '@/lib/database';
import Post from '@/models/post';
import { NextResponse } from 'next/server';

export const GET = async (): Promise<NextResponse> => {
    try {
        await connectToDB();
        const posts = await Post.find({}).sort({ createdAt: -1 });
        
        if (posts.length === 0) {
            return NextResponse.json('not found', {status:404});
        }
        return NextResponse.json(JSON.stringify(posts), {status:200});
    } catch (error: BodyInit|Error|unknown) {
        return NextResponse.json(error, {status:500});
    }
}