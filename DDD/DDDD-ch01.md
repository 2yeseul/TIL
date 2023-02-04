# [도메인 주도 설계 핵심] 1장 정리

## DDD
> DDD는 소프트웨어를 설계하고 구현하는데에 전략적, 전술적 도움을 주는 도구의 모음이다.
-> 소프트웨어 설계 결정, 비즈니스를 위한 통합적 판단 하게함

잘못 설계를 하면 유지보수가 어려움, DDD를 통해 심사숙고하여 설계를 하는 것은 어렵고 비싸보이지만 결과적으로는 유지보수가 쉬워지고 비용이 절감됨
따라서 **효과적인 설계**가 필요

## 전략적 설계
- 전략적 설계부터 시작해야 **효과적인 방법**으로 전술적인 설계를 적용할 수 있다.
- 거시적인 설계 방법
  - 비즈니스상 전략적으로 중요한 것
  - 중요도에 따라 일을 나누는 방법
  - 필요에 따라 통합하는 최적의 방법

### 바운디드 컨텍스트 
-> 도메인을 분리하는 방법

- 보편언어: 바운디드 컨텍스트 내부의 언어
- 서브도메인: 기존 시스템의 제한되지 않은 복잡성 다룸
- 컨텍스트 매핑: 여러 개의 바운디드컨텍스트 통합
  - 컨텍스트 맵: 두 개의 바운디드 컨텍스트 통합. 그 사이 존재하는 팀의 관계, 기술적 메카니즘 정의

  ## 전술적 설계
  - 미시적인 설계방법
  - 애그리게잇 패턴: 엔티티와 값 객체를 묶음
  - 도메인 이벤트: 모델링을 도와주고, 도메인에 발생한 것에 대해 알아야하는 내용을 시스템과 공유하는 것을 도움. 공유할 대상이 로컬 바운디드 컨텍스트이거나 외부의 바운디드 컨텍스트 일 수도 있음 