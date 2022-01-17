# jest.fn()

`jest` 에서도 junit의 `given - when - then` 패턴의 `when(mockMethod.call()).thenReturn(mockValues);` 와 같이 mock 함수의 호출과 그에 대응하는 mock 데이터를 리턴을 가정하는 기능을 제공한다.

테스트 하고자 하는 모듈에 의존성을 갖는 함수를 다음과 같이 선언한다.

``` typescript
const findById = jest.fn()
```
테스트 시, 이 함수가 특정 상황에서 특정 데이터를 반환하게끔 하고 싶은 경우 다음과 같은 메소드를 사용할 수 있다.
``` typescript
findById.mockReturnValue({ id: 1 })
```
