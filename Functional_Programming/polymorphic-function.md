# [스칼라로 배우는 함수형 프로그래밍] 다형적 함수: 형식에 대한 추상

임의의 형식에 대해 작동하는 코드를 작성해야 할 때, `다형적 함수` 를 작성한다.
-> OOP의 다형성과는 다르다. 함수형 프로그래밍에서의 다형성은 매개변수적 다형성의 의미이다.

## 단형적 함수의 예

```typescript
function findFirst(s: string[], key: string): number {
  function loop(n: number): number {
    return n >= s.length ? -1 : s[n] === key ? n : loop(n + 1);
  }

  return loop(0);
}
```

- 배열에서 주어진 키를 처음 만난 곳의 index를 리턴하고, 찾지 못하면 -1를 돌려준다.

## 다형적 함수의 예

```typescript
function findFirst<T>(s: T[], p: (n: T) => boolean): number {
  function loop(n: number): number {
    return n >= s.length ? -1 : p(s[n]) ? n : loop(n + 1);
  }

  return loop(0);
}
```

- 함수 p가 현재 요소 s[n]과 부합할 때, 원하는 요소를 찾은 것이므로 해당 index를 리턴해주면 된다.
- 형식에 대한 추상을 배열과 배열 안의 한 요소를 검색하는 함수에 적용

## 익명함수를 통한 고차함수의 호출

```typescript
findFirst([7, 9, 13], (x: number) => x === 9);
```

## 형식에서 도출된 구현

다형적 함수를 구현할 때, 가능한 구현들의 공간이 크게 줄어든다.

- 함수가 어떤 형식 A에 다형적이면, A에 대해서는 오직 인수들로서 함수에 전달된 연산들만 수행할 수 있다.

-- 
## 연습문제
``` typescript
// 2.2
export function isSorted<T>(a: T[], ordered: (x: T, y: T) => boolean): boolean {
  const loop = (n: number): boolean => {
    return n >= a.length ? true : ordered(a[n], a[n - 1]) ? loop(n + 1) : false
  }

  return loop(1)
}

// 2.3
export function curry<A, B, C>(f: (a: A, b: B) => C): (a: A) => (b: B) => C {
  return (a: A) => (b: B) => f(a, b)
}

// 2.4
export function uncurry<A, B, C>(f: (a: A) => (b: B) => C): (a: A, b: B) => C {
  return (a: A, b: B) => f(a)(b)
}

// 2.5
export function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C {
  return (a: A) => f(g(a))
}

``` 