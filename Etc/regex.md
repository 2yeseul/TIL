# 정규식 

~~더이상 미룰 수 없다 정규식 공부~~

![img](https://github.com/ziishaned/learn-regex/raw/master/img/regexp-en.png)


# 메타문자
메타문자는 정규표현식을 구성하는 문자들인데, 원래 그 문자가 가진 뜻으로 사용되는 것이 아니라 특별한 용도로 사용된다. 상수 문자로 사용할 땐 문자 앞에 역슬래시를 붙이면 된다.

|메타문자|설명|
|--------|----|
|.|줄바꿈을 제외한 어떤 단일 문자와 매치|
|[]|대괄호 내에 있는 문자들로 매치|
|[^]|대괄호 내에 있는 문자들을 제외하고 매치|
|*|* 바로 앞에 있는 문자가 0번 이상 반복된 문자와 매치|
|+|+ 바로 앞에 있는 문자가 1번 이상 반복된 문자와 매치|
|?|? 바로 앞에 있는 문자를 Optional로 만든다|
|{n,m}|{n,m} 바로 앞에 위치한 문자가 최소 n번 최대 m번 반복된 문자와 매치|
|{xyz}|문자열 xyz와 정확히 같은 순서를 가진 문자들과 매치||
| ㅣ | ㅣ 앞에 있거나 뒤에 있는 문자면 매치|
| \ | 메타문자를 상수문자로 사용|
|^| 입력의 시작과 매치
|$| 입력의 끝과 매치|


## (.) 마침표
<pre>
".ar" => The <strong>car</strong> <strong>par</strong>ked in the <strong>gar</strong>age.
</pre>

## [] 문자집합
<pre>
"[Tt]he" => <strong>The</strong> car parked in <strong>the</strong> garage.
</pre>

`[Th]he` 는 대문자 T 혹은 소문자 t가 나온 뒤 he가 나오는 패턴을 의미한다. 대괄호 내부에 명시된 문자들 순서는 중요하지 않다.

대괄호[] 내부에서 사용되는 온점(.) 은 상수 문자이다. ar[.] 는 `ar.` 패턴이다.
<pre>
"ar[.]" => A garage is a good place to park a c<strong>ar.</strong>
</pre>