// api/post/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Post from '@/models/post'; // Adjust the import based on your structure
import fs from 'fs';
import path from 'path';


export const DELETE = async (request:Request, {params}:{params: Promise<{ id: string }>}): Promise<NextResponse> => {
    const id = (await params).id;
    console.log("method: ",request.method, "    id: ", id);

    try {
        await connectToDB();

        // Find the existing post and delete its file
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        } else {
            if (existingPost.file) {
                const oldFilePath = path.join(process.cwd(), `public${existingPost.file}`);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath); // Remove the old file
                }
            }
        }

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return NextResponse.json(JSON.stringify({message: 'Post not found'}), {status:204});
        }

        return NextResponse.json(JSON.stringify({}), {status:200});
    } catch (error: BodyInit|Error|unknown) {
        console.log(error);
        return NextResponse.json(error, {status:500});
    }
}
