# Callback Function

velopert님의 강의를 보고 정리한 글입니다. 

자바스크립트에서 함수는 일급객체이다. 일급객체란 1. 변수에 할당가능하고, 2. 다른 함수를 인자로 전달받을 수 있으며, 3. 다른 함수의 결과로서 리턴될 수 있는 객체이다.

`Callback function`은 특정 함수에 매개변수로서 전달된 함수이다. 그리고 그 콜백함수는 그 함수를 전달받은 함수 내에서 호출될 수 있다.

``` javascript
$("#btn_1").click(function() {
    alert("Btn 1 Clicked)";
});
```

# Blocking Code
콜백함수가 사용되지 않는 `Blocking Code` 
- 어떤 작업을 실행하고 기다리면서 코드가 막히게 된다.

``` javascript
// node.js에서는 require 메서드를 통해 외부 모듈을 가져올 수 있다
var fs = require("fs");

// readFileSync 메서드는 인자의 path에 있는 내용을 반환
var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("Program has ended");
``` 

# Non-Blocking Code
콜백함수가 적용된 Non-Blockig Code 이다.

위 예제와는 반대로 함수가 실행될 때, 프로그램이 함수가 끝날 때 까지 기다리지 않고 바로 그 아래에 있는 코드를 실행한다.

 그 다음 함수에 있던 작업이 다 끝나면 콜백함수를 호출하게된다.

 ``` javascript
 var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log('Program is Ended');
```
- fs.readFile() 함수는 비동기식으로 파일을 읽는 함수인데, 도중에 에러가 발생하면 err 객체에 에러 내용을 담고, 그렇지 않을 때는 파일 내용을 다 읽고 출력한다.


readFile 메서드가 실행된 후 프로그램이 메서드가 끝날 때 까지 대기하지 않고, 곧바로 다음 명령어로 진행했기 때문에,
1) 프로그램이 끝났다는 메시지를 출력한 뒤 2) 텍스트 내용을 출력함

프로그램이 실질적으로 끝난건 텍스트가 출력된 이후이다.

> callback 함수를 사용하면, 프로그램의 흐름을 끊지 않으면서 blocking을 사용하는 서버보다 더 많은 양의 요청을 빠르게 처리할 수 있게됨