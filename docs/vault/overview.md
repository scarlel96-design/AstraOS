# Astra Vault Overview

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 정의

Astra Vault는 사용자 소유 민감 파일을 보호하기 위한 OS 통합 암호화 금고로 설계합니다. Phase 0에서는 실제 금고 암호화 엔진을 구현하지 않고, 보안 경계와 요구사항만 문서화합니다.

## Phase 0 범위

- master password를 저장하지 않는 원칙
- 강력한 키 파생 함수 후보 검토
- CSPRNG 기반 데이터 키 생성 원칙
- authenticated encryption 후보 검토
- 파일명, 메타데이터, 폴더 구조 보호 목표
- permission broker를 통한 접근 제어
- Astra Shield와의 상호작용 경계

## 보안 경계

- Vault 내용은 사용자 명시 동의 없이 외부로 업로드하지 않는다.
- Astra Shield도 Vault 내부 내용을 임의로 전송하지 않는다.
- 복구 절차는 사용자 확인과 감사 로그를 요구한다.
- 암호화 실패, 키 손실, 권한 오류는 안전하게 중단해야 한다.

## 금지 범위

- 실제 암호화 엔진 구현
- master password 저장
- hardcoded key 또는 hardcoded secret
- 사용자 동의 없는 파일 업로드
- credential theft 또는 키 탈취 기능

