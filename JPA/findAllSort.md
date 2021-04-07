# JpaRepository의 findAll 사용 시, sort하는 방법 

`JpaRepository의` `findAll` 사용 시 `sort` 하는 방법
``` java
List<Tour> tours = tourRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
```
