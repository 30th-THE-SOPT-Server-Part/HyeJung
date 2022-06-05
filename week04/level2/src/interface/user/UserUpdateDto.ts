import { SchoolInfo } from "../school/SchoolInfo";

export interface UserUpdateDto {
    //수정하는거니까 들어올 수도, 안들어 올수도 -> 모든 필드가 optional 해야 함
    name?: string;
    phone?: string;
    email?: string;
    age?: number;
    school?: SchoolInfo;
}