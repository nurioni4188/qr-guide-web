# QR 길잡이 프로젝트 TODO

## 핵심 기능 (완료)
- [x] 홈페이지 레이아웃 및 민원 목록 표시
- [x] 민원 상세 페이지 구현
- [x] 새로운 데이터 스키마 적용 (title, subtitle, whatIsThis, whoApplies 등)
- [x] 안내문 다운로드 기능 (PDF, 이미지, 텍스트 복사)
- [x] A4 포스터 페이지 구현
- [x] 내부 보고 요약 페이지 구현
- [x] 라우트 설정 (/, /service/:serviceId, /poster/:serviceId, /report/:serviceId)

## 데이터 구조 (완료)
- [x] 5개 민원 유형 데이터 정의
  - [x] 산재보상 신청 안내
  - [x] 고용보험 피보험자격 확인청구 안내
  - [x] 사업장 고용·산재보험 가입 및 변경 안내
  - [x] 지사 방문 전 준비 안내
  - [x] 서류 보완 및 처리상태 확인 안내

## 컴포넌트 (완료)
- [x] Home.tsx - 홈페이지 및 민원 목록
- [x] ServiceDetail.tsx - 민원 상세 정보
- [x] A4Poster.tsx - A4 포스터 뷰
- [x] InternalReport.tsx - 내부 보고 요약
- [x] DownloadGuideButton.tsx - 안내문 저장 기능

## 테스트 (완료)
- [x] guides 라우터 테스트 작성
- [x] listServices 프로시저 테스트
- [x] getService 프로시저 테스트
- [x] 모든 테스트 통과 (11/11 tests passed)

## 향후 기능 (선택사항)
- [ ] QR 코드 생성 및 표시
- [ ] 사용자 저장 기능 (로그인 필요)
- [ ] 검색 기능
- [ ] 필터링 기능
- [ ] 다국어 지원
- [ ] 모바일 앱 연동
