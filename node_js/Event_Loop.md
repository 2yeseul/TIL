# Event Loop
---
velopert님의 강좌를 보고 정리한 글입니다.

node.js에선 event를 많이 사용하고, 이 때문에 속도가 빠르다. node.js 기반으로 만들어진 서버가 가동되면 변수들을 초기화하고, 함수를 선언하고, 이벤트가 일어날 때 까지 기다린다. 

Event-Driven 어플리케이션에서는 이벤트를 대기하는 메인 루프가 있고, 이벤트가 감지되었을 시에 Callback 함수를 호출한다.

이벤트와 콜백의 차이점은 
- 콜백함수는 비동기식 함수에서 결과를 '반환할 때' 호출되지만
- 이벤트핸들링은 옵저버 패턴에 의해 작동된다.

이벤트를 대기하는 EventListeners 함수들이 옵저버 역할을 한다. 옵저버들이 이벤트를 기다리다가, 이벤트가 실행되면 이벤트를 처리하는 함수가 실행된다.

``` javascript
// events 모듈 사용 
var events = require('events');

// EventEmitter 객체 생성
var eventEmitter = new events.EventEmitter();

// EventHandler 함수 생성
var connectHandler = function connected() {
    console.log('Connection Successful');

    // data_recieved 이벤트를 발생시키기
    eventEmitter.emit('send event');
}

// connection 이벤트와 connectHandler 이벤트 핸들러 연동 
eventEmitter.on('connection', connectHandler);

// data_recieved 이벤트와 익명 함수 연동
// 함수를 변수 안에 담는 대신, .on() 메소드의 인자로 직접 함수를 전달
eventEmitter.on('send event', function() {
    console.log('Data Received');
});

eventEmitter.emit('connection');

console.log('END');
```
