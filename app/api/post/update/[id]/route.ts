// api/post/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Post from '@/models/post'; // Adjust the import based on your structure
import { google } from 'googleapis';
import { Readable } from 'node:stream';


export const config = {
    api: {
        bodyParser: false, // Disable Next.js body parsing to handle file uploads
    },
};


export const PUT = async (req: Request, { params }: { params: Promise<{ id: string }>}) => {
    const id = (await params).id;

    const formData = await req.formData();
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

    await connectToDB();
    try{
        const section = formData.get('section') as string;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const icon = formData.get('icon') as string;
        const color = formData.get('color') as string;
        
        // Find the existing post
        const existingPost = await Post.findById(id);
        if (!existingPost) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        // Handle the file upload
        const file = formData.get('file') as File;
        let fileId: string | null = null;

        if (file) {
            // Delete the old file if it exists
            if (existingPost.file) {
                // Delete the file from Google Drive
                try{
                    await drive.files.delete({
                        fileId: existingPost.file, // File ID to be deleted
                    });
                } catch (error) {
                    console.log('no file found and the error is : ', error);
                }
            }

            const buffer = await file.arrayBuffer(); // Get the file as an ArrayBuffer
            // Upload the file to Google Drive
            try {
                const body = {
                                name: file.name,
                                mimeType: file.type,
                            };
                const media = {
                                mimeType: file.type,
                                body: Readable.from(Buffer.from(buffer)),
                            };

                const response = await drive.files.create({
                    requestBody: body,
                    media: media,
                });
                
                fileId = response.data.id!; // Get the uploaded file ID
    
                // Make the file public
                await drive.permissions.create({
                    fileId: fileId!,
                    requestBody: {
                        role: 'reader',
                        type: 'anyone',
                    },
                });
            } catch (error: BodyInit|Error|unknown|any) {
                console.log('error happended: ', error);
                if (error.response) {
                    // If the error has a response (from Google API)
                    console.error("Error response from Google Drive:", error.response.data);
                }
                return;
            }

        }
        // Update the post in the database
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                section,
                title,
                description,
                file: fileId,
                icon: Number(icon),
                iconColor: color,
            },
            { new: true } // Return the updated document
        );

        if (!updatedPost) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        return new Response(JSON.stringify({ message: 'Post created successfully' }), { status: 200 });
    } catch (error){
        console.log('Error uploading file:', error);
        return NextResponse.json({ error: 'Error saving to database' }, { status: 500 });
    }
};

