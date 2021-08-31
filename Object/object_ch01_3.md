# 오브젝트 - 설계 개선하기

[해당 코드](https://github.com/2yeseul/object/tree/master/chapter01/src/main/java/org/eternity/theater/step01)에서의 문제점은 기능만 제대로 수행할 뿐, 이해하기 어렵고 변경하는 것 역시 쉽지 않다. 

변경과 의사소통의 문제가 서로 엮여있는데, 코드를 이해하기 어려운 이유는 Theater가 관람객의 가방과 판매원의 매표소에 직접 접근하기 때문이다. 이 것은 관람객과 판매원이 자신의 일을 스스로 처리해야한다는 통상적인 직관과 어긋난다. 즉 코드의 객체가 서로 의사소통을 하지 못하므로 이해하기 어렵다. 

이러한 문제는 간단하게 해결할 수 있는데, Theater가 Audience와 TicketSeller에 관해 세세한 부분을 알 수 없도록 한다. 즉 관람객과 판매원을 실제 세상과 같이 자율적인 존재로 만들면 된다.

## 자율성을 높이기
### 기존 Theater
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

### 변경 
``` java
public class TicketSeller {
    private TicketOffice ticketOffice;

    public TicketSeller(TicketOffice ticketOffice) {
        this.ticketOffice = ticketOffice;
    }

    public void sellTo() {
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

Theater의 enter 메서드의 코드를 TicketSeller의 sellTo로 옮겨준다. 

결과적으로 ticketOffice에 대한 접근은 오직 TicketSeller를 통해서만 가능하다. 티켓을 꺼내거나 판매 요금을 적립하는 일을 스스로 수행하는 자율적인 객체로 변모한다.

이렇게 개념적이나 물리적으로 객체 내부의 세부적인 사항을 감추는 것이 객체 지향의 가장 중요한 개념 중 하나인 캡슐화이다.

Theater의 enter 메소드는 다음과 같이 간단히 변경할 수 있다.

``` java
public class Theater {
    private TicketSeller ticketSeller;

    public Theater(TicketSeller ticketSeller) {
        this.ticketSeller = ticketSeller;
    }

    public void enter(Audience audience) {
        ticketSeller.sellTo(audience);
    }
}
``` 

Theater는 오직 TicketSeller의 인터페이스에만 의존한다. TicketSeller가 내부에 TicketOffice 인스턴스를 포함하고 있다는 것은 구현의 영역에 속한다. 객체를 인터페이스와 구현으로 나누고, 인터페이스만을 공개하는 것이 객체 사이의 결합도를 낮춰 변경하기 쉽고 확장성이 좋은 코드를 작성할 수 있게 해준다. 즉 가장 기본적인 설계원칙이라고 할 수 있다.

위와 같이 Audience의 캡슐화 역시 개선가능하다. Bag에 접근하는 모든 로직을 Audience 스스로 할 수 있도록 buy 메서드를 Audience 내부에 추가하고, sellTo 메서드에서 getBag 메서드에 접근하는 부분을 buy로 옮겨주면 된다.


위의 과정에서 가장 중요한 부분은 Audience나 TicketSeller의 내부 구현을 변경하더라도 Theater를 함께 변경할 필요가 없다는 사실이다. 

## 절차지향과 객체지향
수정하기 전 코드에서는 Theater의 enter 메서드 내에서 Audience와 TicketSeller로 부터 Bag과 TicketOfiice를 가져와 관람객을 입장시키는 '절차'를 구현하였다. Audience, TicketSeller, Bag, TicketOffice는 관람객을 입장시키는 데 필요한 정보만을 제공하고, 처리는 Theater의 enter 메서드 내부에서만 이루어진다.

이러한 관점에서 Theater의 enter 메서드는 `프로세스`이며, Audience, TicketSeller, Bag, TicketOffice는 `데이터` 이다.

이처럼 프로세스와 데이터를 별도의 모듈에 위치시키는 방식이 바로 절차적 프로그래밍이다.


위에서 설명한 바와 같이, 일반적으로 절차적 프로그래밍은 우리의 직관에 위배된다. 일반적으로(실제 세계에서는) 관람객과 판매원이 자신의 일을 스스로 처리하고, 또 그렇게 할거라 예상하지만 절차적 프로그래밍의 세계에서는 두 객체 모두 수동적인 존재일 뿐이다. 더 큰 문제는 이러한 수동적인 객체(데이터)의 변경이 어려워 확장성이 저해된다는 점에 있다.

정리하자면 절차적 프로그래밍은 프로세스가 필요한 모든 데이터에 의존해야 한다는 근본적인 문제점 때문에, 변경에 취약하다.

자신의 데이터를 스스로 처리하도록 프로세스를 각 객체별로 이동시켜, 데이터와 프로세스가 모두 동일한 모듈 내부에 위치하도록 프로그래밍 하는 방식이 객체지향 프로그래밍이라고 할 수 있다.

요약하자면, 휼륭한 객체지향 설계의 핵심은 캡슐화를 통해 의존성을 적절히 관리하여 객체 사이의 결합도를 낮추는 것이다.

### 책임의 이동
두 프로그래밍 방식 사이의 근본적인 차이는 책임의 이동이다. 책임은 기능을 가리키는 객체지향의 용어라고 생각하면 쉽다.

수정 전 코드에서는 책임이 Theater에만 집중되어 있지만, 수정 후에는 Audience와 TicketSeller로 각각 책임이 이동하였다.

객체지향에서는 각 객체가 자신을 스스로 책임지는 방향으로 설계해야 한다. 객체 지향은 스스로 책임을 수행하는 자율적인 객체들의 공동체를 구성하며 완성된다. 

설계를 어렵게 하는 것은 의존성이기 때문에, 불필요한 의존성을 제거하여 객체 사이의 결합도를 낮춰야 한다. 결합도를 낮추는 방법은 타 객체가 몰라도 되는 세부 사항을 책임을 맡은 객체 내부로 감춰 캡슐화를 하는 것이다. 캡슐화를 통해 객체의 자율 성을 높이고, 응집도 높은 객체들 간에 공동체를 창조할 수 있도록 한다. 캡슐화된 자율적인 객체들이 낮은 결합도와 높은 응집도를 통해 서로 협력하여 최소한의 의존성만 가지도록 하는 것이 휼륭한 객체지향 설계이다.