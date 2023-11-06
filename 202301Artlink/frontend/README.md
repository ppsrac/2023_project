# ArtLink Frontend

<!-- 필수 항목 -->

## 소개

**ArtLink** 프로젝트의 Frontend 코드

<!-- 필수 항목 -->

## 기술스택 및 라이브러리

| Tech       | Version | Description             |
| ---------- | ------- | ----------------------- |
| Node.js    | 18.16.1 | JavaScript Runtime      |
| TypeScript | 5.0.2   | JavaScript Superset     |
| Three.js   | 0.154.0 | JavaScript 3D Library   |
| React      | 18.2.0  | JavaScript Framework    |
| ESLint     | 8.44.0  | JavaScript Linter       |
| Vite       | 4.4.0   | Build Tool & Dev Server |

<!-- 필수 항목 -->

## 개발 환경 구성

1. 프로젝트 다운로드

   ```
   git clone <repo URL> <folder-name>
   ```

2. frontend 폴더로 이동

   ```
   cd frontend
   cd artlink-front
   ```

3. 패키지 설치

   **주의: Node.js LTS 버전이 설치되어 있어야 함!**

   ```
   npm install
   npm i -g pnpm
   pnpm i
   ```

   npm을 써도 되지만pnpm은 npm보다 패키지 관리가 효율적이기 때문에 패키지 관리 시 pnpm을 설치해 사용하는 것을 권장함.

4. 프로젝트 실행

   npm:

   ```
   npm run dev
   ```

   pnpm:

   ```
   pnpm run dev
   ```

5. 프로젝트 빌드

   npm:

   ```
   npm run build
   ```

   pnpm:

   ```
   pnpm build
   ```

## 라우터 구조(Page 디렉토리 구조)

### Service start

`/` : 로고와 이동화살

`/login` : 로그인

`/signup` : 회원가입

`/login-gallery` : 로그인

`/signup-gallery` : 회원가입

`/login-admin` : 로그인

### User

`/home` : (유저 갤러리 매니저) 공통

`/art-memory` : 과거 여정들 조회

`/art-memory/<pk>` : 과거 여정 상세 조회

`/art-memory/<pk>/edit` : 선택 과거 여정 edit

`/art-memory/<pk>/3d` : threeJs 조회

`/mypage` : 마이페이지 (유저, 갤러리 공통)

`/mypage/edit` : 마이페이지 수정

### Gallery

`/home` : (유저 갤러리 매니저) 공통

`/works-board` : Artwork Manage board

`/works-board/create` : Artwork C

`/works-board/<pk>` : Artwork R

`/works-board/<pk>/edit` : Artwork U & D

`/gallery/addiot` : 히든 Url) iot 등록

`/gallery/removeiot` : 히든 Url) iot 해제

`/mypage` : 마이페이지 (유저, 갤러리 공통)

`/mypage/edit` : 마이페이지 수정

### Manager

`/home` : (유저 갤러리 매니저) 공통

`/user-board` : 유저리스트 소팅

`/user-board/<pk>` : 선택 유저 정보 관리

`/gallery-manage` : 갤러리리스트 소팅

`/gallery-manage/<pk>` : 선택 갤러리 정보 관리

### Kiosk

`/kiosk/home` : 키오스크 홈

`/kiosk/<pk>` : 전시 여정

`/kiosk/<pk>/edit` : 전시 여정 수정

`/kiosk/print` : 전시 프린트

`/kiosk/exit` : 전시 종료

`/kiosk/result/<pk>` : 사용자 기념품

### Other

`/contact` : 연락

`/about` : 서비스 및 팀소개
