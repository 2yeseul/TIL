# JWT

# JWT의 정의
JWT는 Json Web Token의 약자이다. 일반적으로 토큰 기반의 인증을 사용한다고 하면, JWT를 통해 인증과 권한부여 과정이 이루어진다. JWT는 사용자에 대한 정보를 JSON 데이터 구조 형태로 저장하는 Claim 기반의 Web Token이다. 
## Claim 이라는 것은 무엇일까?
클레임은 사용자의 정보나 데이터 속성 등을 의미하는데, 따라서 클레임 토큰은 토큰 내에 사용자의 정보 등을 담고있는 토큰이다. 

# JWT의 구조 
JWT는 크게 세 부분으로 구분할 수 있다 - Header, Payload, Signature
![구조](https://media.vlpt.us/images/dnjscksdn98/post/93750576-b681-4658-ba88-10922ffb4ff3/jwt.png)
## Header
헤더는 `typ`과 `alg` 두 가지 정보로 구성되는데, typ은 토큰의 타입을 지정하고 alg은 해싱 알고리즘을 지정한다. alg은 주로 SHA256이나 RSA를 사용하는데, 이 알고리즘은 서명(signature) 에서 사용된다. 

``` json
{ 
 "typ": "JWT",
 "alg": "HS256"
}
```


## Payload
페이로드에는 사용자의 정보와 같이 클레임이라 부르는 것들이 저장되어 있다 . JSON과 유사한 형태로, Key - Value 형태로 이루어져 있고, 다수의 정보를 넣을 수 있다. 각 부분은 `Base64` 로 인코딩 되어 표현된다. 각각의 부분을 이어주기 위하여 `.` 를 구분자로 사용한다. Base64는 암호화된 문자열이 아니라 같은 문자열에 대하여 항상 같은 인코딩 문자열을 반환한다.

클레임은 세 가지로 분류할 수 있다.

### Registered Claim (등록된 클레임)
등록된 클레임은 토큰 정보를 표현하기 위해 이미 정해진 데이터 종류이고 선택적 작성이 가능하다.

- iss : 토큰 발급자 (issuer)
- sub : 토큰 제목 (subject)
- aud : 토큰 대상자 (audience)
- exp : 토큰의 만료시간 (expiration)
    - numericdate 형식 (ex. 1480849147370)
- iat : 토큰이 발급된 시간 (issued at)
    - 이 값을 사용하여 토큰 발급 이후 얼마나 시간이 지났는 지를 알 수 있다.
- jti : JWT의 고유 식별자
    - 중복 방지를 위해 사용하며, 일회용 토큰(access token 등)에 사용

### Public Claim (공개 클레임)
공개 클레임은 서로 충돌이 일어나지 않는 이름을 가져야하는데, 따라서 url 형태로 작성한다.
``` json
{
    "https://url" : true
}
```

### Private Claim (비공개 클레임)
비공개 클레임은 실제 사용하는 개발자가 지정하는 것인데, 서버와 클라이언트가 서로 정의하여 사용하는 클레임이다. 공개 클레임과는 달리 이름이 중복되어 충돌이 될 수 있기 때문에 사용에 유의해야 한다. 
``` json
{
    "username" : "2yeseul"
}
```

### Payload 예시
``` json
{
    "iss" : "example.com",
    "exp" : "1485270000000",
    "https://example.com/jwt/auth" : true,
    "userId" : "2yeseul",
    "username" : "ys"
}
```
-> 2개의 등록된 클레임 (iss, exp), 1개의 공개 프레임 (https~), 2개의 비공개 클레임 (userId, username)

## Signature
서명은 토큰을 인코딩하거나 유효성을 검증할 때 사용되는 고유한 암호화 코드이다. 서명으로 header와 payload 값을 각각 base64로 인코딩하고, 인코딩한  값을 비밀 키를 이용해 header에서 정의한 알고리즘으로 해싱을 한 뒤, 이 값을 다시 base64로 인코딩한다. 

## JWT 토큰 예시 
![token_ex](https://research.securitum.com/wp-content/uploads/sites/2/2019/10/jwt_ng1_en.png)

생성된 토큰은 http 통신을 할 때, `Authorization`이라는 key의 `value`가 된다. 일반적으로 value에는 `Bearer`가 앞에 붙는다. 

``` json
{
    "Authorization" : "Bearer {token value}"

}
```

# JWT의 장단점
## 장점
1. 사용자 인증에 필요한 모든 정보가 토큰 자체에 포함되기 때문에, 별도의 인증 저장소가 필요하지 않다.
2. 쿠키를 전달하지 않으므로 쿠키를 사용할 때 발생하는 보안적 취약점이 사라진다.
3. URL 파라미터와 헤더로 사용
4. 트래픽에 대한 부담이 낮다.
5. REST 서비스로 제공이 가능하다.
6. 토큰 만료 시간이 토큰 내에 내장되어 있다.
7. 독립적이다.

## 단점
1. 정보를 토큰이 직접 가지고 있으므로 양날의 검이 될 수 있다. 
2. 토큰의 페이로드에 3종류의 클레임을 저장하기 때문에 정보가 많아질 수록 토큰의 길이가 늘어나 네트워크에 부하를 야기할 수 있다.
3. payload 자체는 암호화된 것이 아니라, base64로 인코딩된 것이다. 따라서 payload가 탈취되면 디코딩을 통해 데이터를 볼 수 있기 때문에, jwe로 암호화하거나, payload에 중요 데이터를 넣지 않아야한다.
4. stateless : 상태를 저장하지 않기 때문에 한 번 만들어진 이후에는 제어가 어렵다. 따라서 토큰을 임의로 삭제하는 것이 불가능하므로 토큰 만료 시간을 꼭 넣어주어야 한다.
5. 토큰은 클라이언트가 관리하므로 토큰을 저장해야 한다.

출처 
- https://elfinlas.github.io/2018/08/12/whatisjwt-01/
- https://velog.io/@dnjscksdn98/JWT-JSON-Web-Token-%EC%86%8C%EA%B0%9C-%EB%B0%8F-%EA%B5%AC%EC%A1%B0