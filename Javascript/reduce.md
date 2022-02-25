# Array.prototype.reduce()

> `reduce()` 메서드는 배열의 각 요소에 대해 주어진 reducer 함수를 실행하고, 하나의 결과값을 반환한다.

```typescript
const arr = [1, 2, 3, 4];

const initialValue = 0;
const sumWithInitial = arr.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  initialValue
);
```

## 구문

> arr.reduce((누적값, 현재값, 인덱스, 요소) => {
> return 결과 값
> }, 초깃값)

# 예시

**특정 key로 grouping**
id를 key로 map 형성

```typescript
const data = [
  {
    id: 1,
    name: "John",
  },
  {
    id: 2,
    name: "Jane",
  },
  {
    id: 3,
    name: "Joe",
  },
];

const personMap = data.reduce<Record<string, { id: number; name: string }>>(
  (map, item) => Object.assign(map, { [item.id]: item }),
  {},
);

console.log(`John: ${personMap[1]}`);
```
