# Spring Boot 프로젝트 CI시, 특정 profile에 h2를 datasource로 지정하여 github action 실행시키기

# ./github/workflows/CI.yml

``` yml
# This workflow uses actions that are not certified by GitHub.
# They are provided by a third-party and are governed by
# separate terms of service, privacy policy, and support
# documentation.
# This workflow will build a Java project with Gradle and cache/restore any dependencies to improve the workflow execution time
# For more information see: https://help.github.com/actions/language-and-framework-guides/building-and-testing-java-with-gradle

name: CI

on:
  push:
    branches:
      - '**'
  pull_request:
    types: [ opened, synchronize, reopened ]

jobs:
  build:

    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up JDK 17
        uses: actions/setup-java@v2
        with:
          java-version: '17'
          distribution: 'adopt'
          cache: gradle
      - name: Cache Gradle packages
        uses: actions/cache@v2
        with:
          path: ~/.gradle/caches
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle') }}
          restore-keys: ${{ runner.os }}-gradle
      - name: Grant execute permission for gradlew
        run: chmod +x gradlew
      - name: Build with Gradle
        run: SPRING_PROFILES_ACTIVE=test ./gradlew clean build

```

# application-test.yml

```yml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    username: sa
    password: password
    driverClassName: org.h2.Driver
  h2:
    console.path: /h2-console
    console.settings.trace: false
    console.settings.web-allow-others: false
  jpa:
    show-sql: true
    database-platform: org.hibernate.dialect.H2Dialect
    hibernate:
      ddl-auto: create
  output:
    ansi:
      enabled: always
logging:
  level:
    org.hibernate.type: trace

```
