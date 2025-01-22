// api/post/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Post from '@/models/post'; // Adjust the import based on your structure
import { google } from 'googleapis';
import { Readable } from 'node:stream';


export const DELETE = async (request:Request, {params}:{params: Promise<{ id: string }>}): Promise<NextResponse> => {
    const id = (await params).id;

    const formData = await request.formData();
    const refreshToken = formData.get('refreshToken') as string;

    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
    );

    // Set credentials (you might want to store these securely)
    oauth2Client.setCredentials({
        refresh_token: refreshToken,
    });
    
    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    try {
        await connectToDB();

        // Find the existing post and delete its file
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        } else {
            if (existingPost.file) {
                // Delete the file from Google Drive
                await drive.files.delete({
                    fileId: existingPost.file, // File ID to be deleted
                });
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
