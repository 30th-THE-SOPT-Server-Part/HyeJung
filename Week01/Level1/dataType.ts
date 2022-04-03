let nameStr: string = "김혜정";
console.log(nameStr);

let grade: number = 4;
console.log(grade);

let isDeleted: boolean = false;

const sum = (x: number, y: number): number => {
  return x + y;
};

//* 배열 타입 표현
//* const arr: T[] = 초기화
//* let arr: Array<T> = 초기화
// const ages: number[] = [1,2,3,4,5];
const ages: Array<number> = [1, 2, 3, 4, 5];
const anyArray: any[] = [1, 2, 3, "", false];
// console.log(anyArray)

//* 객체 타입
/**
 * Object
 * 자바스크립트의 모든 생성자를 Extend. js의 모든 타입이 할당 가능
 *
 * object
 * 원시타입(객체 ex. 배열은 가능)을 제외한 나머지 모두
 */
// const obj1; object = {

// }
// const obj2; Object = {

// }

const f1 = (obj: object): void => {
  console.log(obj);
};
const f2 = (obj: Object): void => {
  console.log(obj);
};

f2([1, 2, 3, 4]);
f2("string");

f1([1, 2, 3, 4]);
// f1('string'); //오류. 객체타입만 보낼 수 있기 때문

const div = (x: number, y: number): number => {
  // return String(x / y);
  return x / y;
};
console.log(div(6, 2));

//* null과 undefined
//* 자기자신 외의 값 할당 불가. null에는 null만, undefined에는 undefined만
let p: null = null;
let u: undefined = undefined;

//* 타입 단언 (Type assertions): 개발자가 직접 타입을 단언하는 것
// 1. angle-bracket
let myName: any = "김헤정";
// let myNameLength: number = myName.length; //불가. myName은 any. 그래서 str인지 뭔지 몰라
let myNameLength: number = (<string>myName).length; //이런 식으로 형변환해서 myName이 str임을 보장
console.log(myNameLength);

// 2. as
let myName2: any = "서버";
let myName2Length: number = (myName2 as string).length; //myName2는 any지만 string이 확실해!
console.log(myName2Length);

/**
 * (마법의) any
 * 알기 어려운 타입을 받을 때 or 배열에 string, boolean 등 있을 때 일부만 알고 있는 경우 사용
 * !타입 검사를 하지 않음!
 */
