# MySQL에서 `FOREIGN KEY` 설정된 table `TRUNCATE` 하기

```
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE 테이블명;
SET FOREIGN_KEY_CHECKS = 1;
```