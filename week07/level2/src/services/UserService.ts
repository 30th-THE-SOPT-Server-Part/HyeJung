import { PostBaseResponseDto } from "../interface/common/PostBaseResponseDto";
import { UserCreateDto } from "../interface/user/UserCreateDto";
import { UserResponseDto } from "../interface/user/UserResponseDto";
import { UserUpdateDto } from "../interface/user/UserUpdateDto";
import User from "../models/user";
import bcrypt from "bcryptjs";
import { UserSignInDto } from "../interface/user/UserSignInDto";

//async 함수이므로 반환은 기본적으로 promise 형태이므로 
const createUser = async (userCreateDto: UserCreateDto): Promise<PostBaseResponseDto | null>=> {
  try {
    const existUser = await User.findOne({
        email: userCreateDto.email
    });
    if (existUser) return null;
    
    const user = new User({
        name: userCreateDto.name,
        phone: userCreateDto.phone,
        email: userCreateDto.email,
        password: userCreateDto.password,
        age: userCreateDto.age,
        school: userCreateDto.school
    });
    
    const salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash(userCreateDto.password, salt); //plain text -> salt 해서 hashing -> hashing text 로 디비 저장

    await user.save(); //몽고 디비에 해당 값을 저장

    // 몽고 디비는 기본적으로 _가 id 앞에 붙음
    const data = {
        _id: user.id
    };
    
    return data;
  } catch (err) {
    console.log(err);
    throw err; //서비스단에서 발생하는 에러를 throw 하면 index.ts에 있는 핸들러가 받아?
  }
};

const signInUser = async (userSignInDto: UserSignInDto): Promise<PostBaseResponseDto | null | number> => {
    try {
        const user = await User.findOne({
            email: userSignInDto.email
        });
        if (!user) return null;

        const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
        if (!isMatch) return 401;

        const data = {
            _id: user.id
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

//path parameter(params)는 string
const updateUser = async (userId: string, userUpdateDto: UserUpdateDto) => {
    try {
        //findByIdAndUpdate(_id, 업데이트할 내용)
        await User.findByIdAndUpdate(userId, userUpdateDto);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const findUserById = async (userId: string): Promise<UserResponseDto | null> => {
    try {
        const user = await User.findById(userId);
        // const user = await User.findOne({
        //     _id: userId //필터 같은 존재 (sql의 where절 같은)
        // });

        if (!user) {
            return null;
        }

        return user; //null이 아니면 user가 전달
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const deleteUser = async (userId : string) => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export default { 
    createUser, 
    signInUser,
    updateUser,
    findUserById,
    deleteUser
}