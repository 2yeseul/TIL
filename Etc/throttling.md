# Throttling

API Throttling은 서비스를 보호하기 위한 수단이다. 무분별한 리퀘스트의 공격으로 부터 서비스를 지킬 수 있다. API Throttling은 Request 처리 전 일어나야 한다. 일반적으로 클라우드 서비스에서는 쓰로틀링 기능을 제공한다. 
- AWS 
  - https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/http-api-throttling.html
  - https://docs.aws.amazon.com/ko_kr/apigateway/latest/developerguide/api-gateway-request-throttling.html
- Google Cloud
  - https://cloud.google.com/apis/docs/capping-api-usage?hl=ko

## 구현 방식 
> 유저의 요청수가 초과하면 429, Too many requests 반환
1. Hard Throttling
  - limit을 엄격하게 관리, 1개라도 넘으면 안됨.
2. Soft Throttling
  - 특정 percentage 까지는 throttling limit을 넘기는 것 허용. rate limit이 분 당 100회일 때, 10% 잡는 경우엔 110회 까지 가능
3. Elastic or Dynamic Throttling
  - 서버 자원에 여유가 있을 경우엔 throttle limit 넘겨도 요청 허용

// TODO : 알고리즘 정리


출처
- https://etloveguitar.tistory.com/126