import { Schema, model, models } from 'mongoose';

const postSchema = new Schema({
    section: {
        type: String,
        required: [true, 'section is required'],
    },
    title: {
        type: String,
        required: [true, 'Prompt is required']
    },
    description: {
        type: String,
        required: false
    },
    file: {
        type: String,
        required: false
    },
    icon:{
        type: Number,
        required: [true, 'Icon is required']
    },
    iconColor:{
        type: String,
        required: [true, 'Icon is required']
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Post = models.Post || model('Post', postSchema);

export default Post;