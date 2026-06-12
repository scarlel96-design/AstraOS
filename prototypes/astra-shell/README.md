# Astra Shell Prototype Scaffold

> 현재 디렉터리는 Phase 1-0 기준의 Astra Shell UI mock scaffold입니다. 실제 앱 코드, 실제 로그인, 권한 상승, 시스템 설정 변경, 보안 정책 변경, 드라이버 제어, 백신 연동, OS 제어 기능을 구현하지 않습니다.

## 목적

이 디렉터리는 Phase 1 prototype에서 Astra Shell UI mock을 배치할 위치를 예약합니다. 현재는 문서 중심 scaffold이며 실행 가능한 앱 코드를 포함하지 않습니다.

## 추천 구조

```text
prototypes/astra-shell/
├── README.md
├── mock-data/
├── screens/
├── design-tokens/
└── notes/
```

## Phase 1-0 허용 범위

- 정적 mock data
- 화면별 notes
- 디자인 토큰 초안
- UI wireframe 또는 mock asset
- 실제 OS API와 연결되지 않는 prototype 문서

## Phase 1-0 금지 범위

- 실제 로그인 인증
- 권한 상승
- 시스템 설정 변경
- 보안 정책 변경
- 드라이버 제어
- 백신 또는 EDR 연동
- Secure Delete 실행
- Vault 암호화 엔진
- AI WebUI 실행
- 파일 삭제 또는 시스템 명령 실행
