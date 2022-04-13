// //*setitemout(콜백함수, 시간) : 시간 지난 다음에 콜백함수 실행)
setTimeout(() => {
    console.log('Set Time out');
}, 2000); //1 seconds

console.log('끝');

/**************** output
 * 안녕하세요
 * 끝
 * Set Time out
 *
 *
 * Node는 싱글스레드로 동작해서 현재 처리할 수 있는 애들부터 동작
 */

const condition: boolean = false;

const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve("성공");
  } else {
    reject(new Error("reject error!!!"));
  }
}); //pending 상태

//resolve로 실행되면 then을 통해 이행
//reject로 실행되면 catch로 전달
promise
    .then((resolveData): void => {
        console.log(resolveData)
    })
    .catch(error => console.log(error));

// void는 함수의 return 타입 명시하지 않아도 됨
const restaurant = (callback: () => void, time: number): void => {
    setTimeout(callback, time);;
}

const order = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log('[레스토랑 진행 상황 - 음식 주문]');
            resolve('음식 주문 시작');
        }, 1000);
    });
}

const cook = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log('[레스토랑 진행 상황 - 음식 조리 중]');
            resolve(`${progress} -> 음식 조리 중`);
        }, 2000);
    });
};

const serving = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log('[레스토랑 진행 상황 - 음식 서빙 중]');
            resolve(`${progress} -> 음식 서빙 중`);
        }, 2500);
    });
};

const eat = (progress: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        restaurant(() => {
            console.log('[레스토랑 진행 상황 - 음식 먹는 중]');
            resolve(`${progress} -> 음식 먹는 중`);
        }, 3000);
    });
};

order()
    .then(progress => cook(progress)) //order에서 받아온 값을 cook으로 넘겨
    .then(progress => serving(progress)) //cook에서 받아온 값을 serving으로 넘겨
    .then(progress => eat(progress)) //serving으로 받아온 값을 eat으로 넘겨
    .then(progress => console.log(progress)) //promise 체이닝이 끝나 콘솔에 출력
    .catch(error => console.log(error)); //? promise가 여러개 있어서 reject가 발생해도 단일 catch로 가능

Promise.resolve //resolve 또는 reject를 바로 호출하고 싶으면 이렇게 사용
Promise.resolve(123)
    .then(res => {
        throw new Error('에러 발생');
        return 456; 
    })
    .then(res => {
        console.log(res); //절대 실행되지 않음. throw되니까
        return Promise.resolve(789);
    })
    .catch(error => {
        console.log(error.message); //에러 스택이 아닌 에러 메세지만 출력
//     });

let asyncFunc1 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`asyncFun1 - ${msg}`);
        }, 1000);
    });
}

let asyncFunc2 = (msg: string): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`asyncFun2 - ${msg}`);
        }, 1500);
    });
}

// 함수명 - 인자 string promise<string> 반환
let promiseMain1 = (): void => {
    asyncFunc1('server part').then((result: string) => {
        console.log(result);
        return asyncFunc2('김혜정');
    }).then((result: string) => {
        console.log(result);
    });
}
promiseMain1();

// -> async/await 로 변경하면?
const asnycMain = async () => {
    let result = await asyncFunc1('server part');
    console.log(result);
    result = await asyncFunc2('김헤정');
    console.log(result);
}
asnycMain();
