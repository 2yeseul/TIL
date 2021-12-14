# any와 unknown

https://jbee.io/typescript/TS-9-unknown/ 의 포스트를 공부하며 정리한 글입니다. 🙇‍♀️

`any`와 `unknown` 모두 모든 타입의 값이 할당될 수 있다. 하지만 차이점은, `unknown`으로 선언된 변수는 `any`를 제외한 다른 타입의 변수에 할당될 수 없다.

```typescript
let variable: unknown

let anyType: any = variable

let booleanType: boolean = variable; // Error
let numberType: boolean = variable; // Error
// ...
```

또 하나의 특징은, `unknown` 타입으로 선언된 변수는 프로퍼티에 접근하거나 메서드를 호출할 수 없고, 인스턴스를 생성할 수 없다.

```typescript
let variable: unknown

variable.foo.bar // Error
variable[0] // Error
variable.trigger() // Error
variable() // Error
new variable() // Error
```

이와 같은 문제는 Type Guard를 사용하면 해결할 수 있다.

![](https://jbee.io/static/f19e5096c6cc5c8682607b9886b66c88/32ac3/type_diagram.png)
유니온은 쉽게 말하면 합집합이기 때문에, unknown과 다른 타입을 `|`를 통해 유니온 타입으로 합성하면 `unknown`이 된다.

인터섹션은 교집합이기 때문에, unknown과 다른 타입을 `&` 을 통해 인터섹션으로 반환하면, unknown 외의 타입이 반환된다.

```typescript
type unknownType = unknown | string // unknown
type stringType = unknown & string // string
```

any는 타입스크립트의 장점을 해치기 때문에 unknown으로 대체하는 것이 권장된다. 


