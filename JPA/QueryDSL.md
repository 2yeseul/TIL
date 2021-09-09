# QueryDsl 사용기 (2)

JPA는 객체와 DB를 매핑해주어 개발자가 일일히 쿼리를 작성할 필요가 없어 매우 편리하지만, 복잡한 쿼리를 사용해야 하는 경우 `JpaRepository`만으론 한계가 있다. JPA에서도 다양한 객체지향 쿼리를 제공하는데, JPQL, Criteria, Native Query가 JPA에서 공식적으로 지원하는 것들이다. QueryDSL은 JPA에서 공식적으로 지원하는 라이브러리는 아니다. 

## JPQL, Criteria, Native Query, QueryDsl 간단 비교

### JPQL(Java Persistence Query Language)

테이블이 아닌 엔티티 객체를 조회하는 객체지향 쿼리이다. (SQL : 데이터베이스 테이블을 대상으로 하는 데이터 중심의 쿼리)

SQL을 추상화했기 때문에 특정 DB SQL에 의존하지 않는다.

SQL보다 간결하다.

### Criteria

Criteria는 JPQL을 생성하는 빌더 클래스이다. 

**Criteria의 장점은 문자가 아닌, `query.select(m).where(..)` 처럼 프로그래밍 코드로 JPQL을 작성할 수 있다는 점이다.**

예를들어 JPQL에서, *select m from Membeeee m* 처럼 오타가 존재하는 경우, 컴파일 타임에 에러를 발견할 수 없고 런타임 시점에서 에러를 발견할 수 있다. 문자기반의 쿼리의 단점이다.

### JPQL vs Criteria

1. Criteria는 컴파일 시점에 에러를 발견할 수 있다.
2. IDE를 사용하는 경우 코드 자동완성을 활용할 수 있다.
3. 동적 쿼리를 작성하기 편하다.

하지만 Criteria가 가진 이러한 장점에도 불구하고, 이 장점을 상쇄할 정도로 복잡하고 장황하다는 단점이 있다.

사용하기 불편한 것은 물론이고, Criteria로 작성한 코드도 한 눈에 들어오지 않는다는 단점이 있다.

### QueryDSL

QueryDSL 역시 Criteria 처럼 빌더 형태로 쿼리를 작성한다. QueryDSL의 장점은 코드 기반이면서 단순하고 사용하기도 쉽다. 작성한 코드 역시 JPQL과 비슷하여 가독성 역시 좋다. QueryDSL과 Criteria를 비교하면, Criteria는 굉장히 복잡하다.

### 네이티브 SQL

JPA는 SQL을 직접 사용할 수 있는 기능을 지원하는데, 이 것을 네이티브 SQL이라고 한다. JPQL을 사용해도 가끔은 특정 DB에 의존하는 기능을 사용해야할 때가 있다. 오라클에서만 사용하는 connect by 같은 기능이나, 특정 db에서만 작동하는 sql 힌트 같은 경우이다.

이런 기능은 표준화된 것이 아니기 때문에 JPQL에서 사용할 수 없다. SQL이 지원하지만 JPQL이 지원하지 않는 기능도 있다. 이럴 때는 네이티브 SQL을 사용하면 된다.

네이티브 SQL의 단점은, 특정 DB에 의존하는 SQL을 작성해야한다는 점이다. 따라서 DB를 변경하는 경우 네이티브 SQL역시 수정해야한다.

# QueryDsl 적용해보기

처음엔 각종 예제를 무턱대고 따라했는데, 버전 이슈가 있으니 어노테이션 프로세서 등을 잘 정의해야할 것 같다. (아마도 버전마다 정의해야할 것 들이 조금씩 다른 것 같다..) 

Java 13(과 15), Gradle 6.7.1(과 7.0.2) 위에서 작성하였다.

## 1. 설정
[1편 참고](https://seulog.netlify.app/JPA/QueryDSL_1/)

## 2. 
