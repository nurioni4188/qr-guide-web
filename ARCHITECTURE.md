# 공개 민원 QR 길잡이 - 아키텍처 설계

## 목표
QR 코드 스캔 후 로그인 없이 바로 민원 안내를 받을 수 있는 시스템

## 라우트 분류

### 공개 라우트 (비로그인 접근 가능)
- `/` - 홈 페이지 (민원 유형 선택)
- `/guide/:serviceId` - 민원 상세 안내 페이지
- `/guide/:serviceId/documents` - 필수 서류 목록
- `/guide/:serviceId/checklist` - 방문 전 체크리스트
- `/guide/:serviceId/process` - 처리 절차
- `/guide/:serviceId/faq` - 자주 묻는 질문

### 보호된 라우트 (로그인 필수)
- `/dashboard` - 사용자 대시보드
- `/saved-guides` - 저장한 가이드 목록
- `/admin` - 관리자 페이지
- `/admin/services` - 민원 유형 관리
- `/admin/statistics` - 통계 확인

## 백엔드 API 구조

### 공개 API (publicProcedure)
- `guides.getService(serviceId)` - 민원 상세 정보 조회
- `guides.listServices()` - 민원 유형 목록 조회
- `guides.searchFAQ(query)` - FAQ 검색

### 보호된 API (protectedProcedure)
- `guides.saveGuide(serviceId, content)` - 가이드 저장
- `guides.listSavedGuides()` - 저장한 가이드 목록
- `guides.deleteSavedGuide(guideId)` - 저장한 가이드 삭제
- `admin.updateService(serviceId, data)` - 민원 유형 수정
- `admin.getStatistics()` - 통계 조회

## 인증 흐름

### 공개 페이지 접근
1. 사용자가 QR 코드 스캔 → `/guide/workers-compensation` 접속
2. 로그인 체크 없이 바로 페이지 렌더링
3. 필요한 정보 표시 (서류, 체크리스트, 절차 등)

### 보호된 기능 사용
1. 사용자가 "가이드 저장" 버튼 클릭
2. 로그인 여부 확인
3. 미로그인 시: 로그인 모달 표시
4. 로그인 후: 저장 기능 실행

## 데이터베이스 스키마

### 기존 테이블
- `users` - 사용자 정보
- `saved_guides` - 저장된 가이드

### 새로운 테이블 (필요시)
- `services` - 민원 유형 정보
- `faqs` - 자주 묻는 질문
- `statistics` - 접근 통계

## 프론트엔드 라우팅

```
App.tsx
├── 공개 라우트
│   ├── / (Home)
│   └── /guide/:serviceId (ServiceDetail)
├── 보호된 라우트
│   ├── /dashboard (Dashboard)
│   ├── /saved-guides (SavedGuides)
│   └── /admin/* (Admin)
└── 기타
    └── /404 (NotFound)
```

## 인증 상태 관리

- `useAuth()` 훅으로 현재 사용자 정보 조회
- 공개 페이지: 인증 상태 무시
- 보호된 기능: 인증 필수 (미로그인 시 로그인 모달)
- 관리자 기능: 역할 확인 필수 (role === 'admin')
