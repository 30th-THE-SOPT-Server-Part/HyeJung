import { SchoolInfo } from "../school/SchoolInfo";

//age와 school은 req로 안받을 수도 있어! 
export interface UserCreateDto {
    name: string;
    phone: string;
    email: string;
    password: string;
    age?: number;
    school?: SchoolInfo;
}