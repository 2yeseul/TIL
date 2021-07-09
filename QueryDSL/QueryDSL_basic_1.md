# QueryDSL (1)

Java의 표준 ORM인 JPA를 통해 개발자는 복잡한 설정이나 일일히 쿼리를 작성할 필요 없이 간단한 설정을 통하여 쿼리를 생성할 수 있다. 하지만 `JpaRepsitory`를 통해 복잡한 쿼리는 작성하기 까다로운데, 특히 복잡한 동적 쿼리가 필요한 경우 난감한 상황이 많았다. 이러한 경우 보통 `@Query` 어노테이션을 통해 네이티브로 쿼리를 작성했지만, 이러한 경우 발생하는 몇 가지 문제점이 있다.

> 1. Type safe 하지 않다.
> 2. 유지보수 하기 어렵다.
> 3. 다양한 조회 기능을 사용하기엔 한계가 있다.
> 4. human error의 발생 가능성 농후

QueryDSL은 문자가 아닌 코드를 통해 안전하게 쿼리를 작성할 수 있고, 복잡한 동적 쿼리를 깔끔하게 작성할 수 있다. 또한 쿼리 작성 과정에서 코드 완성 기능을 사용하여 쿼리를 더 빠르고 안전하게 만들 수 있다. 

# 1. Gradle 설정 
## 1-1. plugin 설정
``` java
plugins {
    // ...
    id "com.ewerk.gradle.plugins.querydsl" version "1.0.10"
}
``` 

## 1-2. 의존성 추가 
``` java
dependencies {
    implementation group: 'com.querydsl', name: 'querydsl-jpa', version: '4.4.0'

}
```

## 1-3. QueryDSL이 생성하는 QClass 경로 생성
QueryDSL이 생성하는 QClass들의 경로를 설정해야 한다. 
``` java 
def querydslDir = "$buildDir/generated/querydsl"

querydsl {
    jpa = true
    querydslSourcesDir = querydslDir
}

sourceSets {
    main.java.srcDir querydslDir
}

configurations {
    querydsl.extendsFrom compileClasspath
}

compileQuerydsl {
    options.annotationProcessorPath = configurations.querydsl
}
``` 

`build.gradle` 을 새로고침하면, gradle 탭에서 다음과 같이 Gradle task에 아래와 같이 생성이 된다.
![gradle](https://media.vlpt.us/images/2yeseul/post/8cb77e5e-89c3-4866-8b98-6df1ac6bb25a/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-07-09%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.36.20.png)

출처

자바 ORM 표준 JPA 프로그래밍

https://velog.io/@aidenshin/Querydsl-Gradle-%EC%84%A4%EC%A0%95

https://github.com/cheese10yun/blog-sample/blob/master/query-dsl/docs/querydsl-custom-repository.md

https://jojoldu.tistory.com/372