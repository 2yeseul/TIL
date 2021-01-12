- 회원정보저장
- 인증 이메일 발송
- 처리 후 첫 페이지로 리다이렉트 (Post-Redirect-Get 패턴)

비즈니스 로직 처리를 해줄 `AccountService`를 만든다.

```java
import com.studyolle.domain.Account;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.Valid;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final JavaMailSender javaMailSender;
    private final PasswordEncoder passwordEncoder;

		// Controller에서 실행
    public void processNewAccount(SignUpForm signUpForm) {
				// 1. 회원 정보를 저장
        Account newAccount = saveNewAccount(signUpForm);
        newAccount.generateEmailCheckToken();
				// 2. 인증 메일 발송
        sendSignUpConfirmEmail(newAccount);
    
		}

    private Account saveNewAccount(@Valid SignUpForm signUpForm) {
        Account account = Account.builder()
                .email(signUpForm.getEmail())
                .nickname(signUpForm.getNickname())
                .password(passwordEncoder.encode(signUpForm.getPassword()))
                .studyCreatedByWeb(true)
                .studyEnrollmentResultByWeb(true)
                .studyUpdatedByWeb(true)
                .build();
        return accountRepository.save(account);
    }

    private void sendSignUpConfirmEmail(Account newAccount) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(newAccount.getEmail());
        mailMessage.setSubject("스터디올래, 회원 가입 인증");
        mailMessage.setText("/check-email-token?token=" + newAccount.getEmailCheckToken() +
                "&email=" + newAccount.getEmail());
        javaMailSender.send(mailMessage);
    }
}
```

## 회원 정보 저장

```java
private Account saveNewAccount(@Valid SignUpForm signUpForm) {
        Account account = Account.builder()
                .email(signUpForm.getEmail())
                .nickname(signUpForm.getNickname())
                .password(passwordEncoder.encode(signUpForm.getPassword()))
                .studyCreatedByWeb(true)
                .studyEnrollmentResultByWeb(true)
                .studyUpdatedByWeb(true)
                .build();
        return accountRepository.save(account);
    }
```

- `@Valid`를 이용하여 SignUpForm이 유효한지 검사한다. (중복 닉네임, 중복 이메일이 아닌지 여부)

## 인증 이메일 발송

```java
private void sendSignUpConfirmEmail(Account newAccount) {
    SimpleMailMessage mailMessage = new SimpleMailMessage();
    mailMessage.setTo(newAccount.getEmail());
    mailMessage.setSubject("스터디올래, 회원 가입 인증");
    mailMessage.setText("/check-email-token?token=" + newAccount.getEmailCheckToken() +
            "&email=" + newAccount.getEmail());
    javaMailSender.send(mailMessage);
  }
}
```

- `SimpleMailMessage`  클래스를 통해 메시지를 구성한 뒤, `JavaMailSender` 클래스를 통해 메일을 발송한다.
- `setTo(mailAddress)` : 메일을 보낼 주소를 지정
- `setSubject("title")`  : 메일의 주소를 지정
- `setText("text")` : 메일 내용 지정
- `javaMailSender.send(mailMessage)` : 메일 발송

### 이메일 토큰 만들기

```java
public void generateEmailCheckToken() {
    this.emailCheckToken = UUID.randomUUID().toString();
 }
```

출처

[인프런 강의 - 스프링과 JPA 기반 웹 애플리케이션 개발, 백기선]([https://www.inflearn.com/course/스프링-JPA-웹앱](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-JPA-%EC%9B%B9%EC%95%B1))