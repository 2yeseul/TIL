# M1 (ARM64)에서 docker mysql 실행하기 

``` sql
docker run -d -p 3306:3306 \                                 
 -e MYSQL_ALLOW_EMPTY_PASSWORD=true \
 --name mysql \
 --platform linux/amd64 -it mysql:5.7
 ```