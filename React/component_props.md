# Component와 Props

개념적으로 컴포넌트는 JS의 함수와 유사하다. `props`라고 하는 임의의 입력을 받은 후, 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환한다.

# 함수 컴포넌트와 클래스 컴포넌트 
## 함수 
``` javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
```

## 컴포넌트 
``` javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

# 컴포넌트 렌더링 
``` javascript
const element = <Welcome name="Seul" />
```

