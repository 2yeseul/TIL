# WebSecurityConfig

```java
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .mvcMatchers("/", "/login", "/sign-up", "/check-email", "/check-email-token",
                        "/email-login", "/check-email-login", "/login-link").permitAll()
                .mvcMatchers(HttpMethod.GET, "/profile/*").permitAll()
                .anyRequest().authenticated();
    }

    // static resources security 적용 안하게함
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }
}
```

`.anyRequest().authenticated();`

- `.anyRequest()` 위의 설정을 제외한 모든 요청은 `.authenticated()` 인증이 필요하다.

```java
@Override
public void configure(WebSecurity web) throws Exception {
    web.ignoring()
            .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
  }
```

- static 파일은 security 적용 안함

## Annotations

### `@Configuration`

- `@Bean`으로 설정된 메소드가 하나 이상일 때, 해당 클래스를 컨테이너에 등록시켜 의존성을 주입한다. (DI)

### `@EnableWebSecurity`

- 웹 보안 활성화

출처

[https://velog.io/@yhh1056/스프링-Bean-Configuration-Singleton](https://velog.io/@yhh1056/%EC%8A%A4%ED%94%84%EB%A7%81-Bean-Configuration-Singleton)

[인프런 강의 - 스프링과 JPA 기반 웹 애플리케이션 개발, 백기선]([https://www.inflearn.com/course/스프링-JPA-웹앱](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-JPA-%EC%9B%B9%EC%95%B1))