JPA의 update는 기본적으로 모든 컬럼을 업데이트 하도록 작동된다. 

변경하고 싶은 부분만 업데이트 하고 싶을 때에는 `@DynamicUpdate`를 엔티티 최상단에 적어주면 된다.

출처 - https://jojoldu.tistory.com/415