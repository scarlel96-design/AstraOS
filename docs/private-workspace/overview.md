# Astra Private Workspace Overview

> 현재 문서는 Phase 0 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 OS 기능, 백신, Secure Delete, AI WebUI, 커널, 드라이버, ISO 빌드를 구현하지 않습니다.

## 정의

Astra Private Workspace는 민감 작업과 의심 파일 처리를 합법적이고 방어적인 방식으로 격리하기 위한 작업 공간입니다. anti-forensics 기능이 아니며, 사용자 보호와 사고 복구 가능성을 우선합니다.

## 기본 정책

- host folder 접근은 기본 차단한다.
- clipboard 공유는 기본 차단한다.
- network 접근은 기본 차단한다.
- 권한은 사용자 승인 후 제한적으로 부여한다.
- disposable workspace는 종료 시 임시 작업 데이터를 정리할 수 있다.
- 문서 내용은 로그에 남기지 않는다.
- 최소한의 암호화된 보안 이벤트만 남긴다.

## Phase 0 범위

- 격리 정책 설계
- 권한 승인 흐름 설계
- 로그 최소화 원칙
- Astra Shield와의 검사 경계
- Vault 파일 접근 경계
- Recovery와의 복구 흐름 정의

## 금지 범위

- anti-forensics 기능
- 은닉 작업 공간
- 사용자 확인 없는 데이터 파기
- 실제 sandbox 런타임 구현

