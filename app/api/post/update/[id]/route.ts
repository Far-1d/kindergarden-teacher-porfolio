// api/post/route.ts
import { NextResponse } from 'next/server';
import { connectToDB } from '@/lib/database';
import Post from '@/models/post'; // Adjust the import based on your structure
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export const config = {
    api: {
        bodyParser: false, // Disable Next.js body parsing to handle file uploads
    },
};


export const PUT = async (req: Request, { params }: { params: Promise<{ id: string }>}) => {
    const id = (await params).id;

    await connectToDB();
    try{
        // const form = new IncomingForm();
        const formData = await req.formData();
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
        let filePath: string | null = null;
        
        if (file) {
            // Delete the old file if it exists
            if (existingPost.file) {
                const oldFilePath = path.join(process.cwd(), `public${existingPost.file}`);
                if (fs.existsSync(oldFilePath)) {
                    fs.unlinkSync(oldFilePath); // Remove the old file
                }
            }

            // save new file
            const buffer = await file.arrayBuffer(); // Get the file as an ArrayBuffer
            const originalFileName = file.name;

            const extension = path.extname(originalFileName); // Get the file extension
            const baseName = path.basename(originalFileName, extension); // Get the base name without extension
            const randomString = crypto.randomBytes(3).toString('hex'); // Generate a random string
            // Create new filename
            const newFileName = `${baseName}-${randomString}${extension}`;

            filePath = path.join(process.cwd(), `public/files/${section}`, newFileName);
            
            const dirPath = path.join(process.cwd(), `public/files/${section}`);
            // Ensure the directory exists
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
            }

            // Save the file to the desired location
            fs.writeFileSync(filePath, Buffer.from(buffer)); // Write the buffer to a file
        }
        // Update the post in the database
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {
                section,
                title,
                description,
                file: filePath ? `/files/${section}/${path.basename(filePath)}` : existingPost.file,
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

