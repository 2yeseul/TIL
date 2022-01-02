# 삭제된 commit 복구하기 
```
git reflog
```
를 통해 삭제된 commit의 commit id를 조회한 뒤,
```
git reset --hard {deleted-commit-id}
```
를 실행한다. 