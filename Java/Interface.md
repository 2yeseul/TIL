# 인터페이스

인터페이스는 클래스와 비슷한 `레퍼런스 타입`인데, `abstract class` 보다 추상화 정도가 높기 때문에 abstract class와 달리, 몸통을 갖춘 일반 메서드와 멤버변수를 가질 수 없다. 

따라서 기능을 명시적으로 선언하는 역할로서 `abstract 메서드`와 `상수(static final)`, `default 메서드` `static 메소드`(Java 8부터), `private 메소드`만으로 이루어져 있다. 구현된 코드가 없으므로 당연히 인터페이스를 통해 인스턴스를 생성할 수 없다.

## 정의

```cpp
(public) interface interfaceName {
	(public static final) type constantName = value;
	(public abstract) returnType methodName (...);
}
```

- `필드`는 `public static final` 을 생략하여도 자동으로 삽입된다.
- `메서드`는 모두 구현코드가 없는 `abstract 메소드`이다. `public abstract`를 적지 않아도 컴파일 과정에서 자동으로 추상 메소드로 변환된다.

실제로 컴파일러가 `public static final` 과 `public abstract`를 자동으로 삽입해주는지 바이트코드 뷰어로 살펴보았다.

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTwIzB%2FbtqSNmYEf0P%2FxAxbBFJiKU6rMN51VAc3LK%2Fimg.png](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FTwIzB%2FbtqSNmYEf0P%2FxAxbBFJiKU6rMN51VAc3LK%2Fimg.png)

인터페이스에서는 `public static final` 과 `public abstract`를 쓰지 않았지만, 컴파일된 바이트코드에서는 `public static final`과 `public abstract`가 자동으로 삽입된 것을 알 수 있다.

## 구현

인터페이스 자체로는 인스턴스(객체)를 생성할 수 없고, 추상메소드를 갖기 때문에 이 것을 `구체화`할 클래스가 필요하다. `implements` + 인터페이스명 을 통해 인터페이스를 구현할 수 있다.