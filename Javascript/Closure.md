# 클로저
클로저는 함수를 일급 객체로 취급하는 함수형 프로그래밍 언어에서 사용되는 중요한 특성이다.

``` javascript
function outerFunc() {
  var x = 10;
  var innerFunc = function() {
    console.log(x);
  }

  innerFunc();
}

outerFunc();
```

함수 outerFunc 내에서 내부함수 innerFunc가 선언되고 호출되었다. 
