# Astra Shell Phase 1-1 Mock Data Schema

> 현재 문서는 Phase 1-1 기준의 mock data schema 문서입니다. 실제 JSON loader, API, database, OS integration, native bridge, OS command API를 만들지 않습니다.

## 공통 원칙

- 모든 데이터는 fake/mock data입니다.
- 실제 사용자 데이터, 실제 시스템 상태, 실제 파일 목록을 읽지 않습니다.
- 실제 보안 상태를 검사하지 않습니다.
- 실제 명령 실행 기능을 만들지 않습니다.
- WebView mock을 하더라도 localhost/static/mock data 전용으로만 설계합니다.

## Root Mock State

| 필드 | 타입 후보 | 설명 |
| --- | --- | --- |
| `currentUser` | object | 표시용 fake 사용자 |
| `sessionState` | object | mock 로그인/세션 상태 |
| `systemStatus` | object | 시간, 저사양 모드, shell 상태 |
| `securityStatus` | object | 보안 요약 mock |
| `vaultStatus` | object | Vault 상태 mock |
| `shieldStatus` | object | Astra Shield 상태 mock |
| `guardianStatus` | object | Guardian 상태 mock |
| `networkStatus` | object | 네트워크 상태 mock |
| `batteryStatus` | object | 배터리 상태 mock |
| `notifications` | array | synthetic notification |
| `quickSettings` | object | quick toggle/slider mock |
| `runningApps` | array | 실행 중 앱 mock |
| `pinnedApps` | array | Dock 고정 앱 mock |
| `workspaces` | array | workspace mock |
| `recentFiles` | array | fake recent file label |
| `privacyEvents` | array | synthetic privacy/security event |
| `aiStudioStatus` | object | AI Studio sandbox/localhost 상태 mock |

## Field Details

### `currentUser`

| 필드 | 값 후보 | 설명 |
| --- | --- | --- |
| `id` | `mock-user-owner` | 실제 계정 ID 아님 |
| `displayName` | `Astra User` | fake 표시 이름 |
| `roleLabel` | `Owner` | mock role |
| `avatarToken` | `avatar.owner` | 실제 이미지 파일 아님 |

### `sessionState`

| 필드 | 값 후보 |
| --- | --- |
| `kind` | `signedOut`, `typing`, `mockChecking`, `mockDenied`, `demoReady` |
| `locked` | boolean |
| `messageKey` | locale key 후보 |

### `systemStatus`

| 필드 | 값 후보 |
| --- | --- |
| `timeLabel` | `09:41` |
| `dateLabel` | `Phase 1-1 Mock Day` |
| `lowResourceMode` | boolean |
| `shellMode` | `desktopMock`, `overviewMock` |

### `securityStatus`

| 필드 | 값 후보 |
| --- | --- |
| `level` | `safeMock`, `attentionMock`, `disabledMock` |
| `summary` | 표시용 mock 문구 |
| `lastCheckedLabel` | `Mock only` |

### `vaultStatus`

| 필드 | 값 후보 |
| --- | --- |
| `state` | `lockedMock`, `availableMock`, `notConfiguredMock` |
| `contentAccess` | 항상 `notRead` |
| `messageKey` | locale key 후보 |

### `shieldStatus`

| 필드 | 값 후보 |
| --- | --- |
| `mode` | `protectedMock`, `attentionMock`, `offlineMock` |
| `scanState` | 항상 `notRunning` |
| `resultSource` | 항상 `mockOnly` |

### `guardianStatus`

| 필드 | 값 후보 |
| --- | --- |
| `health` | `healthyMock`, `attentionMock` |
| `recoveryReadiness` | `documentedOnly`, `previewOnly` |
| `lastRepair` | 항상 `neverExecuted` |

### `networkStatus`

| 필드 | 값 후보 |
| --- | --- |
| `mode` | `localOnly`, `offlineMock` |
| `externalExposure` | 항상 `disabled` |
| `label` | 표시용 mock 문구 |

### `batteryStatus`

| 필드 | 값 후보 |
| --- | --- |
| `level` | 0-100 |
| `charging` | boolean |
| `mode` | `balancedPremium`, `lowResourceMock` |

### `notifications[]`

| 필드 | 값 후보 |
| --- | --- |
| `id` | synthetic id |
| `source` | `security`, `system`, `app`, `aiStudio` |
| `severity` | `info`, `attention`, `blocked` |
| `titleKey` | locale key 후보 |
| `bodyKey` | locale key 후보 |
| `read` | boolean |

### `quickSettings`

| 필드 | 값 후보 |
| --- | --- |
| `localOnly` | boolean |
| `focusMode` | boolean |
| `lowResourceMode` | boolean |
| `performanceMode` | `balancedPremium`, `batterySaverMock`, `lowLatencyMock` |
| `brightness` | 0-100 mock |
| `volume` | 0-100 mock |

### `runningApps[]`

| 필드 | 값 후보 |
| --- | --- |
| `appId` | synthetic app id |
| `label` | 표시용 app name |
| `state` | `activeMock`, `backgroundMock`, `previewOnly` |
| `workspaceId` | synthetic workspace id |
| `windowTitle` | fake title |

### `pinnedApps[]`

| 필드 | 값 후보 |
| --- | --- |
| `appId` | synthetic app id |
| `label` | 표시용 app name |
| `iconToken` | icon token 후보 |
| `opensScreen` | mock screen id |

### `workspaces[]`

| 필드 | 값 후보 |
| --- | --- |
| `id` | synthetic workspace id |
| `label` | `Workspace 1` |
| `active` | boolean |
| `windowCount` | number mock |

### `recentFiles[]`

| 필드 | 값 후보 |
| --- | --- |
| `id` | synthetic id |
| `label` | `Mock project brief` |
| `kind` | `documentMock`, `imageMock`, `folderMock` |
| `pathDisplay` | fake path label only |

### `privacyEvents[]`

| 필드 | 값 후보 |
| --- | --- |
| `id` | synthetic id |
| `source` | `settings`, `securityCenter`, `aiStudio` |
| `eventType` | `permissionPreview`, `sandboxNotice`, `localOnlyNotice` |
| `messageKey` | locale key 후보 |

### `aiStudioStatus`

| 필드 | 값 후보 |
| --- | --- |
| `mode` | `sandboxLocalhostMock`, `disabledMock` |
| `webUiExposure` | 항상 `externalDisabled` |
| `apiKeyAccess` | 항상 `blockedByDefault` |
| `networkAccess` | `localOnly` |

## 금지 데이터 기준

- 실제 사용자 이름, 계정 ID, 홈 디렉터리 경로
- 실제 암호, token, API key, secret
- 실제 파일 목록, 최근 문서, 브라우저 기록
- 실제 프로세스, 창, workspace, 네트워크, 배터리 상태
- 실제 백신/EDR 결과, 격리 목록, 탐지 로그
- 실제 Vault 내용, 파일명, 암호화 metadata

