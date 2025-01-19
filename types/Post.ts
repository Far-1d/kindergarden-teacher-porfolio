// types/Post.ts
export interface Post {
    _id: string;             // MongoDB document ID
    section: string;           // Section of the post
    title: string;           // Title of the post
    description?: string;    // Description of the post (optional)
    file?: string | null;    // Path to the uploaded file (optional)
    icon: number;            // Icon identifier
    iconColor: string;       // Color associated with the icon
    __v: number;             // Version key (Mongoose specific)
}
