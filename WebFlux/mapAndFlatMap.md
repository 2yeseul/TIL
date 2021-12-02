# [Web Flux] map 과 flatMap

## Mono
![mono](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/doc-files/marbles/mono.svg)
|method|description|
|-------|------|
|map|Transform the item emitted by this Mono by applying a synchronous function to it.|
|flatMap|Transform the item emitted by this Mono asynchronously, returning the value emitted by another Mono (possibly changing the value type).|

## Flux 
![flux](https://projectreactor.io/docs/core/release/api/reactor/core/publisher/doc-files/marbles/flux.svg)

|method|description|
|-------|------|
|map|Transform the items emitted by this Flux by applying a synchronous function to each item.|
|flatMap|Transform the elements emitted by this Flux asynchronously into Publishers, then flatten these inner publishers into a single Flux through merging, which allow them to interleave.|


# Differences
## 1. One-to-One vs One-to-Many
``` java 
<V> Flux<V> map(Function<? super T, ? extends V> mapper) 
// – the mapper converts a single value of type T to a single value of type V

Flux<R> flatMap(Function<? super T, ? extends Publisher<? extends R>> mapper) 
– the mapper converts a single value of type T to a Publisher of elements of type R
```

- `map` 의 경우는, 스트림의 아이템들에 대해 `one-to-one` 으로 값 변형을 실행하고, `flatMap` 은 `one-to-many`로 변형한다.

## 2. Synchronous vs Asynchronous
`map` 과 `flatMap` 에서 가장 두드러지는 차이는 바로, 전자는 **동기적**으로 `subscriber`에 item들이 변형이 되어 전달된다는 점이고, 후자는 **비동기적**으로 실행된다는 점이다.

- `map` 은 동기적 연산자인데, 단순히 하나의 값을 다른 하나로 변환해주는 메서드일 뿐이다. 이 메서드는 호출한 곳과 **같은 스레드**에서 실행된다.