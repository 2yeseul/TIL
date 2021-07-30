# [오브젝트] ch01. 객체, 설계 - (1), (2)

객체지향의 특징과 개념을 아는 것과 객체지향적인 코드를 작성하는 것은 독립변수라는 사실을 요즈음 더 많이 느끼게 된다. 매번 좋은 아키텍쳐와 가독성과 확장성 등등 생산성이 좋은 객체지향적 코드(..)를 너무나도 작성하고 싶지만, 코드를 작성하고 나면 남는 것은 자괴감과 객체지향을 흉내만 낸 바보같은 코드들 뿐이었다. 당연히 이 책을 읽는다고 해서 하루아침에 완벽한 객체지향적인 코드를 작성할 순 없겠지만.. 조금이라도 도음이 된다면 몇 번이고 다시 읽을 의향이 있다.

# 티켓 판매 애플리케이션 구현하기

다음과 같은 요구사항을 가진 티켓판매 애플리케이션을 구현한다고 가정하자.

## 1) 책에서 설명하는 문제의 코드와 구조
![](https://media.vlpt.us/images/2yeseul/post/efc4f55f-5d23-4409-b13e-b5f2ac4762a0/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202021-07-31%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%202.02.17.png)

[세부 코드는 여기에](https://github.com/2yeseul/object/tree/master/chapter01/src/main/java/org/eternity/theater/step01)

그리고 소극장을 구현하는 클래스 `Theater`는 다음과 같은데, 이 클래스는 관람객을 맞이하는 일을 수행한다.

``` java
public class Theater {
    private TicketSeller ticketSeller;

    public Theater(TicketSeller ticketSeller) {
        this.ticketSeller = ticketSeller;
    }

    public void enter(Audience audience) {
        if (audience.getBag().hasInvitation()) {
            Ticket ticket = ticketSeller.getTicketOffice().getTicket();
            audience.getBag().setTicket(ticket);
        } else {
            Ticket ticket = ticketSeller.getTicketOffice().getTicket();
            audience.getBag().minusAmount(ticket.getFee());
            ticketSeller.getTicketOffice().plusAmount(ticket.getFee());
            audience.getBag().setTicket(ticket);
        }
    }
}

```

## 2) 무엇이 문제인가?

로버트 마틴의 클린 소프트웨어에 따르면, 소프트웨어 모듈이 가져야하는 세 가지 기능에 대해 설명한다. 요약하자면 제대로 실행되어야 하고, 변경이 용이해야하며, 이해하기 쉬워야 한다. 위와 같은 프로그램은 제대로 실행이 된다는 점에서 첫 번째 조건은 만족하지만, 변경이 용이하지 않고 이해가 어렵다는 문제점이 있다.

그 이유는 다음과 같다.

### 예상을 빗나간다.

Theate의 enter가 수행하는 일을 말로 풀었을 때, 다음과 같다.

> `소극장` 이 `관람객` 의 가방을 열어 초대장이 들어있는지 살핀다.
> 가방 안에 초대장이 있으면 `판매원` 은 매표소에 보관된 티켓을 관람객의 가방에 옮긴다. 가방 안에 초대장이 없으면 `관람객`의 가방에서 티켓 금액만큼 현금을 꺼내 매표소에 적립한 후 보관된 티켓을 관람객의 가방으로 옮긴다.

관람객과 판매원은 소극장의 통제를 받는 수동적인 존재인 것이다.

관람객의 입장에서, 소극장이라는 제3자가 멋대로 초대장이 있는지를 확인하기 위해 가방을 맘대로 열어보는 것이다.

판매원 역시 마찬가지인데, 소극장이 허락도 없이 매표소에 보관덴 티켓과 현금에 마음대로 접근하기 때문이다. 티켓을 꺼내 관람객의 가방에 집어넣고 관람객에서 받은 돈을 매표소에 적립하는 행위 역시 소극장이 수행하므로 더 큰 문제이다.

또한 `Theater`의 `enter` 메서드를 살펴보면, Audience가 Bag을 가지고 있고, Bag에는 현금과 티켓이 들어있으며, TicketSeller가 TicketOffice에서 티켓을 판매하고,  TicketOffice 안에 돈과 티켓이 보관된 사실을 알고있어야 한다. 

문제점을 요약하자면, 1) 하나의 클래스나 메서드가 너무 많은 세부사항을 다루어 코드 작성자와 읽는 사람 모두에게 부담을 주고 2) Audience와 TicketSeller를 변경할 경우 Theater 역시 함께 변경된다는 큰 문제가 있다.


### 변경에 취약한 코드 - 의존성

의존성은 변경과 관련되어 문제를 일으킬 여지가 높다. 의존성은 변경에 대한 영향을 암시하는데, 이름 자체에 어떤 객체가 변경될 때 그 객체에 의존하는 다른 객체도 함께 변경될 수 있다는 사실이 내포되어있다.

애플리케이션의 기능을 구현할 땐 최소한의 의존성만 유지하고, 불필요한 의존성은 제거해야한다. 즉 설계의 목표는 **객체 사이의 결합도를 낮춰 변경이 용이한 설계를 만드는 것으로 삼아야 한다.**
