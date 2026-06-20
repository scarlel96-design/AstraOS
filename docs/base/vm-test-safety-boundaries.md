# VM Test Safety Boundaries

> 현재 문서는 Phase 1-8 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 실제 VM 생성, ISO 다운로드, OS 설치, 파티션 작업, 부트로더 작업, driver 설치, destructive command 실행, 시스템 변경을 수행하지 않습니다.

## 목적

Phase 1-9 VM PoC가 승인되기 전에 host PC, 사용자 데이터, 계정, network, AstraOS 보안 경계를 보호하기 위한 안전 규칙을 정의합니다.

이 문서는 보안 실험을 공격 기능, exploit, credential theft, AV bypass, anti-forensics로 확장하지 못하도록 제한합니다.

## 범위

- bare metal install 금지
- host disk, partition, bootloader 변경 금지
- destructive command 금지
- credential, token, API key 사용 금지
- production account login 금지
- personal files mount 금지
- network exposure 제한
- bridge network 기본 금지와 NAT 우선
- external download execution 후속 승인 필요
- defensive-only security experiment 원칙

## 비범위

- 실제 VM 생성
- 실제 network adapter 변경
- 실제 ISO 다운로드 또는 실행
- 실제 guest OS 설치
- host firewall, router, VPN 설정 변경
- credential manager 연동
- malware sample 실행
- offensive security test
- Secure Delete, Astra Shield, Vault, AI Studio 실제 기능 구현

## 안전 규칙

| 영역 | 기본 정책 | 예외 조건 |
| --- | --- | --- |
| Bare metal | 금지 | 별도 Phase와 별도 장비 승인 필요 |
| Host disk | partition, format, bootloader 변경 금지 | 없음 |
| VM network | NAT 우선 | bridge는 목적/위험/rollback 승인 필요 |
| Shared folder | 기본 금지 | read-only synthetic test folder만 별도 승인 |
| Clipboard | 기본 금지 또는 제한 | credential 없는 짧은 text evidence만 별도 승인 |
| Account | production login 금지 | disposable test account만 별도 승인 |
| Secret | token/API key/password 입력 금지 | 없음 |
| Downloads | Phase 1-8에서 실행 금지 | Phase 1-9 승인 후 source/checksum policy 필요 |
| Security test | defensive validation만 허용 | offensive, bypass, exploit 금지 |

## 금지되는 작업

- main PC에 AstraOS 후보를 bare metal로 설치
- host disk repartition, format, bootloader 변경
- destructive command 실행
- VM에서 host personal folder mount
- production cloud account, browser sync, email account 로그인
- credential, token, API key, SSH key, private key 입력
- bridge network를 기본값으로 사용
- unknown external download 실행
- malware, exploit, credential theft, AV bypass, evasion, anti-forensics 실험
- Secure Delete 실제 삭제 동작 구현 또는 실행
- Astra Shield를 실제 endpoint protection engine처럼 실행

## 성공 기준

- Phase 1-9 VM PoC 전에 host 보호와 network 제한 기준이 명확합니다.
- NAT 우선, bridge network 별도 승인, shared folder 제한, clipboard 제한이 문서화됩니다.
- credential, token, API key, personal file 금지가 명확합니다.
- security experiment는 defensive validation으로만 제한됩니다.
- 실제 실행은 Phase 1-8 범위 밖임이 명확합니다.

## 실패 기준

- bare metal install 또는 host partition 작업을 VM PoC의 일부로 취급합니다.
- bridge network, shared folder, clipboard를 기본 허용합니다.
- production account나 personal file 사용을 허용합니다.
- offensive security, exploit, AV bypass, credential theft, anti-forensics로 오해될 수 있는 실험을 포함합니다.
- 실제 ISO 실행, VM 생성, driver 설치가 Phase 1-8에서 수행됩니다.

## 보안 경계

- 모든 실제 검증은 후속 승인된 disposable VM에서만 수행합니다.
- AstraOS 보안 기능은 방어 목적 설계로만 다룹니다.
- Secure Delete는 사용자 소유 데이터 보호 기능이며 anti-forensics가 아닙니다.
- Astra Shield는 백신/EDR/복구 구조이며 공격 기능이 아닙니다.
- AI Studio 또는 WebUI는 이번 VM PoC 범위가 아니며, 향후에도 sandbox/localhost 기본값을 유지합니다.
- Apple/Samsung/Microsoft proprietary asset은 포함하지 않습니다.

## 다음 단계

1. 이 문서를 Phase 1-9 승인 checklist의 blocking gate로 사용합니다.
2. [VM Snapshot and Rollback Policy](vm-snapshot-and-rollback-policy.md)와 함께 후보별 test plan을 검토합니다.
3. VM network, shared folder, clipboard 예외가 필요하면 별도 승인 문서로 분리합니다.
4. Phase 1-9에서 사용자 승인 후 disposable VM에서만 실제 PoC를 수행합니다.
