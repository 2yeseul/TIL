# Commit author 변경과 config user 관리

# 기존 commit의 author 변경

## git rebase를 통해 author 변경
```
git rebase -i HEAD~5
```
HEAD 뒤 숫자만큼 commit 이력 조회

해당 명령을 입력하여 변경할 커밋을 pick에서 `edit`으로 변경한다.

wq을 통해 저장한 뒤, author를 변경해주면 된다

```
git commit --ammend --author="username <useremail>"
```

그 후 
```
git rebase --continue
git push -f
```
을 차례로 해주면 된다.

# global user config 등록

```
git config --global user.name "username"
git config --global user.email "useremail"
```