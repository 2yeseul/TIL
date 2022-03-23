# $addToSet

> `$addToSet` 은 추가하려는 값이 배열에 존재하지 않는 경우에만 추가하는 연산자이다. 

- 필드가 배열이 아닌 경우 연산은 실패한다. 

``` 
db.collection.update({ _id: 1 }, { $addToSet: { colors: "red }})
```