# 가상돔
![render](https://dimension85.com/images/critical-render-path-large.jpg)

인터렉션에 의해 DOM에 변화가 발생하면, 그 때 마다 Render Tree가 재생성된다. 모든 요소들의 스타일들을 다시 계산하고, Layout, Repaint 과정까지 다시 거치게된다.
인터렉션이 많은 경우, 작은 변화로 인해 위에 필요한 과정들을 계속 거치기 때문에 불필요하게 DOM을 조작하는 비용이 크게 발생한다. 

-> 문제 해결을 위해 가상돔(Virtual Dom) 등장

데이터가 바뀌었을 때, 가상돔에 렌더링되고, 이전의 가상돔과 비교해서 바뀐 부분만 실제 돔에 적용 시켜준다. 바뀐 부분을 찾는 과정은 Diffing이라 부르고, 바뀐 부분만 실제 돔에 적용시켜주는 것을 재조정(reconciliation)이라고 한다. 

