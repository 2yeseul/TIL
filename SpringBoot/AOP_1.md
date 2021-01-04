# AOP - (1)

# 정의

`DI`가 애플리케이션 모듈들 간의 결합도를 낮춰준다면, `AOP`는 애플리케이션 전체에 걸쳐 사용되는 동일한 기능을 `재사용`하도록 지원하는 것이다.

`AOP`는 `Aspect-Oriented Programming` 의 약자이고, 이를 번역하면 `관점 지향 프로그래밍`이다. `DI`가    `의존성(new)`에 대한 주입이라면, `AOP`는 `로직(code)`에 대한 주입이다.

![https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile3.uf.tistory.com%2Fimage%2F2473C33D58496A2A0F6DF9](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile3.uf.tistory.com%2Fimage%2F2473C33D58496A2A0F6DF9)

출처 - [https://jojoldu.tistory.com/71?category=635883](https://jojoldu.tistory.com/71?category=635883)

- `핵심기능`에서 각각의 모듈을 바라봤을 때, 각각의 모듈들은 공통된 요소가 없다.
- 하지만 `부가기능` 에서 바라본다면, `before()` 와 `after()` 가 공통된다. 이를 `횡단 관심사`(cross-cutting concern) 이라고도 한다.

# OOP와 AOP

## OOP

비즈니스 로직의 모듈화

- `모듈화`의 핵심 단위는 비즈니스 로직

## AOP

인프라 혹은 부가기능의 모듈화

- 로깅, 보안, 트랜잭션 등
- 각각의 모듈들의 주 목적 외에 필요한 부가적인 기능
- `공통된 기능 재사용`

OOP에서도 상속과 위임을 통해 공통된 기능을 재사용하지만, 전체 어플리케이션 여기저기에서 사용되는 부가기능들을 상속과 위임으로 처리하기에는, 모듈화를 깔끔하게 처리하기 어렵다.

### 장점

- 어플리케이션 전체에 흩어진 공통기능이 하나의 장소에서 관리됨
- 다른 서비스 모듈들이 본인의 목적에만 충실하고 그 외 사항들은 신경쓰지 않아도 됨

### 용어

- `타겟(Target)`

    부가기능을 부여할 대상

- `애스펙트(Aspect)`

    객체지향의 모듈을 오브젝트로 부르는 것과 비슷하게, 부가기능의 모듈을 애스펙트라고 부른다.

    핵심기능에 부가되어 의미를 갖는 특별한 모듈이다.

    부가될 기능을 정의한 `어드바이스`와, 어드바이스를 어디에 적용할지 결정하는 `포인트컷`을 함께 갖고 있다.

    - `Advice` = [언제(When) + 무엇을(What)], `PointCut` = [어디에(Where)]
    - 따라서 `Aspect` = When + Where + What (언제, 어디에, 무엇을)
- `어드바이스(Advice)`

    실질적으로 부가기능을 담은 구현체이다. 어드바이스는 타겟 오브젝트에 종속되지 않기 때문에, 순수하게 `부가기능에만 집중할 수 있다.`

    - `Pointcut` 에 적용할 로직, 즉 메서드 + 언제라는 개념포함
    - 어드바이스는 애스펙트가 '무엇'을 '언제' 할지를 정의한다.
- `포인트컷(PointCut)` : 타깃 클래스의 타깃 메서드 지정자

    부가기능이 적용될 대상(method)를 선정하는 방법이다.

    즉, 어드바이스를 적용할 `조인포인트`를 선별하는 기능을 정의한 모듈이다.

- `조인포인트(JoinPoint)`

    `어드바이스`가 적용될 수 있는 위치이다. 다른 AOP 프레임워크와는 달리, Spring에서는 메소드 조인포인터만 제공한다. 따라서 Spring 내에서 조인포인트라고 하면 메소드를 가리킨다고 생각하면 된다.

    - 스프링 AOP는 인터페이스를 기반으로 하고, 인터페이스는 추상메서드의 집합체이다. 따라서 스프링AOP는 `메서드에만 적용할수 있다.`

    `PointCut` 의 후보가 되는 모든 메서드들이 `JoinPoint`, 즉 Aspect 적용이 가능한 지점이 된다.

    - 따라서 `JoinPoint`란 Aspect 적용이 가능한 모든 지점이고, PointCut은 Aspect를 적용할 수 있는 지점 중 일부이므로, JointPoint의 부분집합이다.
    - 따라서 스프링 AOP에서 JoinPoint란 스프링 프레임워크가 관리하는 빈의 모든 메서드에 해당한다.
- `프록시(Proxy)`

    타겟을 감싸서 타겟의 요청을 대신 받아주는 `랩핑 오브젝트`이다. 호출자(client)을 호출하게 되면 ,타겟이 아니라 타겟을 감싸고 있는 프록시가 호출된다. 타겟 메소드 실행전에 `선처리`, 타겟 메소드 실행후 `후처리`를 실행시킨다.

- `인트로덕션(Introduction)`

    타켓 클래스에 `코드 변경없이` 신규 메소드나 멤버변수를 추가하는 기능이다.

- `위빙(Weaving)`

    지정된 객체에 애스펙트를 적용하여, 새로운 프록시 객체를 생성하는 과정이다. 예를들어 A라는 객체에 트랜잭션 애스팩트가 지정되었다면, A라는 객체가 실행되기 전 커넥션을 오픈하고, 실행이 끝나면 커넥션을 종료하는 기능이 추가된 프록시 객체가 생성된다. 그리고 그 프록시 객체가 앞으로 A객체가 호출되는 시점에 사용된다. 이 프록시 객체가 생성되는 과정이 위빙이다. 스프링에서는 `런타임` 때 프록시 객체가 생성된다.

### 핵심 요약

- 스프링 AOP는 인터페이스 기반이다.
- 스프링 AOP는 프록시 기반이다.
- 스프링 AOP는 런타임 기반이다.



출처

https://jojoldu.tistory.com/71?category=635883

스프링 입문을 위한 자바 객체 지향의 원리와 이해