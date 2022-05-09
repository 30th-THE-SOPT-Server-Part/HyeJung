import { PostBaseResponseDto } from "../interface/common/PostBaseResponseDto"
import { UserCreateDto } from "../interface/user/UserCreateDto"
import { UserResponseDto } from "../interface/user/UserResponseDto"
import { UserUpdateDto } from "../interface/user/UserUpdateDto";
import User from "../models/User";

const existUser = async (email: string) : Promise<Boolean> => {
    try {
        const user = await User.findOne({ email: email });

        return user ? true : false;
    } catch(error) {
        console.log(error);
        throw error;
    }
} 

const createUser = async (userCreateDto: UserCreateDto): Promise<PostBaseResponseDto> => {
    try {
        const user = new User(userCreateDto);
        await user.save();

        const data = {
            _id: user.id
        };
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const updateUser = async (userId: string, userUpdateDto: UserUpdateDto): Promise<void> => {
    try {
        await User.findByIdAndUpdate(userId, userUpdateDto);
    } catch (error) {
        console.log(error);
        throw error;
    }
} 

const findUserById = async (userId: string): Promise<UserResponseDto | null> => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const deleteUser = async (userId: string): Promise<void> => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export default {
    existUser,
    createUser,
    updateUser,
    findUserById,
    deleteUser,
};