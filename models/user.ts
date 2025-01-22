import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        match: [/^[a-zA-z0-9._]{8,20}$/, 
            'Username invalid, it should contain 8-20 alphanumeric letters and be unique'],
    },
})

//ensure the model was not created (because nextjs recreates this file when it is needed)
const User = models.User || model('User', UserSchema);

export default User;