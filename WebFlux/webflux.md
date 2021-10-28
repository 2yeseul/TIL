# Spring WebFlux
(발번역, 의역, 내용 안맞을 수 있음.. 개인 정리용)
# 1.1 Overview
> 🤔 왜 `Spring WebFlux`가 만들어졌을까?

이 질문에 대한 부분적인 답변은..
> 1. 적은 수의 스레드를 통해 `동시성(concurrency)`을 처리하고
> 2. 더 적은 hardware 자원들로 `non-blocking` 처리를 가능하게 하기 위해

이전의 Servlet.3.1은 non-blocking I/O에 대한 API를 제공했으나, 이는 
동기식이거나, blocking인 나머지의 API와 동떨어졌다(?)

이러한 점이 런타임에서의 모든 non-blocking 에 걸쳐 사용될 수 있는 새로운 공통 API를 만들게 된 계기였다. Netty와 같이 비동기적이고, non-blocking된 환경에서 만들어진 서버들 때문에 더 중요성이 대두되었다.

또 다른 이유는, `함수형 프로그래밍`이다. 
Java5의 어노테이션, Java8의 람다는 자바에서의 함수형 API 기능을 만들 수 있는 기회를 제공하였는데..

자바가 함수형 프로그래밍을 가능하게 하면서,
1. non-blocking application과
2. (굳이 번역하자면..?) 비동기 로직에 대해 선언적 구성을 허용하는, 연속성 style의 API들에게 (-> `CompletableFuture` and `ReactiveX` 등등...)
아주 큰 도움이 되었다.

함수형 프로그래밍이 자바에서 사용가능하게 됨으로써, non-blocking과 async를 사용하는 애플리케이션이 생산성이 좋아졌다..라는 정도로 이해하면 좋을 것 같다.

프로그래밍 모델 수준에서, `Java8` 로 인해

1. 함수형 endpoints와
2. 어노테이션을 사용하는 컨트롤러를
제공하는 `Spring WebFlux` 를 사용할 수 있게 되었다.

## 1.1.1 Reactive 의 정의

`reactive`라는 용어는, I/O 이벤트나 마우스 이벤트와 같은 UI 컨트롤러에 발생하는 **변화에 반응하는 것**을 중심으로 구축된 프로그래밍 모델이다. 

(변화가 발생하면 -> 이벤트 생성(publish) -> 이벤트 수신 후 데이터 처리)

이러한 맥락에서 `non-blocking` 은 reactive인데, blocked 대신 작업이 완료되거나 데이터가 사용가능하다는 알림에 반응할 수 있게 된다. 

동기에서는, 호출하는 사람이 응답을 받을 때 까지 기다려야한다는 단점이 있다. 하지만 non-blocking 코드에서는, 데이터 수신자가 충분히 처리할 수 있도록, 이벤트 발행 속도를 제어하는 것이 중요해졌다.

Reactive Stream은 back단에서 비동기적 컴포넌트들 사이에서의 상호작용이 정의되어 있다. 

Reactive Stream의 목적은 subscriber가 publisher로 하여금 데이터 생산 속도를 조절하게 하는 데에 있다.

## 1.1.2 Reactive API
Reactive Streams는 `상호 운용성`에 있어 중요한 역할을 한다. 이 것은 라이브러리와 인프라 구성 요소에 관심이 있지만, 지나치게 low level이기 때문에 애플리케이션의 API로 사용하기에는 다소 무리가 있다. 

비동기 로직을 구성하기 위해서는 더 고수준이고 풍부한, 함수형 API가 필요하다. - Java 8의 Stream과 유사하지만, Collection에 국한되어서는 안된다. 이 것이 reactive 라이브러리들이 하는 역할이다.

`Reactor` 는 스프링 웹플럭스가 채택한 reactive 라이브러리인데, 이 라이브러리는 `Mono`와 `Flux`라는 API 타입을 제공한다. 

`Mono`는 0..1, `Flux`는 0..N 까지의 Data 시퀀스를 표현한다. `Reactor` 는 Reactive Streams 라이브러리이므로 non-blocking 작업을 가능하게 한다.

WebFlux는 중심 라이브러리로 Reactor를 요구하지만 Reactive Streams의 다른 리액티브 라이브러리 역시 사용 가능하다. 

일반적으로 WebFlux는 `input`으로 `Publisher`를 사용하고, 이 것을 내부적으로 Reactor type으로 변환 후, 그 것을 사용하여 Flux나 Mono로 리턴한다. 따라서 input으로 어떤 `Publisher` 도 사용 가능하며, reactive 라이브러리와 함께 output에서 작업을 수행할 수 있다.

## 1.1.3 Programming Models
스프링 웹플럭스는 두 개의 프로그래밍 모델을 제시하는데, 다음과 같다.
### `Annotated Controllers`
스프링 MVC와 일치하고, `spring-web` 모듈에 바탕을 둔다. 스프링 MVC와 웹플럭스의 컨트롤러 모두 reactive 리턴 타입을 지원하고, 결과적으로 이 둘을 분리하는 것은 쉽지않다. 한가지 주목할만한 차이점이라 한다면, 웹플럭스는 `@RequestBody` 인자 역시 지원한다.

### `Functional Endpoints`
람다를 기반으로한, 경량의 함수형 프로그래밍 모델이다. 이 것을 작은 라이브러리나 혹은 애플리케이션이 route 하거나 request를 처리하는데 사용하는 유틸리티들의 집합체로도 생각할 수 있다. `anntated controller` 와의 큰 차이점은 애플리케이션이 시작과 끝까지 request를 처리하는 것 vs 어노테이션을 통해 의도를 선언하고 콜백하는 것 이다.

## 1.1.4 Applicability
![img](https://docs.spring.io/spring-framework/docs/current/reference/html/images/spring-mvc-and-webflux-venn.png)

## 1.1.6 Performance
리액티브와 non-blocking이 보통 애플리케이션을 더 빠르게 하진 않지만, 병렬적으로 외부의 web client를 사용하는 경우엔 빠르다. 전체적으로 보면 non-blocking을 사용할 때 더 많은 일을 해야하고, 이 것이 처리시간을 조금 더 증가시킬 수는 있다.

리액티브와 non-blocking 을 사용했을 때의 주요 이점은, 적고 정해진 개수의 스레드와 적은 더 적은 메모리를 통해 가용성을 확장할 수 있다는 것이다. 이것은 애플리케이션들을 실행 시 더 탄력있게 만드는데, 애플리케이션들이 더 예측가능한 방향으로 확장하기 때문이다. 이러한 혜택을 받기 위해선 약간의 지연시간을 가질 필요는 있다. (느리고 예측 불가능한 네트워크의 IO를 포함하여,,)




---------
출처

- https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#webflux-why-reactive

참고
- https://velog.io/@wonhee010/%EB%8F%99%EA%B8%B0vs%EB%B9%84%EB%8F%99%EA%B8%B0-feat.-blocking-vs-non-blocking