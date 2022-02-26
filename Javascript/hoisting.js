function beforeHoisting (x) {
  console.log(`1) ${x}`);

  var x;
  console.log(`2) ${x}`)

  var x = 2;
  console.log(`3) ${x}`)
}

beforeHoisting(1);
console.log('=========')
// 예상? 1) x = 1, 2) x = undefined, 3) x = 2
// 실제? 1) x = 1, 2) x = 1, 3) x = 2

// 매개변수를 변수 선언/할당과 같다고 간주해서 변환
function doingHoisting(x) {
  var x = 1;
  console.log(`1) ${x}`);

  var x;
  console.log(`2) ${x}`)

  var x = 2;
  console.log(`3) ${x}`)
}

doingHoisting(1);
console.log('=========')
function afterHoisting(x) {
  var x; // 변수 x 선언과 저장할 공간 미리 확보. 확보한 공간의 주솟값을 변수 x에 연결
  var x; // 이미 선언된 변수가 있으므로 무시
  var x;

  x = 1;
  console.log(`1) ${x}`);
  console.log(`2) ${x}`)
  x = 2;
  console.log(`3) ${x}`)
}
afterHoisting(1);
