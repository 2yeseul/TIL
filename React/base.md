# 리액트 공부 - (1)
https://ko.reactjs.org/tutorial 

# 리액트란?
> 사용자 인터페이스를 구축하기 위한 선언적이고 효율적이며 유연한 JS 라이브러리 
- 컴포넌트라고 불리는 작고 고립된 코드의 파편을 이용하여, 복잡한 UI를 구성하도록 돕는다.

컴포넌트를 사용하여 리액트에게 화면에 표시하고 싶은 것이 무엇인지를 알려준다.

데이터가 변경되면, 리액트가 컴포는트를 효율적으로 업데이트 하여 다시 렌더링 한다.

``` javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
``` 
`ShoppingList` 는 리액트 컴포넌트 클래스, 또는 컴포넌트 타입이다.

- 개별 컴포넌트는 `props`라는 매개변수를 받아오고, `render`를 통해 표시할 뷰 계층 구조를 반환한다. 
- `render` 는 화면에서 보고자 하는 내용을 반환한다. 
  - 렌더링할 내용을 경량화한 `React 엘리먼트`를 반환한다. 보통은 JSX를 사용하여 React 구조를 쉽게 작성한다. 

``` jsx
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
``` 

JSX는 내부 중괄호 안에 어떤 Javascript 표현식도 사용할 수 있다. React 엘리먼트는 Javascript 객체이며 변수에 저장하거나 프로그래밍 여기저기에 전달할 수 있다. 

# State
React 컴포넌트는 생성자에 `this.state` 를 설정하는 것으로 state를 가질 수 있다. 

상태의 저장은 자식 컴포넌트가 아닌 부모 컴포넌트에 저장하는 것이 가장 좋은 방법이다. 자식 컴포넌트에 저장하게 되면 코드를 이해하기 어렵고, 버그에 취약하며 리팩토링이 어렵다.

> 여러 개의 자식으로부터 데이터를 모으거나, 두 개의 자식 컴포넌트들이 서로 통신하게 하려면 부모 컴포넌트에 공유 state를 정의해야한다. 부모 컴포넌트는 **props** 를 사용하여 자식 컴포넌트에 state를 다시 전달할 수 있다. 이 것이 자식 컴포넌트들로 하여금 부모 컴포넌트와 동기화할 수 있도록 한다. 

## 불변성
``` javascript
const squares = this.state.squares.slice()
```
와 같이 `.slice()` 를 사용하여 배열의 사본을 생성하였는데, 이 것은 불변성과 관련이 있다.

일반적으로 데이터 변경에는 두 가지 방법이 있는데, 첫 번째는 데이터의 값을 **직접 변경** 하는 것이고, 두 번째는 원하는 변경 값을 가진 새로운 사본으로 데이터를 교체하는 것이다.

### 객체 변경을 통해 데이터 수정하기
``` javascript
let player = { score: 1, name: 'seul' }
player.score = 2
// Now the player is { score: 2, name: 'seul }
```

### 객체 변경 없이 데이터 수정하기 
``` javascript
const player = { score: 1, name: 'seul' }

const newPlayer = { ...player, score: 2 }
```

## 직접적으로 객체를 변경하지 않을 때의 장점

### 1. 복잡한 특징들을 단순하게 만든다. 
불변성은 복잡한 특징의 구현을 단순화한다. 특정 행동을 취소하고 다시 실행하는 기능은 애플리케이션에서 일반적인 요구 사항이다. 직접적인 데이터 변이를 피하는 것은 이전 버전의 이력을 유지하고 나중에 재사용할 수 있도록 한다. 

### 2. 변화 감지 
객체가 직접적으로 수정되는 경우엔 복제가 가능한 객체에서 변화를 감지하는 것은 어렵다. 감지라는 행위가 복제가 가능한 객체를, 이전의 것과 비교하여 전체 객체 트리를 돌아야 하는 행위이기 때문이다. 

하지만 불변 객체에서는 변화를 감지하는 것이 쉽다. 단순히 참조하고 있는 불변 객체가 이전 객체와 다른 경우 변화했다는 사실을 알 수 있기 때문이다. 

### 3. React가 다시 렌더링 할 시기를 감지 
불변성의 가장 큰 장점은 **React에서 순수 컴포넌트를 만드는 데에 도움을 준다는 것** 이다.

변하지 않는 데이터는 변경이 이루어졌는지 쉽게 판단할 수 있고, 이를 바탕으로 컴포넌트가 다시 렌더링할지를 결정할 수 있다.