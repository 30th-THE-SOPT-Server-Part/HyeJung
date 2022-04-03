//* 타입을 알고 싶을 땐 typeof

const name = "장서현";
console.log(typeof name);

const age = 18;
console.log(typeof age);

let server = true;
console.log(typeof server);

//안녕하세요. 제 이름은 장서현입니다. 제 나이는 18살입니다.
console.log(
  "안녕하세요. 제 이름은 " + name + "입니다. 제 나이는 " + age + "살입니다."
);
console.log(`안녕하세요. 제 이름은 ${name}입니다. 제 나이는 ${age}살입니다.`); //ES6부터 사용 가능

console.log(typeof null); //type: Object
console.log(typeof undefined); //type X. 아무고토

//* 자주 쓰는 map()
//* Array.map() //배열 내 주어진 원소를 새로운 배열로 생성
let arr = ["안녕", 1, "나는", true];
let num = [1, 2, 3, 4];
const newNumArr = num.map((x) => (x *= 2));
newNumArr.map((x) => {
  x *= 2;
  console.log(x);
});
console.log(newNumArr);

//* for-of
for (const x of newNumArr) {
  console.log(x);
}
