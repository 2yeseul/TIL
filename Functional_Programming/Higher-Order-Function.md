# 고차함수
- 함수를 값으로 다루는 함수

## 함수를 인자로 받아서 실행하는 함수
``` javascript
const apply1 = f => f(1);
const add2 = a => a + 2;

apply1(add2) // 3
apply1(a => a - 1) // 0

const times = (f, n) => {
  let i = - 1;
  while (++i < n) {
    f(i);
  }
}

times(log, 3); 
times(a => a + 10, 3);
```
=> applicated programing

## 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)
``` javascript
const addMaker = a => b => a + b; // 함수이자 a를 기억하는 함수(클로저)
const add10 = addMaker(10);

log(add10) // b => a + b (함수를 리턴)
log(add10(5)) // 15
```
