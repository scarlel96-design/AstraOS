# VM Host Requirements

> 현재 문서는 Phase 1-8 기준이며 실제 구현이 아니라 설계/범위/거버넌스 문서입니다. 이 문서는 실제 VM 생성, ISO 다운로드, OS 설치, 파티션 작업, 부트로더 작업, 드라이버 설치, GPU passthrough 구성, 시스템 변경을 수행하지 않습니다.

## 목적

Fedora Atomic / Silverblue 계열과 openSUSE Aeon / MicroOS 계열을 나중에 VM에서 안전하게 검증하기 위한 host 요구사항과 VM tool 선택 기준을 정의합니다.

기본 host 가정은 Windows 11 개발 PC입니다. 이 문서는 host PC를 AstraOS 실험 대상으로 사용하지 않기 위한 보호 기준을 우선합니다.

## 범위

- Windows 11 host 기준 요구사항
- CPU virtualization 지원 필요성
- RAM, disk, display, snapshot storage 예산
- NAT 우선 network isolation 옵션
- Hyper-V, VMware Workstation Player/Pro, VirtualBox, QEMU/UTM 계열 비교
- GPU passthrough 초기 금지 또는 낮은 우선순위 원칙
- main PC partition/bootloader 변경 금지 원칙

## 비범위

- 실제 hypervisor 설치
- BIOS/UEFI 설정 변경
- VM 생성
- ISO 다운로드 또는 실행
- host network adapter 변경
- host disk repartition
- GPU passthrough 구성
- Secure Boot key 등록
- driver 설치
- Linux base 후보의 최종 선택

## Host 요구사항

| 영역 | 권장 기준 | 이유 |
| --- | --- | --- |
| Host OS | Windows 11 | 현재 작업 환경과 desktop VM tool 호환성을 기준으로 문서화 |
| CPU | Hardware virtualization 지원 | immutable/atomic desktop VM을 안정적으로 구동하기 위한 전제 |
| Memory | 후보 VM 1개당 충분한 여유 RAM 확보 | desktop session, update test, rollback observation을 분리하기 위함 |
| Disk | base image, snapshots, evidence 보관 여유 공간 | snapshot-first 정책과 후보별 반복 실험 지원 |
| Display | Wayland desktop session 관찰 가능한 해상도 | Astra Shell 방향과 XDG portal 검증 입력 확보 |
| Network | NAT 우선, bridge 별도 승인 | host network 노출 최소화 |
| Shared folder | 기본 비활성 | host personal file 노출 방지 |
| Clipboard | 기본 비활성 또는 제한 | credential/token 유출 방지 |

## VM Tool 비교

| Tool | 장점 | 주의점 | Phase 1-8 판정 |
| --- | --- | --- | --- |
| Hyper-V | Windows 11 통합, snapshot/checkpoint 지원, host 관리 용이 | 일부 desktop GPU/guest integration 차이 확인 필요 | 1차 후보 |
| VMware Workstation Player/Pro | Linux desktop guest 호환성과 snapshot workflow가 강점 | edition/license와 snapshot 기능 차이 확인 필요 | 1차 후보 또는 보조 후보 |
| VirtualBox | 접근성이 좋고 간단한 desktop VM에 적합 | 최신 Wayland/graphics integration과 성능 확인 필요 | 보조 후보 |
| QEMU 계열 | 자동화와 고급 구성에 유리 | Windows host에서 초기 설정 난이도 높음 | 고급 실험 후보 |
| UTM 계열 | macOS host 중심 사용성이 강점 | Windows 11 host 기본 후보가 아님 | 현재 기본 후보 아님 |

## GPU 및 graphics 원칙

- 초기 Phase 1-9 VM PoC에서는 GPU passthrough를 기본 금지로 둡니다.
- NVIDIA/AMD/Intel driver 정책은 관찰/문서화 대상으로 분리합니다.
- graphics acceleration은 VM tool 기본 guest feature 범위에서만 검토합니다.
- GPU passthrough, Secure Boot signing, proprietary driver 실험은 별도 승인된 후속 단계에서만 다룹니다.

## 성공 기준

- Windows 11 host에서 안전한 VM PoC를 준비하기 위한 요구사항이 정리됩니다.
- VM tool 후보별 장점, 주의점, Phase 1-8 판정이 문서화됩니다.
- NAT 우선, shared folder 제한, clipboard 제한, snapshot storage 기준이 명시됩니다.
- main PC partition/bootloader 변경 금지가 명확합니다.

## 실패 기준

- bare metal 설치 또는 host disk 변경을 PoC 준비로 포함합니다.
- bridge network, shared folder, clipboard, GPU passthrough를 기본 허용으로 둡니다.
- VM tool 선택을 근거 없이 확정합니다.
- host credential, API key, personal file을 guest VM에서 사용할 수 있게 둡니다.

## 보안 경계

- host PC는 실험 대상이 아닙니다.
- host disk, partition, bootloader, firmware, driver 변경을 금지합니다.
- VM network는 NAT 우선이며 bridge는 별도 승인 전 금지합니다.
- shared folder와 clipboard는 기본 금지입니다.
- production account, secret, token, API key, personal data는 VM에 입력하지 않습니다.
- external download 실행은 Phase 1-8 범위가 아닙니다.

## 다음 단계

1. 후보 VM tool을 Phase 1-9 승인 전에 1개 primary, 1개 fallback으로 좁힙니다.
2. [VM Snapshot and Rollback Policy](vm-snapshot-and-rollback-policy.md)를 VM tool 선택 기준에 반영합니다.
3. [VM Test Safety Boundaries](vm-test-safety-boundaries.md)를 host 설정 전 checklist로 사용합니다.
4. Phase 1-9에서 사용자 승인 후 disposable VM만 생성합니다.
