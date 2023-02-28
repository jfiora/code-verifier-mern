import { IUser } from '../interfaces/IUser.interface';
import mongoose from 'mongoose';

export const userEntity = () => {
    let userSchema = new mongoose.Schema<IUser>({
        name: { type: String, required: true },
        email: { type: String, required: true },
        age: { type: Number, required: true },
    });
    return mongoose.models.Users || mongoose.model<IUser>('Users', userSchema);
};
