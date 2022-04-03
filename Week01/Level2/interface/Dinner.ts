// import { Member } from './Member'; // default 를 안적는 경우
import Member from './Member';

export default interface Dinner{
    members: Member[];
    shuffle: (array: Member[]) => Member[];
    organize: (array: Member[]) => void;
}