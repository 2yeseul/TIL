# [코어자바스크립트] 02.실행 컨텍스트
> 실행할 code에 제공할 환경 정보를 모아놓은 객체

-> 동적 언어로서의 성격 잘 파악할 수 있다.

Execution Context가 활성화 되는 시점
1. 호이스팅: 선언된 변수를 끌어 올림
2. 외부 환경 정보 구성
3. this 값 설정...

# 실행 컨텍스트란?
동일한 환경에 있는 코드들을 실행할 때 필요한 환경 정보를 모아 컨텍스트를 구성하고, 이를 `콜 스택`에 쌓아올린다.

일반적으로 실행 컨텍스트가 구성되는 방법은 **함수 실행**이다. 

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--q_xmB2U9--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/01ksqw5twx22ilo4pibc.jpg)

(출처 - https://dev.to/ahmedtahir/what-is-the-execution-context-execution-stack-scope-chain-in-js-26nc)