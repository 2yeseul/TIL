function beforeHoisting() {
  console.log(b);

  var b = 'bbb'; // 수집 대상 => 변수 선언
  console.log(b);
  function b () {} // 수집 대상 => 함수 선언
}

beforeHoisting();
// 함수 실행 순간 해당 함수의 실행 컨텍스트가 생성되고 변수명과 함수 선언의 정보를 위로 끌어 올린다.
// 변수는 선언부와 할당부를 나누어 선언부만 끌어올리지만, 함수 선언은 함수 전체를 끌어올린다.

function doingHoisting() {
  var b;
  function b() {}

  console.log(b);
  b = 'bbb';
  console.log(b);
  console.log(b); 
}

doingHoisting();

function afterHoisting() {
  var b; // 변수 선언
  var b = function b() {} // 이미 선언된 변수가 있으므로 선언은 무시함. 함수는 별도의 메모리에 담길 것이고, 해당 함수가 저장된 주솟값을 b와 연결된 공간에 저장. b는 함수를 가리킨다

  console.log(b); // 함수 b 출력
  b = 'bbb';
  console.log(b); // bbb 출력
  console.log(b); 
}
afterHoisting();