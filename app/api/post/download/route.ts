import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const fileId = url.searchParams.get('fileId');  // Get fileId from query parameters

        if (!fileId) {
            return NextResponse.json({ error: 'fileId is missing' }, { status: 400 });
        }

        // Construct the public download URL
        const publicDownloadUrl = `https://drive.google.com/uc?id=${fileId}&export=download`;

        // Send the URL to the client (no need for authentication)
        return NextResponse.json({ downloadUrl: publicDownloadUrl }, { status: 200 });

    } catch (error) {
        console.error('Error generating public download link:', error);
        return NextResponse.json({ error: 'Error generating download link' }, { status: 500 });
    }
};
