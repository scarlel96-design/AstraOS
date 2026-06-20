(function initializeAstraShellMockData() {
  "use strict";

  const mockData = {
    routes: [
      { path: "/desktop", titleKey: "route.desktop.title", screen: "desktop" },
      { path: "/launcher", titleKey: "route.launcher.title", screen: "launcher" },
      { path: "/control-center", titleKey: "route.controlCenter.title", screen: "quickPanel" },
      { path: "/notifications", titleKey: "route.notifications.title", screen: "notificationCenter" },
      { path: "/settings", titleKey: "route.settings.title", screen: "settingsWindow" },
      { path: "/security-center", titleKey: "route.securityCenter.title", screen: "securityCenterWindow" },
      { path: "/app-center", titleKey: "route.appCenter.title", screen: "appCenterWindow" },
      { path: "/workspaces", titleKey: "route.workspaces.title", screen: "workspaceView" },
      { path: "/login", titleKey: "route.login.title", screen: "loginPreview" }
    ],

    strings: {
      ko: {
        "app.name": "Astra Shell",
        "app.phase": "Phase 1-5d",
        "app.staticOnly": "정적 미리보기",
        "action.skipToContent": "본문으로 이동",
        "route.desktop.title": "데스크톱",
        "route.launcher.title": "런처",
        "route.controlCenter.title": "빠른 설정",
        "route.notifications.title": "알림",
        "route.settings.title": "설정",
        "route.securityCenter.title": "보안 센터",
        "route.appCenter.title": "App Center",
        "route.workspaces.title": "작업 보기",
        "route.login.title": "세션 미리보기",
        "shell.searchPlaceholder": "앱, 설정, 문서 검색",
        "shell.securityQuiet": "정상",
        "shell.userSession": "Astra User",
        "shell.localOnly": "localhost",
        "shell.clock": "09:41",
        "shell.launcher": "런처 열기",
        "shell.quickPanel": "빠른 설정 열기",
        "shell.notifications": "알림 열기",
        "shell.workspace": "작업 보기 열기",
        "shell.previewOnly": "미리보기 전용",
        "shell.noRealAction": "실제 동작 없음",
        "desktop.emptyTitle": "Astra Desktop",
        "desktop.emptyBody": "macOS glass, One UI softness, Windows 11 Mica/Snap 감성을 AstraOS 방식으로 재해석한 정적 화면입니다.",
        "desktop.widgetWeather": "Calm Surface",
        "desktop.widgetBrief": "Astra Fusion",
        "desktop.widgetBody": "실제 시스템 상태가 아닌 디자인 미리보기입니다.",
        "launcher.pinned": "고정 앱",
        "launcher.recent": "최근 항목",
        "quick.wifi": "Wi-Fi",
        "quick.sound": "사운드",
        "quick.brightness": "밝기",
        "quick.performance": "Balanced",
        "quick.privacy": "Privacy",
        "quick.shield": "Shield",
        "quick.localhost": "Localhost",
        "quick.mockOnly": "mock 상태",
        "settings.sectionPersonal": "개인화",
        "settings.sectionSystem": "시스템",
        "settings.sectionPrivacy": "개인정보",
        "settings.sectionUpdates": "업데이트",
        "settings.copy": "설정 구조만 보여주며 실제 시스템 값을 읽거나 변경하지 않습니다.",
        "security.summary": "조용한 보호 상태",
        "security.copy": "Astra Shield와 Guardian은 방어적 백신/EDR/복구 구조로만 표현됩니다.",
        "security.noScan": "실제 보안 상태 검사는 수행하지 않습니다.",
        "security.secureDelete": "Secure Delete는 사용자 소유 데이터 보호 기능입니다.",
        "security.aiStudio": "AI Studio는 sandbox/localhost 기본값입니다.",
        "appCenter.featured": "추천 앱",
        "appCenter.native": "Linux native",
        "appCenter.windows": "Windows compatibility",
        "appCenter.macos": "macOS experimental",
        "appCenter.copy": "앱 호환 상태를 일반 사용자가 이해하기 쉬운 방식으로 보여주는 미리보기입니다.",
        "compat.ready": "준비됨",
        "compat.profile": "프로필 필요",
        "compat.experimental": "실험적",
        "notification.titleOne": "Shield 상태 미리보기",
        "notification.bodyOne": "방어 구조는 정상으로 표시되지만 실제 검사는 수행하지 않습니다.",
        "notification.titleTwo": "AI Studio",
        "notification.bodyTwo": "WebUI는 외부 공개가 아니라 localhost/sandbox 기본값입니다.",
        "notification.titleThree": "업데이트 준비",
        "notification.bodyThree": "atomic update와 rollback 흐름은 문서 단계입니다.",
        "workspace.title": "작업 보기",
        "workspace.snapTitle": "Snap 미리보기",
        "workspace.snapBody": "창 배치 가이드는 시각 mock이며 실제 compositor 동작이 아닙니다.",
        "workspace.one": "작업 1",
        "workspace.two": "작업 2",
        "workspace.three": "작업 3",
        "window.close": "창 닫기 mock",
        "window.minimize": "창 최소화 mock",
        "window.maximize": "창 정렬 mock",
        "toast.mockRoute": "정적 route만 전환했습니다. 실제 앱은 실행하지 않았습니다.",
        "toast.mockToggle": "mock 표시만 바뀌었습니다. 실제 OS 설정은 변경하지 않았습니다.",
        "error.mockDataUnavailable": "Astra Shell mock data를 사용할 수 없습니다.",
        "error.initialization": "정적 mock 초기화 오류가 발생했습니다."
      },
      en: {
        "app.name": "Astra Shell",
        "app.phase": "Phase 1-5d",
        "app.staticOnly": "Static preview",
        "action.skipToContent": "Skip to content",
        "route.desktop.title": "Desktop",
        "route.launcher.title": "Launcher",
        "route.controlCenter.title": "Quick Settings",
        "route.notifications.title": "Notifications",
        "route.settings.title": "Settings",
        "route.securityCenter.title": "Security Center",
        "route.appCenter.title": "App Center",
        "route.workspaces.title": "Task View",
        "route.login.title": "Session Preview",
        "shell.searchPlaceholder": "Search apps, settings, and documents",
        "shell.securityQuiet": "Normal",
        "shell.userSession": "Astra User",
        "shell.localOnly": "localhost",
        "shell.clock": "09:41",
        "shell.launcher": "Open launcher",
        "shell.quickPanel": "Open quick settings",
        "shell.notifications": "Open notifications",
        "shell.workspace": "Open task view",
        "shell.previewOnly": "Preview only",
        "shell.noRealAction": "No real action",
        "desktop.emptyTitle": "Astra Desktop",
        "desktop.emptyBody": "A static reinterpretation of macOS glass, One UI softness, and Windows 11 Mica/Snap direction.",
        "desktop.widgetWeather": "Calm Surface",
        "desktop.widgetBrief": "Astra Fusion",
        "desktop.widgetBody": "Design preview only. No real system state is read.",
        "launcher.pinned": "Pinned apps",
        "launcher.recent": "Recent items",
        "quick.wifi": "Wi-Fi",
        "quick.sound": "Sound",
        "quick.brightness": "Brightness",
        "quick.performance": "Balanced",
        "quick.privacy": "Privacy",
        "quick.shield": "Shield",
        "quick.localhost": "Localhost",
        "quick.mockOnly": "mock state",
        "settings.sectionPersonal": "Personalization",
        "settings.sectionSystem": "System",
        "settings.sectionPrivacy": "Privacy",
        "settings.sectionUpdates": "Updates",
        "settings.copy": "This previews Settings structure only. It does not read or change system values.",
        "security.summary": "Quiet protection state",
        "security.copy": "Astra Shield and Guardian are shown only as defensive antivirus/EDR/recovery structures.",
        "security.noScan": "No real security status check is performed.",
        "security.secureDelete": "Secure Delete is user-owned data protection.",
        "security.aiStudio": "AI Studio defaults to sandbox/localhost.",
        "appCenter.featured": "Featured apps",
        "appCenter.native": "Linux native",
        "appCenter.windows": "Windows compatibility",
        "appCenter.macos": "macOS experimental",
        "appCenter.copy": "A user-friendly preview of app compatibility status.",
        "compat.ready": "Ready",
        "compat.profile": "Profile needed",
        "compat.experimental": "Experimental",
        "notification.titleOne": "Shield status preview",
        "notification.bodyOne": "The defensive structure is shown as normal, but no real scan is performed.",
        "notification.titleTwo": "AI Studio",
        "notification.bodyTwo": "WebUI is localhost/sandbox by default, not externally exposed.",
        "notification.titleThree": "Update readiness",
        "notification.bodyThree": "Atomic update and rollback flow is still a document-stage concept.",
        "workspace.title": "Task View",
        "workspace.snapTitle": "Snap preview",
        "workspace.snapBody": "The placement guide is visual-only and does not control a compositor.",
        "workspace.one": "Space 1",
        "workspace.two": "Space 2",
        "workspace.three": "Space 3",
        "window.close": "Close window mock",
        "window.minimize": "Minimize window mock",
        "window.maximize": "Arrange window mock",
        "toast.mockRoute": "Changed a static route only. No real app was launched.",
        "toast.mockToggle": "Changed mock display only. No OS setting was changed.",
        "error.mockDataUnavailable": "Astra Shell mock data is not available.",
        "error.initialization": "Static mock initialization failed."
      }
    },

    user: {
      displayName: "Astra User",
      initials: "AU"
    },

    shellBarApps: [
      { id: "settings", titleKey: "route.settings.title", route: "/settings", glyph: "S", running: true },
      { id: "security", titleKey: "route.securityCenter.title", route: "/security-center", glyph: "H", running: true },
      { id: "app-center", titleKey: "route.appCenter.title", route: "/app-center", glyph: "A", running: false },
      { id: "workspace", titleKey: "route.workspaces.title", route: "/workspaces", glyph: "W", running: false }
    ],

    launcherApps: [
      { id: "settings", titleKey: "route.settings.title", route: "/settings", glyph: "S" },
      { id: "security", titleKey: "route.securityCenter.title", route: "/security-center", glyph: "H" },
      { id: "app-center", titleKey: "route.appCenter.title", route: "/app-center", glyph: "A" },
      { id: "quick-panel", titleKey: "route.controlCenter.title", route: "/control-center", glyph: "Q" },
      { id: "notifications", titleKey: "route.notifications.title", route: "/notifications", glyph: "N" },
      { id: "workspace", titleKey: "route.workspaces.title", route: "/workspaces", glyph: "W" }
    ],

    recentItems: [
      { titleKey: "route.appCenter.title", bodyKey: "appCenter.copy", route: "/app-center" },
      { titleKey: "route.securityCenter.title", bodyKey: "security.copy", route: "/security-center" },
      { titleKey: "route.settings.title", bodyKey: "settings.copy", route: "/settings" }
    ],

    quickSettings: [
      { titleKey: "quick.wifi", value: "Astra Local", glyph: "W", active: true },
      { titleKey: "quick.sound", value: "36%", glyph: "S", active: true },
      { titleKey: "quick.brightness", value: "72%", glyph: "B", active: true },
      { titleKey: "quick.performance", value: "Premium", glyph: "P", active: true },
      { titleKey: "quick.privacy", value: "Private", glyph: "L", active: true },
      { titleKey: "quick.shield", value: "Quiet", glyph: "H", active: true },
      { titleKey: "quick.localhost", value: "On", glyph: "O", active: true },
      { titleKey: "quick.mockOnly", value: "Static", glyph: "M", active: false }
    ],

    notifications: [
      { titleKey: "notification.titleOne", bodyKey: "notification.bodyOne", sourceKey: "route.securityCenter.title" },
      { titleKey: "notification.titleTwo", bodyKey: "notification.bodyTwo", sourceKey: "route.appCenter.title" },
      { titleKey: "notification.titleThree", bodyKey: "notification.bodyThree", sourceKey: "route.settings.title" }
    ],

    settingsSections: [
      { titleKey: "settings.sectionPersonal", value: "Astra Fusion surface" },
      { titleKey: "settings.sectionSystem", value: "Mica/Snap mock" },
      { titleKey: "settings.sectionPrivacy", value: "Portal first" },
      { titleKey: "settings.sectionUpdates", value: "Atomic rollback ready" }
    ],

    securityItems: [
      { titleKey: "route.securityCenter.title", bodyKey: "security.copy", stateKey: "shell.securityQuiet" },
      { titleKey: "security.secureDelete", bodyKey: "security.noScan", stateKey: "shell.previewOnly" },
      { titleKey: "security.aiStudio", bodyKey: "shell.localOnly", stateKey: "shell.previewOnly" }
    ],

    appCenterItems: [
      { name: "Astra Files", categoryKey: "appCenter.native", statusKey: "compat.ready", glyph: "F" },
      { name: "Astra Notes", categoryKey: "appCenter.native", statusKey: "compat.ready", glyph: "N" },
      { name: "Photo Studio", categoryKey: "appCenter.windows", statusKey: "compat.profile", glyph: "P" },
      { name: "Creative Legacy", categoryKey: "appCenter.windows", statusKey: "compat.profile", glyph: "C" },
      { name: "Unix Tools Preview", categoryKey: "appCenter.macos", statusKey: "compat.experimental", glyph: "U" }
    ],

    workspaces: [
      { id: "workspace-1", titleKey: "workspace.one", windows: ["route.settings.title", "route.appCenter.title"], active: true },
      { id: "workspace-2", titleKey: "workspace.two", windows: ["route.securityCenter.title"], active: false },
      { id: "workspace-3", titleKey: "workspace.three", windows: [], active: false }
    ]
  };

  function deepFreeze(value) {
    if (value === null || typeof value !== "object" || Object.isFrozen(value)) {
      return value;
    }

    Object.freeze(value);
    Object.getOwnPropertyNames(value).forEach(function freezeChild(propertyName) {
      deepFreeze(value[propertyName]);
    });
    return value;
  }

  try {
    window.ASTRA_SHELL_MOCK = deepFreeze(mockData);
  } catch (error) {
    window.ASTRA_SHELL_MOCK = mockData;
    window.ASTRA_SHELL_MOCK_INIT_ERROR = error instanceof Error ? error.message : "Unknown mock data initialization error";
  }
})();
