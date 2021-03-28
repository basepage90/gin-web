# Gin-Web

gin framework 로 만드는 website

## Gin-Web (tag : v0.0.3)
- middleware 디렉토리 생성 ( gin.Default() 에서 gin.New() 로 변경 )
    - Logging 추가
    - basic auth 추가
    - ~~req/res 디버깅을 위한 gindump 추가~~

## Gin-Web (tag : v0.0.2)
- request의 accept header 별로 처리해줄 공통 처리해줄 redner 함수 추가

## Gin-Web (tag : v0.0.1)
- 각 언론사의 뉴스기사를 스크랩하여, 원하는 키워드별로 정리해서 보여주는 website 계획
    - 하나의 키워드에 대하여 여러 언론사의 기사를 비교하여 볼수 있다.
- directorty  재구성
    - router / controller / service / model
    - main router 에서 각 router group을 init 하도록 구성
    
    ![ex_screenshot](./docs/dir_remake.png)

## initial commit
- directory structure 임시 생성

    ![ex_screenshot](./docs/directory.png)

