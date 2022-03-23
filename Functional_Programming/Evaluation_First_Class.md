# 평가와 일급

# 평가
- 코드가 계산(Evaluation) 되어 값을 만든다.
```
1 + 2
(1 + 2) + 4
3 + 4
[1, 2]
[1, 2 + 3]
[1, 2, ...[3, 4]]
```

# 일급
- 값으로 다룰 수 있다.
- 변수에 담을 수 있다.
- 함수의 인자로 사용될 수 있다.
- 함수의 결과로 사용될 수 있다.

``` Javascript
const a = 10;
const addTen = a => a + 10;
const result = addTen(a);
```

## 일급함수
- 함수를 값으로 다룰 수 있다.
- 조합성과 추상화의 도구

``` Javascript
const addFive = a => a + 5;
console.log(addFive); // a => a + 5
console.log(addFive(5)); // 10

const f1 = () => () => 1;
log(f1()); // () => 1

const f2 = f1();
log(f2); // () => 1
log(f2()); // 1
```
출처 - 인프런 함수형 프로그래밍 강의