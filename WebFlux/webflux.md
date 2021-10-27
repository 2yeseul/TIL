# Spring WebFlux

# 1.1 Overview
> 🤔 왜 `Spring WebFlux`가 만들어졌을까?

이 질문에 대한 부분적인 답변은..
> 1. 적은 수의 스레드를 통해 `동시성(concurrency)`을 처리하고
> 2. 더 적은 hardware 자원들로 확장 가능한 
`non-blocking` 기술에 대한 요구로부터 만들어졌다.

이전의 Servlet.3.1은 non-blocking I/O에 대한 API를 제공했으나, 이는 나머지의 Servlet API(동기식이거나 blocking인 것들)에서 멀어지게 했다. (?)

이러한 점이 런타임에서의 어떠한 non-blocking 에 걸쳐 사용될 수 있는 새로운 공통 API를 만들게 된 계기였다. Netty와 같이 비동기적이고, non-blocking된 환경에서 만들어진 서버들 때문에 더 중요하다.

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


---------
출처

- https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html#webflux-why-reactive

참고
- https://velog.io/@wonhee010/%EB%8F%99%EA%B8%B0vs%EB%B9%84%EB%8F%99%EA%B8%B0-feat.-blocking-vs-non-blocking