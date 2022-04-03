//* Object : {key : value} 형태. 속성은 함수가 될 수 있음
const sopt = {
  season: 30,
  group: ["YB", "OB"],
  part: ["서버", "기획", "디자인", "안드로이드", "웹", "iOS"],
  president: "김혜정",
  inroduce: function () {
    this.part.map((name) => {
      console.log(`솝트 내 파트는 ${name} 파트가 있어요!`);
    });
  },
};

console.log(sopt.group);
sopt.inroduce();

//* Array : 배열인데, JS에서는 !객체타입!
//* 타입 고정되어 있지 않음 -> 같은 배열 내 여러 타입 요소 있을 수 있음
//* 특정 배열 요소가 비어있을 수 있음
//* 기본 형태 arr = [item1, item2, item3]
let array = [1, 2, { item: "value" }, "string", 5, , 6];
console.log(array);

let array2 = [
  {
    name: "김소령",
    age: 5,
  },
  {
    name: "박정무",
    age: 15,
  },
];
console.log(array2);
console.log(typeof array2);

//* Function == 일급객체
/**
 * 일급 객체란,
 * 1. 변수 or 데이터 구조에 담을 수 있음
 * 2. 다른 함수에 파라미터로 전달 가능
 * 3. 반환 값으로 사용 가능
 * -> 모두 충족하면 일급 객체 (특별한 종류의 값)
 */

//* 함수 선언식
/**
 * function name (a, b) { return }
 * 선언문이 정의되기 전에 사용 가능
 */
// console.log(menu2('gd'));
// function menu(dinner){
//     return `오늘 메뉴는 ${dinner}입니다.`;
// }

// const str2 = menu('삼겹살');
// console.log(str2);
// console.log(menu('삼겹살'));

//* 함수 표현식 (=> 함수)
/**
 * let name = (a, b) => { return };
 * 실제 실행 흐름이 해당 함수에 도달했을 때 생성 (그때부터 사용 가능)
 */
const menu = (dinner) => {
  return `오늘 메뉴는 ${dinner}입니다.`;
};
const str2 = menu("곱창");
console.log(str2);
console.log(menu("곱창"));

//* 함수를 파라미터에 담을 수 있음. 일급객체니까
const func = (num) => {
  return num * num;
};
const multiple = (func, num) => {
  console.log(func(num));
};

multiple(func, 3);

//* == vs ===
//* == : 값 비교                     /!=
//* === : 값, 타입 비교 (엄격한 비교)    /!==
let a = 2 + 3;
// let x = 5;
let x = "5";
let b = 2 * 3;
let c = 3 - 2;
let d = 4 / 2;

if (a === x) {
  console.log("a === x");
}

if (a == x) {
  console.log("a == x");
}

if (a != x) {
  console.log("a != x");
}

if (a !== x) {
  console.log("a != x");
}

if (a === 5 && d === 2) {
  console.log("hi im &&");
}

if (a === 4 || d === 2) {
  console.log("hi im ||");
}

//* typeof 로 비교연산 시 사용하려면 typeof의 return이 string이기 때문에,
//* 아래와 같이 비교해야 함
if (typeof a === "number") {
  console.log(a);
}
