import { connectToDB } from '@/lib/database';
import Post from '@/models/post';
import { NextResponse } from 'next/server';

export const GET = async (
    request:Request, 
    {params}: { params: Promise<{ section: string }>}
) => {
    const section = (await params).section;

    try {
        await connectToDB();
        const posts = await Post.find({
            section: section
        }).sort({ createdAt: -1 });
        
        if (posts.length === 0) {
            return NextResponse.json('not found', {status:404});
        }
        return NextResponse.json(JSON.stringify(posts), {status:200});
    } catch (error: BodyInit|Error|unknown) {
        console.log(error)
        return NextResponse.json({message:"there was an error"}, {status:500});
    }
}
