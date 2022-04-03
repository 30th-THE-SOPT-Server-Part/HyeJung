/**
 * Interface
 * 타입 체크를 위해 !여러가지 프로퍼티를 갖는 새로운 타입 정의!
 * 변수, 함수, 클래스 모두 사용 가능
 *
 * interface Sopt { property: T }
 */

// interface ServerPart {
//     name: string;
//     age: number;
//     group: string;
//     mbti: string[];
// }
interface ServerPart {
  name: string;
  age: number;
  group: string;
  mbti?: string[]; //선택적 프로퍼티
}

const serverPart1: ServerPart = {
  name: "김혜정",
  age: 24,
  group: "YB",
};
const serverPart2: ServerPart = {
  name: "김혜정",
  age: 24,
  group: "YB",
  mbti: ["ESFJ"],
};

console.log(serverPart1);
console.log(serverPart2);

// const serverMembers: Array<ServerPart> = [
const serverMembers: ServerPart[] = [
  {
    name: "김혜정",
    age: 24,
    group: "YB",
    mbti: ["ESFJ"],
  },
  {
    name: "김혜정",
    age: 24,
    group: "YB",
    mbti: ["ESFJ"],
  },
];

//* 선택적 프로퍼티는 ?를 붙임
//* 이 프로퍼티는 들어올 수도 안들어올 수도 있음.
//? 선택적 프로퍼티는 함수에서는 사용 못하나???? 된당 !!!! (https://typescript-kr.github.io/pages/functions.html)
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}

let result1 = buildName("Bob");
let result3 = buildName("Bob", "Adams");
