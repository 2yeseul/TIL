# Spring Data Redis 

Spring에서는 Redis와의 연결을 위해 오픈소스인 `Lettuce`, `Jedis`를 사용한다. 

# Redis로의 연결 
`Redis`와 `Spring` 를 사용할 때 `IoC Container` 를 통해 Redis 저장소를 연결해야한다. `RedisConnection` 과
`RedisConnctionFactory` 인터페이스가 Redis와의 연결을 가능하게 한다. 

## Redis Connection & RedisConnectionFactory 