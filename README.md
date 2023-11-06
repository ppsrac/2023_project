## 프로젝트 1: 간편한 원클릭 기기를 통한 미술품 기록 서비스

**기간**: 7주

**상세 주제**: 

위치를 기반으로 한 이벤트 트래킹 서비스

- 작가의 작품들은 그 작가의 여정이지만, 관람객에게는 미술관 관람 자체가 하나의 여정임.
- 우리는 관람객이 여정에 더욱 몰입할 수 있도록 해당 서비스를 제안고자 함.
- 특정 미술품 앞에서 원클릭 기기를 클릭하면 해당 미술품이 DB에 저장되고 관람 종료 후 선택한 미술품을 모아 영구히 볼 수 있는 서비스

**전체 시스템 구성도**

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/9f9032de-497e-4f89-bba1-9ed8445c8e13/Untitled.png)

빨간색으로 표기한 부분은 본인이 담당하여 개발한 파트

- 사용 언어 : C++, Python(Django), Java(Spring)
- 개발 내용
    
    스프링 WAS 개발, 장고 Bridge Server 개발, DB 구상 및 핵심 알고리즘 개발.
    
    - 상세 내용
        - DB 구상: Spring, Django 서버에 필요한 ERD 및 관계 작성
        - 스프링 WAS ERD
            
            ![데이터베이스 (3).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ac866512-3b8b-401b-932e-221417f25cac/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4_(3).png)
            
        - 장고 ERD
            
            ![임베.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/96a42820-8431-467f-9bfd-58cdca85441b/%EC%9E%84%EB%B2%A0.png)
            
        - 스프링 WAS API 명세서 :
            
            [Spring WAS API 명세서 ](https://www.notion.so/Spring-WAS-API-4447d04d34ff4b18b429469aa2d04c97?pvs=21)
            
        - 장고 브릿지 서버 API 명세서:
            
            [Django Bridge Server API 명세서](https://www.notion.so/Django-Bridge-Server-API-4933771287654371b570e7c073866a1f?pvs=21)
            
        - 스프링 Web Application Server (Java Corretto 11, Spring 2.7.13, Gradle 사용)
            - Amazon S3에 미술품의 이미지, 갤러리 포스터, 전시회 포스터 등을 등록하는 api 개발
            - 전시회 관람객이 전시회 내부에서 기기를 등록하는 것부터 기기 반납 후 해당 데이터가 저장되는 순간까지의 모든 api 개발
            - 전시회 관리 api 뿐만 아니라 전반적인 모든 부분에 대한 api 수정
        - 장고 Bridge Server (Python 3.9.17, Django 4.1.10 사용, C++ 사용)
            - MQTT와의 통신을 위해 필요한 서버 (MQTT가 C++, Python으로 다룰 수 있음)
            - MQTT를 사용하는 경우 사용자의 원클릭 기기와 미리 설치된 앵커 기기와의 거리만 주어질 뿐, 정확한 좌표를 모름. 이를 찾는 수학적인 방법을 제시 및 구현.
            - 가장 가까운 미술품을 찾는 알고리즘을 좀 더 최적화 함.(C++ 사용)
        - CI/CD
            - 스프링, 프론트 엔드 + Nginx를 Docker container에 올리기.

- 회고
    - 초기 목표
        - Spring WAS는 웹 어플리케이션으로 웹 서비스에 관련된 내용을, 장고 브릿지 서버는 IoT기기와의 통신과 해당과정에서 필요한 무거운 연산을 처리하는 서버로 분리하여 개발한다면 어느 단에서 오류가 나는지 확인도 편하고 개발하기에도 목적이 분리되어 개발하기 편하다고 생각하였다.
        - MQTT 의 신호를 받고 연산을 한 뒤 이 결과를 스프링에 전달하는 역할을 REST API가 작동하는 C++ 서버로 구현하려고 함.
        - Spring Server의 경우 REST API를 완벽히 지키며 재사용성 높고 깔끔한 코드를 작성하려고 하였음.
        - 개발 기간동안 세부 마일스톤을 잘 잡고 그 마일스톤을 주어진 기간 안에 끝마치고 1주 남기고 Test 및 발표 준비를 널널하게 하려고 하였음.
        - 임베디드 : 시스템에 알맞은 라이브러리를 작성하여 얹는 것을 목표로 하였음. click 시 timestamped 신호와 아이디를 송신하여 anchor에서는 수신하여 tag id 별로 측위를 계산하는 방식으로 개발하고자 함.
    - 문제점
        - 전체 : 각각의 기능 단위 테스팅의 부재, 전체 시스템 구동이 7주차에 이르러서야 되었음. 애자일 하지 못함
        - 임베디드: 신규 라이브러리 개발 불가.
        - 백엔드: 백엔드 간 코드 리뷰 미진행 ⇒ 매번 관련 코드에 대해 코드를 이해하는 시간이 필요했고 결과적으로 프로젝트의 지연으로 이어졌다.
        - 백엔드/임베디드: 백엔드 임베디드 간 통신을 구축하는 것이 매우 미뤄졌다. 초기에는 4주차 혹은 5주차에 되는 것으로 계획이 잡혀있었으나 미뤄짐 ⇒ 전체 시스템 구동이 몹시 늦어지고 동시에 구동하면서 생기는 버그들을 제대로 잡을 시간이 부족하였음.
    - 개선하려고 시도한 점
        - 임베디드 : single thread 기반의 비동기 시스템을 정의하는 것에 어려움이 존재, RAM을 활용하는 callback으로 버튼을 활성화 하였으나, boolean 하나를 flag 로 trigger하는 정도의 capacity를 보유함. 이를 바탕으로 가능한한 각 간단한 구조로 loop 내에서 지정된 timer를 기반으로 실행되도록 하였음. 그럼에도 loop간의 간섭이 지속적으로 발생함에 있어, 하드웨어의 문제인지 소프트웨어의 문제인지 판별하지 못한 문제점 존재함.
    - 추후 개선 방안
        - 도커, CI/CD 의 순서는 최초에 진행이 되어야함
        - 임베디드 : 개발 순서가 잘못 돼 있었음. 프로토타입 설계 → 프로토타입 제작에 걸린 시간이 너무 걸렸음. 변명 아닌 변명을 한다면 모듈 및 보드에 대한 이해가 떨어졌기 때문에, 모듈 단일 모듈을 구입하는 것으로 시간이 지체된 문제점이 가장 큰 (-) 요인이었음. 가능하면 패키징된 완제품을 구매하고, 전문가에게 외주를 맡기는 것이 하드웨어 제작의 human error를 방지하는 방법이 아니었는가 함.
        

## 프로젝트 2: 간편한 원클릭 기기를 통한 미술품 기록 서비스

**기간**: 7주 (SSAFY 특화 우수 프로젝트 수상)

**상세 주제**: 

재고 기반 레시피 추천, 남는 식재료 나눔, OCR STT등을 통한 쉬운 재고 관리 서비스

- 기획 배경
### 1. '원더프리지' 같은 기존 냉장고 관리 어플리케이션의 한계
- 기존의 냉장고 관리 어플리케이션은 식재료 등록이 번거롭고, 적절한 활용처를 제공해주지 않음
### 2. 여러 명이 한 냉장고를 사용할 때의 어려움
- 가구 구성원끼리 냉장고를 공유하는 경우 정확한 식재료 파악이 어려움
### 3. 소비 패턴의 변화와 그에 따른 식재료 폐기 증가
- 가구 구성원 수가 줄어들고 배달 문화가 발달하면서, 소비기한 내에 먹지 못하고 폐기되는 식재료의 양이 증가함

**전체 시스템 구성도**

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c8432907-3ce3-49a9-aecd-d9350cae0528/63fbe71e-1262-42ab-bc8a-bf39c5644c3d/Untitled.png)

(빨간색 부분은 본인이 담당한 파트)

- 사용 언어: Spring boot 2.7.15, React Native
- 개발 내용
    
    MSA로 구성된 Spring WAS 개발, FrontEnd에서 OCR, STT 기능 개발 
    
    - BackEnd ERD

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/c8432907-3ce3-49a9-aecd-d9350cae0528/3074bd41-b318-423d-8790-d3c62c4a8f9c/Untitled.png)

1. Spring boot WAS 개발
- Member Server
    - Kakao 에서 제공하는 OAuth를 이용하여 카카오 인증과 이를 이용한 소셜 로그인 구현
    - S3 스토리지를 이용한 회원가입 유저의 프로필 이미지 등록
    - OpenFeign을 통한 타 서버와의 통신
- Ingredient-Extract Server
    - Aho-Corasick 알고리즘을 통해 주어진 문자열에서 데이터 베이스 내 재료를 빠르게 뽑아내어 사용자에게 가능한 재료의 목록을 빠르게 제공 (OCR, STT와 연결하기 위한 기능)
    - `@PostConstruct`를 이용하여 서버가 켜지는 동시에 데이터 베이스에 있는 데이터를 빠르게 캐싱 데이터로 변환하여 보다 최적화를 가함.
- Share Server
    - 식재료 나눔 글, 사진 등에 대한 CRUD API 서버
1. Application 개발(FrontEnd, React Native) 
    - OCR, STT 구현을 위해 Tesseract library와 Google Cloud Api를 사용해보고 비교해봄.
        
        결과 : Google Cloud Api가 실행시간으로나 정확도상으로 크게 앞서는 것을 확인. 
        
        Google Cloud Api 사용하여 구현
        
    - 레시피 등록, 레시피 관리, 레시피 좋아요 및 목록 구현

- 회고
    - 초기 목표
        - 코드 중복 제거 및 간결하고 SOLID 원칙을 잘 지킨 DRY 코드를 작성하려고 생각하였음
        - 개발 속도를 빠르게 가져가며 Google Play Store 배포까지 진행해보고 싶었음.
    - 문제점
        - 전체 : 예상보다 기획이 너무 오래 걸림(3주차 말에 끝남)
        - 백엔드 : DTO를 Entity로 바꾸거나 Error Response 등을 처리하는데 많은 코드를 중복시킴.
        - 백엔드: MSA 구조가 불러오는 코드의 중복이 생김.
    - 개선하려고 시도한 점
        - MapStruct를 나중에 도입하고 서비스 단에 DTO Entity간 변환 코드를 두지 않고 Converter를 따로 두어 사용함.
        - MSA를 멀티 모듈로 쪼갠 후 필요시 추가 마이크로 서버로 분리하려 기획해봄. 그러나 마이크로 서버가 늘어날 수록 설정이 많고 전체적인 서비스가 더더욱 복잡해져 복잡도 증가만 야기함.
    - 추후 개선 방안
        - 성공적인 멀티 모듈 프로젝트 참고하기
        - Spring Framework가 아닌 Go언어 등 다양한 프레임워크를 참고해보며 적절한 방법을 탐구해보는 것이 좋다고 생각함.
