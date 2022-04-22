# 고차함수 - 함수를 함수에 전달

# 값으로서의 함수
순수한 함수적 프로그램을 작성할 때에 **다른 함수를 인수로 받는 함수를 작성하는 것이 유용**한 경우가 많다. 
-> 고차함수

``` typescript
function factorial(n: number): number {
  const go = (n: number, acc: number): number => {
    n <= 0 ? acc : go(n-1, n * acc)
  }

  go(n, 1)
}
``` 
 - go의 인수들은 루프의 상태에 해당한다. 

 