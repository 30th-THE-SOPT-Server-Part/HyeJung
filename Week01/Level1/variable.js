//* 재선언은 var
// var name = '김혜정';
// var name = '고구마';

// console.log(name);

// let name2 = '감자';
// let name2 = '고구마';

// console.log(name2);

//* 재할당은 var, let, const는 선언과 동시에 초기화만
// let name3 = 'dlehdgus';
// name3 = '주효식';

// console.log(name3);

// const name4 = '김루희';
// name4 = '박진형';

// console.log(name4);

//* scope == 범위
//* function scope == 함수 범위 내에서만 사용 가능한 전역 변수 (var)
//* block scope == { } 사이에서 사용 가능한 변수 (let, const)

// if(true){
//     var x = 'var variable';
// }
// console.log(x);

// let y;
// if(true){
//     const y = 'const variable';
// }
// console.log(y); //오류 block scope 이기 때문

function foo() {
  if (true) {
    var name = "hyejung";
    console.log("if - block - ", name);
  }
  console.log("function - block - ", name);
}
console.log("global - ", name);

//* var, let, const 중 es6부터는 let, const 사용을 권장 (var의 재선언, 재할당, 호이스팅 문제로 인해)
