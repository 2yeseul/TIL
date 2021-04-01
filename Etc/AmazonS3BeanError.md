# 테스트 시 Error creating bean with name 'amazonS3' 

## 우선적으로 체크해야할 부분
- `org.apache.httpcomponents` dependency 버전 확인
    - httpclient와 httpcore는 버전에 따라 종속성을 가집니다.
    ![photo](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZNGUj%2Fbtq1C05TLW1%2FBSfybTpWfRskhew2kjjj10%2Fimg.png)

## test 파일에 @MockBean 설정 
``` java
    @MockBean
    S3UploaderImpl s3Uploader;

    @MockBean
    AmazonS3 amazonS3;

    @MockBean
    AmazonCloudFormation amazonCloudFormation;
```

`@Component`는 테스트 시에 자동으로 bean을 주입해주지 않기 때문에, 추가해주었다. 

한 이틀 동안 실행은 잘되는데 테스트에서 bean을 찾지 못해 이대로 테스트 파일을 작성하지 못하는것인지 관련 레퍼런스도 적어 막막했는데, 잘 해결 되었다.  