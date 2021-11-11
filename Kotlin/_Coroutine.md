# Coroutine
비동기 프로그래밍을 지원하는 여타 다른 언어들과는 다르게 코틀린에서는 `async`와 `await`가 키워드들도 아니며,
표준 라이브러리들에 포함도 안되어있다. 대신 코틀린에서는 `suspend function` 을 도입했는데, `futuer`나 `promise`로 제공되었던 이전의 비동기 작업들에 비해
오류 발생이 적고 훨씬 안전하다.

코루틴은 중지할 수 있는(suspendable) 연산의 인스턴스 이다. 쓰레드와 개념적으로 유사한데, 
나머지 코드들과 동시에 작동하는 코드 블록을 실행해야 한다는 맥락에서 그러하다. 

하지만 코루틴은 특정 스레드에 바인딩 되지 않는다.
코루틴은 한 스레드에서 실행을 중지하면, 다른 스레드에서 다시 시작할 수 있다.

코루틴을 경량 스레드 쯤으로 생각할 수도 있지만, 실제로는 코루틴과 스레드는 여러 중요한 차이점이 있다. 코루틴은 `협력하는 멀티태스킹` 을 기반으로 하기 때문이다.

코루틴은 단지 suspending function 들을 실행하고 중지 지점마다 context를 옮겨 다니는 것이다. 


**예제**

``` kotlin
fun main() = runBlocking { // this: CoroutineScope
    launch { // launch a new coroutine and continue
        delay(1000L) // non-blocking delay for 1 second (default time unit is ms)
        println("World!") // print after delay
    }
    println("Hello") // main coroutine continues while a previous one is delayed
}
```

## launch
`launch` 는 코루틴 빌더이다. 독립적으로 작동하는 나머지의 코드와 동시에 새로운 코루틴을 시작한다. 

## delay 
`delay`는 특정 시간동안 코루틴을 멈추는 특별한 suspend 함수이다. 

> 코루틴을 일시 중단하면 사용중인 스레드를 block 하는 것이 아니라, 다른 코루틴으로 하여금 실행하고 본인들의 코드에 사용중이었던
스레드를 사용하도록 하는 것이다.

## runBlocking
`runBlocking` 역시 일반적인 메인 함수에서 코루틴이 아닌 것과 `runBlocking` 내의 코루틴을 연결하는 다리와 같은 코루틴 빌더이다.

`runBlocking` 의 의미는 이 코루틴을 실행하는 스레드가 요청한 시간동안 실행이 끝나기까지 block 되기 때문이다.  

# Structured concurrency
코루틴은 구조화된 동시성의 원칙을 따르는데, 코루틴은 코루틴의 생명주기를 제한하는 특정한 `CoroutineScope` 내에서만 실행될 수 있다는 것을 뜻한다.

# Scope Builder

`coroutineScope` 빌더를 사용해서 스스로의 범위를 지정할 수도 있다. 코루틴의 범위를 생성하고, 하위 작업들이 전부 실행될 때 까지 끝나지 않는다.
`runBlocking`과 `coroutineScope` 빌더는 그들의 하위 작업들이 끝날 때 까지 기다린다는 점에서 비슷해 보인다. 주요한 차이점은 다음과 같다 :

`runBlocking`은 대기하는 동안 최근 사용된 thread를 block하지만, coroutineScope는 단순히 정지만 시키기 때문에 다른 곳에서도 해당 스레드를 사용할 수 있다.

이러한 차이점 때문에, `runBlocking`은 보통의 함수이고 `coroutineScope`은 suspend function 인 것이다.

# Suspending function
대부분의 코틀린 함수들은 `suspend` 가 붙어있는 suspending function 인데, 일반 함수와 큰 차이는 없다. 

다만 suspend 함수들은 0개 이상의 `중지 지점`을 갖는다. 이 중지 지점은 보통 함수 내에 존재하는데, 함수의 실행을 중지하고 나중에 실행하는 선언문이 있다. 

non-suspending 함수는 suspending 함수를 즉각적으로 부를 수 없는데, 그들이 suspension point들을 지원하지 않기 때문이다.
suspending 함수는 아무런 제약없이 non-suspending 함수를 호출할 수 있다. 물론 이러한 호출이 중지 지점을 만들어내는 것은 아니다.
